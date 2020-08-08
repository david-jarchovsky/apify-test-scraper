// This is the main Node.js source code file of your actor.
// It is referenced from the "scripts" section of the package.json file,
// so that it can be started by running "npm start".

// Import Apify SDK. For more information, see https://sdk.apify.com/
const Apify = require('apify');

const { log } = Apify.utils
log.setLevel(log.LEVELS.DEBUG);

const DATASET_NAME = "tutorial-dataset";

function processMainPage(request, response, body, contentType, $, queue) {
  $(".s-result-item").each(async (index, element) => {
    asin = $(element).attr("data-asin");
    if (asin != undefined && asin != null && asin != "") {
      url = "https://www.amazon.com/dp/" + asin
      log.debug("Adding URL "+url)
      await queue.addRequest(new Apify.Request({url: url, userData: {
        type: "detail", asin: asin, keyword: request.userData.keyword
      }}));
    }
  })
}

const PRICE_REGEXP = /\$\d+(\.\d+)?/g

async function processDetail(request, response, body, contentType, $, queue) {
    let title = $("#productTitle").text()
    let description = $("#featurebullets_feature_div").text()
    let detailUrl = request.url

    let shippingPrice = $("#shippingMessageInsideBuyBox_feature_div").text();
    if (shippingPrice != null && shippingPrice != "") {
      regexpResult = shippingPrice.match(PRICE_REGEXP);
      shippingPrice = regexpResult != null && regexpResult.length > 0? regexpResult[0] : null;
      log.debug("Shipping price detected: "+shippingPrice)
    }

    offerUrl = "https://www.amazon.com/gp/offer-listing/" + request.userData.asin
    await queue.addRequest(new Apify.Request({
      url: offerUrl,
      userData: {
        type: "offer",
        asin: request.userData.asin.trim(),
        title: title.trim(),
        description: description.trim(),
        detailUrl: detailUrl.trim(),
        shippingPrice: shippingPrice,
        keyword: request.userData.keyword
      }
    }));
}

function processOffer(request, response, body, contentType, $, resultDataset) {
    $(".olpOffer").each((index, element) => {
      result = {
        title: request.userData.title,
        url: request.userData.detailUrl,
        description: request.userData.description,
        keyword: request.userData.keyword,
        price: $(element).find(".olpOfferPrice ").text().trim(),
        sellerName: $(element).find("olpSellerName img").attr("alt"),
        shippingPrice: request.userData.shippingPrice
      }
      log.debug("Pushing result: ", result);
      resultDataset.pushData(result);
    })
}

Apify.main(async () => {
    const input = await Apify.getInput();
    log.debug("Input: ", input);

    const requestQueue = await Apify.openRequestQueue("my-queue");

    let initialRequest = {
      url: "https://www.amazon.com/s?ref=nb_sb_noss&k=" + input.keyword,
      userData: {
        type: "main",
        keyword: input.keyword
      }
    };
    log.debug("Adding initial request to the queue", initialRequest);
    let queueOperation = await requestQueue.addRequest(initialRequest);
    log.debug("URL added", queueOperation);
    const resultDataset = await Apify.openDataset(DATASET_NAME);
    const handleFunction = async function ({ request, response, body, contentType, $ }) {
      if (request.userData.type == 'main') {
        log.debug("Processing main: " + request.url + " ...");
        processMainPage(request, response, body, contentType, $, requestQueue);
      } else if (request.userData.type == 'detail'){
        log.debug("Processing detail: " + request.url + " ...");
        processDetail(request, response, body, contentType, $, requestQueue);
      } else if (request.userData.type = "offer") {
        log.debug("Processing offer: " + request.url + " ...");
        processOffer(request, response, body, contentType, $, resultDataset);
      }
    }

    const proxyConfiguration = await Apify.createProxyConfiguration({
        groups: ['BUYPROXIES94952'],
    });

    const crawler = new Apify.CheerioCrawler({
      requestQueue,
      proxyConfiguration,
      useSessionPool: true,
      sessionPoolOptions: {
        sessionOptions: {
          maxPoolSize: 5,
          maxErrorScore: 1,
          maxUsageCount: 5
        }
      },
      handlePageFunction: handleFunction,
      autoscaledPoolOptions: {
        minConcurrency: 1,
        maxConcurrency: 1
      }
    })

    log.info('Starting the crawl.');
    await crawler.run();
    log.info('Crawl finished.');

    log.info("Calling tutorial-III");

    let dataset = await Apify.openDataset(DATASET_NAME);
    let data = await dataset.getData();
    log.debug("Data retrieved", data);
    let callResult = await Apify.call('HKnDbeiRKCBjqtYEg/tutorial-III', {startUrls: [], data: data.items});
    log.info("Actor invoked", callResult);
});
