var postcss = require("postcss");

var plugin = require("./");

async function run(input, output, opts = {}) {
  const result = postcss([plugin(opts)]).process(input);
  expect(result.css).toEqual(output);
  expect(result.warnings()).toHaveLength(0);
}

it("does nothing to normal media queries", async () => {
  const input = "@media only screen and (min-width: 600px) {}";
  const output = "@media only screen and (min-width: 600px) {}";
  await run(input, output);
});
