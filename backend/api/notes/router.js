const express = require("express");

const router = express();

// routes
router.get("/", (req, res) => {
  res.json({ tickets: "up" });
});

module.exports = router;
