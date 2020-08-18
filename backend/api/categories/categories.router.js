const router = require("express").Router();
const Categories = require("./categories.model.js");
const { categoryValidator } = require("../middleware/categories.mw.js");


router.get("/", (req, res) => {
  Categories.findAllCategories()
    .then((category) => {
      res.status(200).json(category);
    })
    .catch(({ name, message, stack, code }) => {
      res.status(500).json({ name, message, stack, code });
    });
});

router.get("/:id", categoryValidator, (req, res) => {
  const { id } = req.params;

  Categories.getCategoryById(id)
    .then((cat) => {
      res.status(200).json(cat);
    })
    .catch(({ name, message, code, stack }) => {
      res.status(500).json({ name, message, code, stack });
    });
});

router.post("/", (req, res) => {
  const category = req.body;
  Categories.addCategory(category)
    .then((cat) => {
      res.status(201).json(cat);
    })
    .catch(({ name, message, code, stack }) => {
      res.status(500).json({ name, message, code, stack });
    });
});

router.put("/:id", (req, res) => {
  req.body.modified_at = new Date()
  const { id } = req.params;
  const changes = { ...req.body };

  Categories.updateCategory(id, changes)
  .then( (cat) => {
      res.status(200).json(cat);
    })
    .catch(({ name, message, code, stack }) => {
      res.status(500).json({ name, message, code, stack });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Categories.deleteCategory(id)
    .then((cat) => {
      res.status(200).json(cat);
    })
    .catch(({ name, message, code, stack }) => {
      res.status(500).json({ name, message, code, stack });
    });
});

module.exports = router;
