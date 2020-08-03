const Categories = require("./model.js");

const router = require("express").Router();

router.get("/", (req, res) => {
  Categories.findAll()
    .then(cat => {
      console.log("cat", cat)
      res.status(200).json(cat)
    })
    .catch(({ name, message, stack, code }) => {
      console.log({ name, message, stack, code });
      res.status(500).json({ name, message, stack, code });
    });
});



module.exports = router;
