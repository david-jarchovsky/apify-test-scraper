# Quiz Answers
## Tutorial II Apify SDK
1. _Where and how can you use JQuery with the SDK?_ - CheerioCrawler uses Cheerio that uses a core of jQuery. Therefore it is used as part of CherrioCrawler to get information from static HTML pages.
_ADDED_: Jquery can be injected to Puppeteer via _Apify.utils.injectJQuery()_ function.
1. _What is the main difference between Cheerio and JQuery?_ - Cheerio orchestrates the whole download of web page and it clears the DOM and jQuery core is just used to get information from the web page.
1. _When would you use CheerioCrawler and what are its limitations?_ - CherioCrawler can be used where the content is not generated dynamically by the web page. Therefore the limitation is that no content generated after HTML is loaded is not possible.
1. _What are the main classes for managing requests and when and why would you use one instead of another?_ - The main classes used for crawling are Request, RequestList and RequestQueue. Request class represents single URL request. RequestList is a list of URLs to crawl and RequestQueue is a queue of requests to crawl. While Request and RequestList is used when plain URL or list or URLs is to be scraped, RequestQueue is used to deep crawl web page where basically one page crawl generates set of other URLs to be crawled.
1. _How can you extract data from a page in Puppeteer without using JQuery?_ - Puppeteer does not use jQuery but DevTools protocol.
1. _What is the default concurrency/parallelism the SDK uses?_ - By default, the SDK has only 1 thread running. However it can be increased. AutoscalePool is a pool of threads that only executes parallel jobs if enough memory and CPU is available.
