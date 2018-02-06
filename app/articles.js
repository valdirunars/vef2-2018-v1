//
// articles.js
// -----------------------

const utils = require('./utils.js');
const fs = require('fs');
const fm = require('front-matter');
const showdown = require('showdown');

showdown.setFlavor('github');

const markdownConverter = new showdown.Converter();

const articlePaths = [
  'articles/batman-ipsum.md',
  'articles/corporate-ipsum.md',
  'articles/deloren-ipsum.md',
  'articles/lorem-ipsum.md',
];

function getArticle(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        const content = fm(data);
        content.attributes.date = utils.formatDate(content.attributes.date);
        resolve(content);
      }
    });
  });
}

async function articles() {
  return Promise.all(articlePaths.map(await getArticle));
}

async function fetchMetadataForArticles() {
  const allArticles = await articles();
  return allArticles.map(a => a.attributes);
}

async function articleForSlug(slug) {
  const foundArticle = (await articles()).find(article => article.attributes.slug === slug);

  return foundArticle;
}

function htmlForArticle(article) {
  return markdownConverter.makeHtml(article.body);
}

module.exports = {
  fetchAllMetadata: fetchMetadataForArticles,
  articleForSlug,
  htmlForArticle,
};
