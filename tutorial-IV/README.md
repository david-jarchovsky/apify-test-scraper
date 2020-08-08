# Quiz Answers
## Tutorial IV Apify CLI & Source Code
1. _Do you have to rebuild an actor each time the source code is changed?_
Yes, each time I want the change to propagate, then I have to rebuild the actor.
1. _What is the difference between pushing your code changes and creating a pull request?_
Pushing code changes is just a mere move of your local changes to remote repository. Pull request is a construct on top of
classical git that allows a code review and if the change is approved than source branch is moved to a target branch of the
pull request.
1. _How does the apify push command work? Is it worth using, in your opinion?_
Apify push builds a docker image, pushes the image into Apify platform as a new version.
