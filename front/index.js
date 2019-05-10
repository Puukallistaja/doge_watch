let priceInfo = [
  {
    currency: "DOGE",
    price: 1
  }
];
const currentStoreFileName =
  new Date().toISOString().split("T")[0] + ".json";
fetch(`price_history/${currentStoreFileName}`)
  .then(function(response) {
    return response.json();
  })
  .then(function(priceJson) {
    if (priceJson.length) {
      priceInfo = priceInfo.concat(priceJson);
      localStorage.setItem("currencies", JSON.stringify(priceJson));
    }
  })
  .catch(err => {
    console.log(err, "Will try to use old priceinfo");
    priceInfo = localStorage.getItem("currencies");
  })
  .finally(addListeners);

function addListeners() {
  document.querySelector("select").addEventListener("change", event => {
    try {
      document.querySelector(".price").innerText = priceInfo
        .find(currency => currency.currency === event.target.value)
        .price.toFixed(8);
    } catch (error) {
      console.log(error, "\n Failed to change price");
    }
  });
}

import motionDetector from './scripts/movementDetector.js'

