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

router.post("/", (req, res) => {
  const category = req.body
  Categories.addCategory(category)
  .then((cat) => {
      res.status(201).json(cat);
    })
    .catch(({ name, message, code, stack }) => {
      res.status(500).json({ name, message, code, stack });
    });
});

module.exports = router;
