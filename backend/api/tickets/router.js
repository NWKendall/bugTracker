const express = require("express");

const router = require("express").Router();

// routes
router.get("/", (req, res) => {
  res.json({ router: "tickets" });
});

module.exports = router;
