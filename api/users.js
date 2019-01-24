require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../database/dbHelpers");
const auth = require("./auth");

const router = express.Router();

// SANITY CHECK
router.get("/", (req, res) => {
  res.send("👋🌎🌍🌏, api sanity check");
});

// REGISTER A USER
router.post("/register", (req, res, next) => {
  const user = req.body;
  user.password = bcrypt.hashSync(user.password, 14);
  db.insert(user)
    .then(ids => {
      const token = auth.generateToken(req.body);
      res.status(201).json({ message: `welcome ${user.username}`, token });
    })
    .catch(err => {
      if (err.errno === 19) {
        res.status(400).json({ message: "username already taken" });
      } else {
        next(err);
      }
    });
});

// LOGIN ROUTE
router.post("/login", (req, res) => {
  const userCred = req.body;
  db.findUsername(userCred.username)
    .then(user => {
      if (user && bcrypt.compareSync(userCred.password, user.password)) {
        const token = auth.generateToken(user);
        res.json({ message: `welcome ${user.username}`, token });
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(err => res.status(500).json({ message: "You shall not pass!" }));
});

// PROTECTED USER ROUTE
router.get("/users", auth.protected, (req, res) => {
  db.findUsers()
    .then(users => res.json(users))
    .catch(err => res.status(500).json(err));
});

// VIEW USERS OF YOUR DEPARTMENT
router.get("/users/department", auth.protected, (req, res, next) => {
  db.findUserDepartment(req.decodedToken.department)
    .then(users => res.json(users))
    .catch(err => next(err));
});

module.exports = router;
