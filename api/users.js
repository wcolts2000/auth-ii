require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../database/dbHelpers");
const jwt = require("jsonwebtoken");

const router = express.Router();

// SANITY CHECK
router.get("/", (req, res) => {
  res.send("👋🌎🌍🌏, api sanity check");
});

// REGISTER A USER
router.post("/register", (req, res) => {
  const user = req.body;
  user.password = bcrypt.hashSync(user.password, 14);
  db.insert(user)
    .then(ids => res.status(201).json({ id: ids[0] }))
    .catch(err => {
      if (err.errno === 19) {
        res.status(400).json({ message: "username already taken" });
      } else {
        res.status(500).send(err);
      }
    });
});

// Generate Token for User
function generateToken(user) {
  const payload = {
    username: user.username,
    department: user.department
  };

  const secret = process.env.JWT_SECRET;

  const options = {
    expiresIn: "60m"
  };

  return jwt.sign(payload, secret, options);
}

// LOGIN ROUTE
router.post("/login", (req, res) => {
  const userCred = req.body;
  db.findUsername(userCred.username)
    .then(user => {
      console.log("user", user);

      if (user && bcrypt.compareSync(userCred.password, user.password)) {
        const token = generateToken(req.body);
        res.status(200).json({ message: `welcome ${user.username}`, token });
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(err => res.status(500).json({ message: "You shall not pass!" }));
});

// PROTECTED MIDDLEWARE FUNCTION
function protected(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "invalid token" });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "no token provided" });
  }
}

// Check Department
function checkDepartment(department) {
  return function(req, res, next) {
    if (req.decodedToken.department.includes(department)) {
      next();
    } else {
      res
        .status(403)
        .json({ message: `NOT AUTHORIZED, ${department} members only` });
    }
  };
}
// PROTECTED USER ROUTE
router.get("/users", protected, (req, res) => {
  db.findUsers()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
