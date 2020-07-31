const express = require("express");

const router = express();

// routes
router.get("/", (req, res) => {
  res.json({ roles: "up" });
});

module.exports = router;
