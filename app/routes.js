//
// routes.js
// -----------------------

const articles = require('./articles.js');

function configure(router) {
    // index page
    router.get('/', async function(req, res) {
        let articleArr = await articles.fetchAllMetadata()

        res.render('index', {
            "title": "Greinasafn",
            "articles": articleArr
        });
    });

    // article page
    router.get('/articles/:slug', async function(req, res) {
        let slug = req.params.slug
        let article = await articles.articleForSlug(slug);
        let html = articles.htmlForArticle(article);
        res.render('article', {
            title: article.attributes.title,
            html: html
        })
    });
}

module.exports = {
    configure: configure
}
