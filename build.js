const fs = require("fs-extra");

(async function build() {
  try {
    await fs.emptyDir("./dist");
    await fs.copy("./src/front/", "./dist");
  } catch (error) {
    console.log(error);
  }
})();
