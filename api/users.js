require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../database/dbHelpers');
const jwt = require('jsonwebtoken');

const router = express.Router();

// SANITY CHECK
router.get('/', (req, res) => {
  res.send("👋🌎🌍🌏, api sanity check");
});

module.exports = router;