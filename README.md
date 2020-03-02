# ChittrApp
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
## Setup
### Google Maps API key
In order to view a Chits location, you must provide your own API key. An API key has not been included in this project for security.
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