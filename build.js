const fs = require("fs-extra")

;(async function build() {
  try {
    await fs.emptyDir("./dist");
    await fs.copy("./front/", "./dist");
  } catch (error) {
    console.log(error)
  }
})();
