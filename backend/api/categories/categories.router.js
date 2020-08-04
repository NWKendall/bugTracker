const Categories = require("./categories.model.js");

const router = require("express").Router();

router.get("/", (req, res) => {
  Categories.findAllCategories()
    .then((category) => {
      res.status(200).json(category);
    })
    .catch(({ name, message, stack, code }) => {
      res.status(500).json({ name, message, stack, code });
    });
});

router.get("/:id", (req, res) => {
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
  const { id } = req.params;
  const changes = { ...req.body };

  Categories.updateCategory(id, changes)
    .then((cat) => {
      res.status(204).json(cat);
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
