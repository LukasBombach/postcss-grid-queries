const postcss = require("postcss");
const { inspect } = require("util");

module.exports = postcss.plugin("postcss-grid-queries", (grid = {}) => {
  return (root, result) => {
    root.walkAtRules(rule => {
      const minColWidthMatch = rule.params.match(
        /-min-col-width.*?:.*?(\d+)(\w+)/i
      );
      const colSpanMatch = rule.params.match(/-col-span.*?:.*?(\d+)/i);

      if (minColWidthMatch === null) return;
      if (colSpanMatch === null) return;

      const minColWidth = parseInt(minColWidthMatch[1], 10);
      const minColWidthUnit = minColWidthMatch[2];
      const colSpan = parseInt(colSpanMatch[1], 10);

      const containerRatio = colSpan / grid.cols;
      const minWidth = minColWidth / containerRatio;

      rule.params = rule.params.replace(/ and \([^\(]*?-col-span.*?\)/i, "");
      rule.params = rule.params.replace(
        /\(.*?-min-col-width.*?\)/i,
        `(min-width: ${minWidth}${minColWidthUnit})`
      );
    });
  };
});
