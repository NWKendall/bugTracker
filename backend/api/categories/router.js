const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).json({ router: "categories" });
});

module.exports = router;
