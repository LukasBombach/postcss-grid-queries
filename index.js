var postcss = require('postcss')
//var mediaParser = require ("postcss-media-query-parser");

module.exports = postcss.plugin('postcss-grid-queries', function (opts) {
  opts = opts || {}

  return function (root, result) {

    /* root.walkAtRules(rule => {
      console.log(rule);
    }) */

  }
})
