const fs = require("fs-extra");

(async function build() {
  try {
    await fs.emptyDir("./dist");
    await fs.copy("./src/front/", "./dist");
    await fs.copy("./src/back/price_history/", "./dist/price_history");
    console.log('So build!')
  } catch (error) {
    console.log(error);
  }
})();
