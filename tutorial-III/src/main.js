// This is the main Node.js source code file of your actor.
// It is referenced from the "scripts" section of the package.json file,
// so that it can be started by running "npm start".

// Import Apify SDK. For more information, see https://sdk.apify.com/
const Apify = require('apify');

const { log } = Apify.utils

log.setLevel(log.LEVELS.DEBUG);

const DATASET_NAME = "tutorial-III-dataset";

function getPriceAsNumber(price) {
  const result = typeof price == "string" && price[0] == "$"? price.substr(1) : price;
  log.debug(`Price resolved ${result}`);
  return result;
}

function createInternalRecord(record) {
    return {
      originalData: record,
      price: getPriceAsNumber(record.price)
    }
}

function storeCheapestOptions(data) {
  let result = {};
  log.info(`Starting to process ${data.length} items`);
  data.forEach((item) => {
    let record = createInternalRecord(item);
    if(item.url in result) {
      if(result[item.url].price > record.price) { // We take only first cheapest option. If mutliple cheapest options exist than we pick the first only.
        log.debug("Price " + result[item.url].price + " > " + record.price + " selecting new cheapest option for key " + item.url);
        result[item.url] = record;
      }
    } else {
      result[item.url] = record;
    }
  });
  log.debug("Result compiled.", result);
  return result;
}

Apify.main(async () => {
    const input = await Apify.getInput();

    if(input.data == null || input.data.length == 0) {
      log.info("No input");
    } else {
      log.info("Selecting the cheapest offer");
      const cheapest = storeCheapestOptions(input.data);
      const dataset = await Apify.openDataset(DATASET_NAME);
      for(let key in  cheapest) {
        const toBeWritten = cheapest[key].originalData;
        log.debug("Writing record", toBeWritten);
        await dataset.pushData(toBeWritten);
      };
      log.info("Done");
    }
});
