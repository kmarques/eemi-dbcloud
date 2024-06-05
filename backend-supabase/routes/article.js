const { Router } = require("express");
const Article = require("../models/article");
const checkAuth = require("../middlewares/checkAuth");
const { Op } = require("sequelize");

const router = new Router();

router.get("/articles", checkAuth({ block: false }), async (req, res) => {
  const user = req.user;
  const filters = {
    [Op.or]: [{ status: "PUBLISHED" }],
  };

  if (user) {
    filters[Op.or].push({
      status: "DRAFT",
      UserId: user.id,
    });
  }

  const articles = await Article.findAll({
    where: filters,
  });

  res.json(articles);
});

router.post("/articles", checkAuth(), async (req, res) => {
  const articleData = req.body;
  articleData.UserId = req.user.id;

  const article = await Article.create(articleData);
  res.json(article);
});

router.get(
  "/articles/:id",
  checkAuth({ block: false }),
  async (req, res, next) => {
    const article = await Article.findByPk(parseInt(req.params.id, 10));
    if (!article) return res.sendStatus(404);
    if (article.status === "DRAFT" && article.UserId !== req.user.id)
      return res.sendStatus(404);
    return res.json(article);
  }
);

router.put("/articles/:id", checkAuth(), async (req, res) => {
  let article = await Article.findByPk(parseInt(req.params.id, 10));
  if (!article) return res.sendStatus(404);
  if (article.UserId !== req.user.id) return res.sendStatus(403);

  for (let key in req.body) {
    article[key] = req.body[key];
  }
  await article.save();
  res.json(article);
});

router.delete("/articles/:id", checkAuth(), async (req, res) => {
  let article = await Article.findByPk(parseInt(req.params.id, 10));
  if (!article) return res.sendStatus(404);
  if (article.UserId !== req.user.id) return res.sendStatus(403);

  await article.destroy();
  res.sendStatus(204);
});

module.exports = router;
