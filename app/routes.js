//
// routes.js
// -----------------------

const articles = require('./articles.js');

function configure(router) {
  // index page
  router.get('/', async (_, res) => {
    const articleArr = await articles.fetchAllMetadata();

    res.render('index', {
      title: 'Greinasafn',
      articles: articleArr,
    });
  });

  // article page
  router.get('/articles/:slug', async (req, res) => {
    const article = await articles.articleForSlug(req.params.slug);
    const html = articles.htmlForArticle(article);
    res.render('article', {
      title: article.attributes.title,
      html,
    });
  });
}

module.exports = { configure };
