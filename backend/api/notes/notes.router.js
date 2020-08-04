const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).json({ router: "notes" });
});

module.exports = router;
