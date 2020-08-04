const Categories = require("./model.js");

const router = require("express").Router();

router.get("/", (req, res) => {
  Categories.findAll()
    .then((category) => {
      console.log("category", category);
      res.status(200).json(category);
    })
    .catch(({ name, message, stack, code }) => {
      console.log({ name, message, stack, code });
      res.status(500).json({ name, message, stack, code });
    });
});

module.exports = router;
