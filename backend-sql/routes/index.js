const { Router } = require("express");
const userRouter = require("./user");
const router = new Router();

router.use(userRouter);
router.get("", (req, res) => {
  res.send("Healthy");
});

module.exports = router;
