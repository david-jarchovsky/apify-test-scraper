# Quiz Answers
## Tutorial III Apify Actors & Webhooks
1. _How do you allocate more CPU for your actor run?_
By increasing memory limit. Each 4GB memory get a new full CPU.
1. _How can you get the exact time when the actor was started from within the running actor process?_
By substracting APIFY_STARTED_AT environment property content from current timestamp.
1. _Which are the default storages an actor run is allocated (connected to)?_
Key value pair, dataset, request queue.
1. _Can you change the memory allocated to a running actor?_
No, the memory is specified when actor is started.
1. _How can you run an actor with Puppeteer in a headful (non-headless) mode?_
Apify.launchPuppeteer({ headless: false }). This option is missing in SDK API reference though. However, it is in examples. ?!
_ADDED_: We have to use following apify image: apify/actor-node-chrome-xvfb
1. _Imagine the server/instance the container is running on has a 32 GB, 8-core CPU. What would be the most performant (speed/cost) memory allocation for CheerioCrawler? (Hint: NodeJS processes cannot use user-created threads)_
4096MB as the app can execute application logic parallelly.
