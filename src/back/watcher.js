const https = require("https");
const fs = require("fs-extra");

const PRICE_INFO_DIR = './src/back/price_history/'

console.log('Much watch. So info.');
// setInterval(() => {
  ["/markets/huobi/dogeusdt/price", "/markets/bittrex/dogebtc/price"].map(
    (path, ix) => {
      https
        .request(
          {
            path,
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
              console.log('Wow', body);
              body = JSON.parse(body)
              const currencyPair = ix ? "doge_btc" : "doge_usdt"
              console.log(`${PRICE_INFO_DIR}${currencyPair}.json`)
              fs.ensureFileSync(`${PRICE_INFO_DIR}${currencyPair}.json`)
              fs.writeFile(
                `${PRICE_INFO_DIR}${currencyPair}.json`,
                JSON.stringify(body.result),
                err => {
                  if (err) console.log(err);
                }
              );
            });
          }
        )
        .on("error", err => {
          console.log(err);
          fs.appendFile("./logs/error.log", `${err}\n`)
        })
        .end();
    }
  );
// }, 1000 * 10);
