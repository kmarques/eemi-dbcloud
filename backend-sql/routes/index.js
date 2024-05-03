const { Router } = require("express");
const router = new Router();

router.use(require("./user"));
router.use(require("./article"));
router.get("", (req, res) => {
  res.send("Healthy");
});

module.exports = router;
