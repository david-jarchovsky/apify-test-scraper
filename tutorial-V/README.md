# Quiz Answers
## Tutorial V Tasks, Storage, API & Client
1. _What is the relationship between actor and task?_
Actor is the docker image without configuration. Task an executable with a particular configuration for given Actor.
1. _What are the differences between default (unnamed) and named storage? Which one would you choose for everyday usage?_
Default storage is not displayed in storage section at the platform. Which one would you choose for everyday usage? It depends whether I need to browse the data. If so then the named storage should be the choice.
1. _What is the relationship between the Apify API and the Apify client? Are there any significant differences?_
Apify API is a programatic way to use apify cli features. Apify client is a command line to manage apify objects.
1. _Is it possible to use a request queue for deduplication of product IDs? If yes, how would you do that?_
Yes, request queue won't enqueue a request with the same 'uniqueKey' that was already enqueued.
1. _What is data retention and how does it work for all types of storage (default and named)?_
Unnamed storage is retained for 7 days. Named storages are stored indefinitely.
1. _How do you pass input when running an actor or task via the API?_
Via 'input' parameter of Apify.call() or Apify.callTask();
