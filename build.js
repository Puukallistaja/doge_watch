const fs = require("fs-extra");

async function build() {
  try {
    await fs.emptyDir("./dist");
    await fs.copy("./front/", "./dist");
    await fs.copy("./back/price_history/", "./dist/price_history");
    console.log('So build')
  } catch (error) {
    console.log(error);
  }
}
build()

module.exports = build