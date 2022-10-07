# se-group26-proj1

![MIT license](https://img.shields.io/badge/License-MIT-green.svg)
![GitHub](https://img.shields.io/badge/Language-JavaScript-blue.svg)
![Yarn](https://img.shields.io/badge/Yarn-v1.22.19-green.svg)
![npm](https://img.shields.io/badge/npm-v8.9.0-green.svg)
![Node](https://img.shields.io/badge/node-v16.15.1-green.svg)
![Python](https://img.shields.io/badge/python-v3.8-green.svg)
![GitHub issues](https://img.shields.io/github/issues/ekanshsinghal/se-group26-proj1)
![Repo Size](https://img.shields.io/github/repo-size/ekanshsinghal/se-group26-proj1?color=brightgreen)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/ekanshsinghal/se-group26-proj1/frontend-build)
[![codecov](https://codecov.io/github/ekanshsinghal/se-group26-proj1/branch/main/graph/badge.svg?token=fHCWUMUXXr)](https://codecov.io/github/ekanshsinghal/se-group26-proj1)

## Built With

-   `react 18.2.x`
-   `babel 7.19.x`
-   `webpack cli 4.x`
-   `sass` (Dart Sass)

Note: This repository is configured with [Dart-sass](https://github.com/sass/dart-sass) and not [Node Sass].

## Getting Started

### Prerequisites

-   npm 8.x (8.9 recommended)
-   yarn 1.22.x

### Installation

1. Clone the repository

```
git clone https://github.com/ekanshsinghal/se-group26-proj1.git
```

2. Install NPM dependencies

```
cd se-group26-proj1
yarn
```

## Available Scripts

### Development Mode

In the project directory, you can run:

```
yarn start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Production Optimised Build

```
yarn build
```

Builds the app for production to the `build` folder.\
It bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Install Backend requirements

Open a new terminal inside the backend directory.

```cd se-group26-proj1\backend```

### For Windwos
Create a virtual environment called `venv`
```
python -m venv venv
```

Activate the virtual environment
```
venv\Scripts\activate.bat
```

Install required packages for the Flask server
```
pip install -r requirements.txt
```

Run the flask server.
```
python app.py
```

### For Mac OS

Create a virtual environment called `venv`
```
python -m venv venv
```

Activate the virtual environment
```
source venv\bin\activate
```

Install required packages for the Flask server
```
pip install -r requirements.txt
```

Run the flask server.
```
python app.py
```


## License

Distributed under the MIT License. See `LICENSE` for more information.
