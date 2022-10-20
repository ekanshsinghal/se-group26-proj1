# JobTrackr Application

[![DOI](https://zenodo.org/badge/543812642.svg)](https://zenodo.org/badge/latestdoi/543812642)
![MIT license](https://img.shields.io/badge/License-MIT-green.svg)
![GitHub](https://img.shields.io/badge/Language-JavaScript-blue.svg)
![Yarn](https://img.shields.io/badge/Yarn-v1.22.19-green.svg)
![npm](https://img.shields.io/badge/npm-v8.9.0-green.svg)
![Node](https://img.shields.io/badge/node-v16.15.1-green.svg)
![Python](https://img.shields.io/badge/python-v3.8-green.svg)

![Open issues](https://img.shields.io/github/issues-raw/ekanshsinghal/se-group26-proj1)
![Closed issues](https://img.shields.io/github/issues-closed-raw/ekanshsinghal/se-group26-proj1?color=bright-green)
[![frontend-build](https://github.com/ekanshsinghal/se-group26-proj1/actions/workflows/frontend_build_test.yml/badge.svg?branch=main)](https://github.com/ekanshsinghal/se-group26-proj1/actions/workflows/frontend_build_test.yml)
[![Backend-build](https://github.com/ekanshsinghal/se-group26-proj1/actions/workflows/backend_build.yml/badge.svg)](https://github.com/ekanshsinghal/se-group26-proj1/actions/workflows/backend_build.yml)
[![Backend-Test](https://github.com/ekanshsinghal/se-group26-proj1/actions/workflows/backend_test.yml/badge.svg)](https://github.com/ekanshsinghal/se-group26-proj1/actions/workflows/backend_test.yml)

<!-- ![Lines of code](https://img.shields.io/tokei/lines-raw/github.com/ekanshsinghal/se-group26-proj1) -->
![Repo Size](https://img.shields.io/github/repo-size/ekanshsinghal/se-group26-proj1?color=brightgreen)
[![GitHub Release](https://img.shields.io/github/release/ekanshsinghal/se-group26-proj1)](https://github.com/ekanshsinghal/se-group26-proj1/releases/)
[![codecov](https://codecov.io/github/ekanshsinghal/se-group26-proj1/branch/main/graph/badge.svg?token=fHCWUMUXXr)](https://codecov.io/github/ekanshsinghal/se-group26-proj1)

## Poster
![Job Trackr X Large Poster-page-001](https://user-images.githubusercontent.com/30636208/197045427-8a170133-5468-42d4-a10e-2b9de0ada1fc.jpg)


## Goal

Your personalized JobTracker application in one place!

## Description

Excel sheets that are complex and disorganized must go! Every job-related data can be managed by our JobTrackr Application, including your job profile, applications, status, important dates, notes, saved applications, job descriptions, recruiter details, compensation and offer package, and more.

![get a job](https://user-images.githubusercontent.com/30636208/194686221-a4300703-2745-4fbb-b59f-81528896040a.gif)

## Introduction

https://user-images.githubusercontent.com/30636208/194798331-9338219d-cdbd-4ff1-96fa-b1425dfc9504.mp4


## Built using

<p align="center">
<img src="https://user-images.githubusercontent.com/30636208/194690148-8e3dbe93-2ede-4da8-a44a-e4ee165b6b3b.png" width="150"> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" width="150"><img src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg" width="150"> <img src="https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg" width ="150"/> <img src="https://camo.githubusercontent.com/36ecb78d148678488fa43e5916e131906c15ea485b30232739d5633b2e0ce18c/68747470733a2f2f6b6576696e2d62726f776e2e636f6d2f696d616765732f666c61736b2d6c6f676f2e737667" width ="150"/> 
</p>


## Basic Design
![image](https://github.com/ekanshsinghal/se-group26-proj1/blob/main/resources/Design.png)

## Roadmap
![image](https://github.com/ekanshsinghal/se-group26-proj1/blob/main/resources/Features.png)


## Application Demo

https://user-images.githubusercontent.com/30636208/194689139-29cdb217-a9e1-4fea-977d-74cbeb6d6799.mp4

## Screenshots

-   Register Page

    ![image](https://user-images.githubusercontent.com/30636208/194688086-ba40502a-e58b-441d-855d-585fecde3ec9.png)

-   Login Page

    ![image](https://user-images.githubusercontent.com/30636208/194688064-d40566de-dcc4-424c-8059-14d655fb7109.png)

-   My Applications Page

    ![My Applications page](https://user-images.githubusercontent.com/30636208/194687994-0ed3a4ac-3856-4ba9-a3af-9acf9d79ca08.png)

-   Add Application Page

    ![image](https://user-images.githubusercontent.com/30636208/194688445-78b7d7b2-6af5-48f1-9197-ba65924660e1.png)

-   Profile Page

    ![image](https://user-images.githubusercontent.com/30636208/194688372-b01a8cb5-b87d-40e3-95af-2cee42fc8de3.png)



## Built With

-   `react 18.2.x`
-   `babel 7.19.x`
-   `webpack cli 4.x`
-   `sass` (Dart Sass)
-   `Python 3.8+`
-   `Flask`
-   `MongoDB`

Note: This repository is configured with [Dart-sass](https://github.com/sass/dart-sass) and not [Node Sass].

## Getting Started

### Prerequisites

-   npm 8.x (8.9 recommended)
-   yarn 1.22.x
-   Python 3.8+

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


## Install Backend requirements

Open a new terminal inside the backend directory.

`cd se-group26-proj1\backend`


Create a virtual environment called `venv`

```
python -m venv venv
```

For Windows - Activate the virtual environment

```
venv\Scripts\activate.bat
```

For Mac OS - Activate the virtual environment
```
source venv/bin/activate
```

Install required packages for the Flask server

```
pip install -r requirements.txt
```

Run the flask server.

```
python app.py
```
The flask server runs in [http://localhost:8000](http://localhost:8000)

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


### Backend Test

Run this command to test the backend APIs

```
python backend\tests.py
```

## Tools

-   Preetier Code Formatter
-   PyLint with Flake8

## Third-Party Tools

-   [MongoDB Cloud](https://www.mongodb.com/)

## Contributors 👨‍🏭

<table>
  <tr>
    <td align="center"><a href="https://github.com/rahulrk2303"><img src="https://avatars.githubusercontent.com/u/30636208?v=4" width="100px;" alt=""/><br /><sub><b>Rahul Rangarajan Kannan</b></sub></a></td>
    <td align="center"><a href="https://github.com/ekanshsinghal"><img src="https://avatars.githubusercontent.com/u/15945880?v=4" width="100px;" alt=""/><br /><sub><b>Ekansh Singhal</b></sub></a></td>
    <td align="center"><a href="https://github.com/gowtham-sathyan"><img src="https://avatars.githubusercontent.com/u/37440294?v=4" width="100px;" alt=""/><br /><sub><b>Gowtham Sathyan</b></sub></a></td>
    <td align="center"><a href="https://github.com/sbkrishna123"><img src="https://avatars.githubusercontent.com/u/89660642?v=4" width="100px;" alt=""/><br /><sub><b>Supriya Krishna</b></sub></a></td>
  </tr>
</table>

## License

Distributed under the MIT License. See `LICENSE` for more information.
