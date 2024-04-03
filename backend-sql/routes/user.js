const { Router } = require("express");
const User = require("../models/user");
const router = new Router();

router.post("/register", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

module.exports = router;
