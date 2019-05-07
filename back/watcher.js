const https = require("https");
const fs = require("fs");

setInterval(() => {
  ["/markets/huobi/dogeusdt/price", "markets/bittrex/dogebtc/price"].map(
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
            var body = "";
            res.on("data", chunk => {
              body += chunk;
            });
            res.on("end", () => {
              console.log(body.result);
              fs.writeFile(
                `price_history/${ix ? "doge_btc" : "doge_usdt"}.json`,
                JSON.stringify(body.result),
                err => {
                  console.log(err);
                }
              );
            });
          }
        )
        .on("error", err => {
          console.log(err);
          fs.appendFile("logs/error.log", `${err}\n`)
        })
        .end();
    }
  );
}, 1000 * 60);
