# indecision-plaza

Your go-to Nativescript application for choosing the lunch time
meal destination. Press the button and end the argument!

## Getting Started

### Prerequisites
Use the default Nativescript installation method provided
[here](https://docs.nativescript.org/angular/start/quick-setup). It provides
platform-specific methods of installing all prerequisite programs.

### Installation

You can clone this repository by navigating to the desired directory and executing
```
git clone https://github.com/lshadler/indecision-plaza.git
```
For a given platform, `android` or `ios`, add the platform to the project by executing
```
tns platform add [platform]
```
Then, to begin simulation, run
```
tns run [platform]
```

### Deployment

Running the `tns run` commands will produce rudimentary builds of the apk in the `[platform]/build` directory. 
However, to extract further efficiency, we use [Webpack](https://docs.nativescript.org/angular/best-practices/bundling-with-webpack) 
to bundle our application. Execute these commands to create a compressed build file for each platform:

```
npm run build-android-bundle
```
```
npm run build-ios-bundle
```

### Publishing

In Progress...

## Technologies Used
* [Nativescript](https://docs.nativescript.org/angular/start/introduction)
* [Angular 2](https://angular.io/)
* [Android Studio](https://developer.android.com/studio/index.html)
* [Atom](https://atom.io/)

## Contributors

Please refer to the CONTRIBUTORS.md for contributing developers
