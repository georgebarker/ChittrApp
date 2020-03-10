# ChittrApp
Chittr is a totally original, unique and non-plagiarised platform for microblogging. 
# Code style
This project uses the [StandardJS](https://standardjs.com/) JavaScript style guide, linter and  formatter.

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
# Tech stack
Chittr uses [React Native](https://reactnative.dev/), a framework developed by Facebook to write mobile apps that can work across platforms.
This app is written Android-first, meaning features like the Google Maps implementation may not work on iOS. 
# Project tracking
[Trello](https://trello.com/) has been used to manage the workload on this project. Tasks follow the workflow of To Do -> In Design -> In Progress -> Done, with a Blocked state also available for any tasks that are unable to be completed due to factors outside of your own control. 

[The project board can be found here.](https://trello.com/b/k7ntW8z1/chittr)
# Branching strategy
Chittr uses the [Gitflow strategy](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow). All branches are named after the Trello card number that relates to the feature that is being developed, for example 'Search for a user' is Card Number #12, therefore the associated branch is `feature/CHITTRDEV-12`.
Feature branches should be checked out from the `develop` branch, and Pull Requests should be submitted to `develop` when the feature is ready to be merged.
# API Keys
## Google Maps API key
In order to view a Chits location, you must provide your own API key. An API key has not been included in this project so as not to expose private API keys in a remote Git repository.
To provide your own API key you can configure it in your local gradle.properties.
```bash
On Windows: C:\Users\<you>\.gradle\gradle.properties
On Mac/Linux: /Users/<you>/.gradle/gradle.properties
```
Add the following line to the above file:
```bash
Chittr_GoogleMaps_APIKey="YOUR_KEY_HERE"
```
Note that you must follow this name precisely or else the application will not pick up your API key.

# Running the app
* Please follow the [React Native Getting Started]( https://facebook.github.io/react-native/docs/getting-started) guide for all relevant installation prerequisites.
* Ensure that you have correctly provided your 
```bash
# In project root directory...
npm install #ensure that all packages are installed
npx react-native run-android
```
Also ensure that you have the Chittr server running and successfully connected to a MySQL Database.

# Contributions
This app is closed to contributions.