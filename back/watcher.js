const https = require("https");
const fs = require("fs-extra");

const build = require('../build')

const QUOTES = [
  {
    currency: "BTC",
    path: "/markets/bittrex/dogebtc/price"
  },
  {
    currency: "USDT",
    path: "/markets/huobi/dogeusdt/price"
  }
];

const TEMPLATE = () =>
  QUOTES.map(quote => ({
    currency: quote.currency,
    priceHistory: [],
    price: 0
  }));

const PRICE_INFO_DIR = "back/price_history/";
const currentStoreFileName = () => new Date().toISOString().split("T")[0] + ".json";

const currentStore = (() => {
  try {
    return JSON.parse(
      fs.readFileSync(`${PRICE_INFO_DIR}${currentStoreFileName()}`)
    );
  } catch (error) {
    console.log("File not found, returning template");
    return TEMPLATE();
  }
})();

setInterval(() => {
  QUOTES.map(quote => {
    https
      .request(
        {
          path: quote.path,
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
            console.log("Wow", body);

            const price = JSON.parse(body).result.price;
            const exactCurrency = currentStore.find(
              currency => currency.currency === quote.currency
            );

            exactCurrency.price = price;
            exactCurrency.priceHistory.push({
              price,
              time: Date.now()
            });

            fs.writeFile(
              PRICE_INFO_DIR + currentStoreFileName(),
              JSON.stringify(currentStore),
              err => {
                if (err) console.log(err);
                else build()
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
  });
}, 1000 * 60);
