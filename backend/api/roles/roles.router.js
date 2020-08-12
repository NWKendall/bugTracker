const router = require("express").Router();
const RolesDB = require("./roles.model.js");

router.get("/", (req, res) => {
  RolesDB.getAllRoles()
    .then((roles) => {
      res.status(200).json(roles);
    })
    .catch(({ name, message, stack, code }) => {
      res.status(500).json({ name, message, stack, code });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  RolesDB.getRole(id)
    .then((roles) => {
      res.status(200).json(roles);
    })
    .catch(({ name, message, stack, code }) => {
      res.status(500).json({ name, message, stack, code });
    });
});

router.post("/", (req, res) => {
  const role_name = req.body;
  RolesDB.newRole(role_name)
    .then((newRole) => {
      res.status(200).json(newRole);
    })
    .catch(({ name, message, stack, code }) => {
      res.status(500).json({ name, message, stack, code });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  let { role_name, modified_at } = req.body;
  modified_at = new Date();

  RolesDB.editRole(id, { role_name, modified_at })
    .then((role) => {
      res.status(200).json(role);
    })
    .catch(({ name, message, stack, code }) => {
      res.status(500).json({ name, message, stack, code });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  RolesDB.deleteRole(id)
    .then((role) => {
      res.status(200).json(role);
    })
    .catch(({ name, message, stack, code }) => {
      res.status(500).json({ name, message, stack, code });
    });
});



module.exports = router;
