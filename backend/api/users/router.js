const express = require("express");

const router = express();

// routes
router.get("/", (req, res) => {
  res.json({ users: "up" });
});

module.exports = router;
