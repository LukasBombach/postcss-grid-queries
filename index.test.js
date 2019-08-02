var postcss = require("postcss");

var plugin = require("./");

const grid = { width: 800, cols: 12 };

async function run(input, output, options) {
  const extendedOptions = Object.assign({}, grid, options);
  const result = postcss([plugin(extendedOptions)]).process(input);
  expect(result.css).toEqual(output);
  expect(result.warnings()).toHaveLength(0);
}

it("does nothing to normal media queries", async () => {
  const input = "@media only screen and (min-width: 600px) {}";
  const output = "@media only screen and (min-width: 600px) {}";
  await run(input, output);
});

it("transforms -grid-span", async () => {
  const width = 400;
  const span = 6;

  const containerRatio = span / grid.cols;
  const maxWidth = width / containerRatio;

  const input = `@media only screen and (-min-col-width: ${width}px) and (-col-span: ${span}) {}`;
  const output = `@media only screen and (min-width: ${maxWidth}px) {}`;
  await run(input, output);
});
