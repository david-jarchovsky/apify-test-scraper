# Quiz Answers
## Tutorial VII Actor Migrations & Maintaining State
1. _Actors have a Restart on error option in their Settings. Would you use this for your regular actors? Why? When would you use it, and when not?_
*Restart on failure* is not very suitable for regular actors as they might fail because the typical failure is that either the scraping is blocked or the structure of the page have changed. Therefore if the actor fails because of one of this reasons then it is likely to fail after retry as well. *Restart on failure* is suitable only for actors that can do auto-recovery. For example the actors that copy data to some storage such as S3 could theoretically restart from the last copied data and continue data transfer after restart.
1. _Migrations happen randomly, but by setting Restart on error and then throwing an error in the main process, you can force a similar situation. Observe what happens. What changes and what stays the same in a restarted actor run?_
Migrated running actor will maintain the state (if persisted) of the predecessor.
1. _Why don't you usually need to add any special code to handle migrations in normal crawling/scraping? Is there a component that essentially solves this problem for you?_
The RequestList handles state persistence therefore the migration is seamless if the user uses RequestList.
1. _How can you intercept the migration event? How much time do you need after this takes place and before the actor migrates?_
  - *migrating* - event is fired before the migration happens.
1. _When would you persist data to a default key-value store and when would you use a named key-value store?_
I would store data to default key value store only if they are not to be retained for long time as default key value store has a limited retention policy.
