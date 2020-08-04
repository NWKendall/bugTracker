const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ router: "users" });
});

module.exports = router;
