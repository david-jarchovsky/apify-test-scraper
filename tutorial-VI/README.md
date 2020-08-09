# Quiz Answers
## Tutorial VI Apify Proxy & Bypassing Antiscraping Software
1. _What types of proxies does the Apify Proxy include? What are the main differences between them?_
  - **Shared Datacenter IP** - This is a proxy that is shared between all users. This is the most cost effective solution. The limit is 5GB per IP address. You pay per IP address.
  - **Dedicated Datacenter IP** - Similar to *Shared Datacenter IP* with exception that the proxies are not shared with the other users. The 5GB limit is the same for dedicated proxies. You pay per IP address.
  - **Residential IP** - The traffic is proxied through IPs located in homes and offices around the world. This IPs have the least chance of being blocked. You pay per GB transmitted.
  - **Google SERP** - Proxy to download Google Search engine results or Google shopping results only. You pay per request.
 1. _Which proxies (proxy groups) can users access with the Apify Proxy trial? How long does this trial last?_
 The trial version lasts 30 days and it applies to datacenter and Google SERP proxies.
 1. _How can you prevent a problem that one of the hardcoded proxy groups that a user is using stops working (a problem with a provider)? What should be the best practices?_
 Configurable group of proxies.
 1. _Does it make sense to rotate proxies when you are logged in?_
 It depends as if we rotate a proxy than we have to start a new session therefore we will need to login again. That can be a valid case therefore it is difficult to say whether it makes generally sense or not.
 1. _Construct a proxy URL that will select proxies only from the US (without specific groups)._
 http://country-US:MyVerySecretPassword@proxy.apify.com:8000
 1. _What do you need to do to rotate proxies (one proxy usually has one IP)? How does this differ for Cheerio Scraper and Puppeteer Scraper?_
 We need to configure a proxy pool. It does not differ for Cheerio and Puppeteer function.
 1. _Try to set up the Apify Proxy (using any group or auto) in your browser. This is useful for testing how websites behave with proxies from specific countries (although most are from the US). You can try Switchy Omega extension but there are many more. Were you successful?_
 yes
 1. _Name a few different ways a website can prevent you from scraping it._
 - Limit individual IP address
 - Require login
 - Change HTML code frequently
 - Using media objects to store data.
 - Using CAPTCHA
 - Honey pot pages
1. _Do you know any software companies that develop anti-scraping solutions? Have you ever encountered them on a website?_
- Google reCAPTCHA is frequent.
