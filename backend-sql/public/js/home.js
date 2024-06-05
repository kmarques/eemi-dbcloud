import "./security.js";
import ArticlesApi from "./services/articles.js";

const articleListElement = document.getElementById("article-list");

ArticlesApi.getAll().then((articles) => {
  for (const article of articles) {
    const elem = createArticleItemElement(article);
    articleListElement.appendChild(elem);
  }
});

function createArticleItemElement(article) {
  const li = document.createElement("li");
  const titleNode = document.createTextNode(
    `${article.title} - Updated at ${article.updatedAt}`
  );
  li.appendChild(titleNode);
  return li;
}
