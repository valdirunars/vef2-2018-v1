//
// articles.js
// -----------------------

const utils = require("./utils.js")

const fs = require("fs");
const fm = require("front-matter");
const showdown = require('showdown');

const markdownConverter = new showdown.Converter()

const articlePaths = [
    "articles/batman-ipsum.md",
    "articles/corporate-ipsum.md",
    "articles/deloren-ipsum.md",
    "articles/lorem-ipsum.md"
];

function getArticle(path) {
    return new Promise(function (resolve, reject) {
        fs.readFile(path, 'utf8', function(err, data){
            if (err) {
                console.error(err);
                reject(err);
            } else {
                var content = fm(data);
                console.log(content.attributes.date);
                content.attributes.date = utils.formatDate(content.attributes.date);
                resolve(content);
            }
        });
    })
}

async function articles() {
    return await Promise.all(articlePaths.map(await getArticle));
}

async function fetchMetadataForArticles() {
    let allArticles = await articles();
    return allArticles.map((a) => { return a.attributes });
}

async function articleForSlug(slug) {
    let article = (await articles()).find((article) => {
        return article.attributes.slug == slug;
    });

    return article;
}

function htmlForArticle(article) {
    return markdownConverter.makeHtml(article.body);
}

module.exports = {
    fetchAllMetadata: fetchMetadataForArticles,
    articleForSlug: articleForSlug,
    htmlForArticle: htmlForArticle
}
