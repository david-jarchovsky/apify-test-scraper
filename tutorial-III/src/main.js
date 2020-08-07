// This is the main Node.js source code file of your actor.
// It is referenced from the "scripts" section of the package.json file,
// so that it can be started by running "npm start".

// Import Apify SDK. For more information, see https://sdk.apify.com/
const Apify = require('apify');

const { log } = Apify.utils

log.setLevel(log.LEVELS.DEBUG);

function getPriceAsNumber(price) {
  return typeof price == "string" && price[0] == "$"? price.substr(1) : price;
}

function createInternalRecord(record) {
    return {
      originalData: record,
      price: getPriceAsNumber(record)
    }
}

async function storeCheapestOptions(data) {
  var result = new Map();
  await data.forEach((item) => {
    let record = createInternalRecord(item);
    if(item.asin in result) {
      result[item.asin] = record
    } else {
      if(result[item.asin].price > record.price) { // We take only first cheapest option. If mutliple cheapest options exist than we pick the first only.
        result[item.asin] = record;
      }
    }
  });

  return result.values()
}

Apify.main(async () => {
    const input = await Apify.getInput();
    log.debug("Input: ", input);

    if(input.data == null || input.data.length == 0) {
      log.info("No input");
    } else {
      log.info("Selecting the cheapest offer");
      let cheapest = await storeCheapestOptions(input.data);
      log.info("Writing result of size "+cheapest.length);
      await cheapest.forEach(Apify.pushData);
      log.info("Done");
    }
});
