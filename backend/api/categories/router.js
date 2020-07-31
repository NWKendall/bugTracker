const express = require("express");

const router = express();

// routes
router.get("/", (req, res) => {
  res.json({ categories: "up" });
});

module.exports = router;
