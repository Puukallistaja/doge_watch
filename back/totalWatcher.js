const https = require("https");
const fs = require("fs-extra");

const PRICE_INFO_DIR = "back/price_history/all/";

setInterval(() => {
  https
    .request(
      {
        path: "/markets/prices",
        method: "GET",
        protocol: "https:",
        hostname: "api.cryptowat.ch"
      },
      res => {
        let body = "";
        res.on("data", chunk => {
          body += chunk;
        });
        res.on("end", () => {
          fs.writeFile(
            PRICE_INFO_DIR + Date.now() + ".json",
            JSON.stringify(JSON.parse(body).result),
            err => {
              if (err) {
                console.log(err);
                fs.appendFile("./logs/error.log", `${err}\n`);
              }
            }
          );
        });
      }
    )
    .on("error", err => {
      console.log(err);
      fs.appendFile("./logs/error.log", `${err}\n`);
    })
    .end();
}, 1000 * 30);
