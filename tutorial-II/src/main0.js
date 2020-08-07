// This is the main Node.js source code file of your actor.
// It is referenced from the "scripts" section of the package.json file,
// so that it can be started by running "npm start".

// Import Apify SDK. For more information, see https://sdk.apify.com/
const Apify = require('apify');

const { log } = Apify.utils

log.setLevel(log.LEVELS.DEBUG);

function processMainPage(request, response, body, contentType, $, queue) {
  $(".s-result-item").each(async (index, element) => {
    asin = element.attr("data-asin");
    if (asin != undefined && asin != null && asin != "") {
      url = "https://www.amazon.com/dp/" + asin
      console.log("Adding URL "+url)
      await queue.addRequest(new Apify.Request({url: url, userData: {type: "detail", asin: asin}}));
    }
  })
}

async function processDetail(request, response, body, contentType, $, queue) {
    title = $("#productTitle").text()
    description = $("#featurebullets_feature_div").text()
    detailUrl = request.url

    orfferUrl = "https://www.amazon.com/gp/offer-listing/" + request.userData.asin
    await queue.addRequest(new Apify.Reqeust({
      url: offerurl,
      userData: {
        type: "offer",
        asin: request.userData.asin,
        title: title,
        description: description,
        detailUrl: detailUrl
      }
    }));
}

function processOffer(request, response, body, contentType, $) {
    $(".olpOffer").each((index, element) => {
      price = $(element).find(".olpOfferPrice ").text();
      sellerName = $(element).find("olpSellerName").text();
      shippingPrice = "N/A" // This information
    })
}

Apify.main(async () => {
    const input = await Apify.getInput();
    log.debug("Input: ", input);

    const requestList = await Apify.openRequestList('my-list', [
      //{url: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords="+input.keyword }
      "http://google.com"
    ]);
    console.log("Request list retrieved: " + requestList);

    const handleFunction = async ({ request, response, body, contentType, $ }) => {
      console.log("Processing: " + request.url + " ...")
      if (request.userData.type == 'main') {
        processMainPage(request, response, body, contentType, $, urlQueue);
      } else if (request.userData.type == 'detail'){
        processDetail(request, response, body, contentType, $, queue);
      } else if (request.userData.type = "offer") {
        processOffer(request, response, body, contentType, $);
      }
    }

    const crawler = new Apify.BasicCrawler({
      requestList,
      handleRequestFunction: handleFunction
    });

    log.info('Starting the crawl.');
    await crawler.run();
    log.info('Crawl finished.');
});
