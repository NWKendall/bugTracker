const {
    getCategoryById,
  } = require("../categories/categories.model.js");
  
  module.exports = {
    categoryValidator,
  };
  
  async function categoryValidator(req, res, next) {
    const { id } = req.params;
    const category  = req.body;
    const categoryCheck = await getCategoryById(id);
  
    if (id) {
      if (!categoryCheck) {
        res.status(404).json({ message: `Category ID# ${id} does not exist.` });
      } else if (category == "") {
        res.status(404).json({ message: `Please write a Category for ID# ${id}!` });
      } else {
        next();
      }
    }
  }
  
  