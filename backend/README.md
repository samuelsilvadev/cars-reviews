<div align="center">
  <h3 align="center">Cars Review - Backend</h3>

  <p align="center">
    <a href="https://github.com/samuelsilvadev/cars-reviews"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://cars-reviews.vercel.app/" target="_blank">View Demo</a>
	  ·
    <a href="https://github.com/samuelsilvadev/cars-reviews/issues">Report Bug</a>
    ·
    <a href="https://github.com/samuelsilvadev/cars-reviews/issues">Request Feature</a>
  </p>
</div>

## Table of Contents

- [About the Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)

## About The Project

API for cars-review, built with strapi.

### Built With

- [strapi.io](https://strapi.io/)

## Getting Started

To get a local copy up and running follow the steps below.

### Prerequisites

- node

You can follow the installation guide from the official documentation
[here](https://nodejs.org/en/)

- yarn

You can follow the installation guide from the official documentation
[here](https://classic.yarnpkg.com/en/docs/install/)

### Installation

1. Clone the repo

```sh
git clone https://github.com/samuelsilvadev/cars-reviews.git
```

2. Enter on backend folder

```sh
cd backend
```

3. Install NPM packages

```sh
yarn
```

4. Setup a mongodb database. To facilitate the process you can use `docker` to do the job

```sh
docker run -d -p 27017-27019:27017-27019 -v ~/mongo/databases:/data/db --name mongodb mongo
```

5. Spin up the development server

```sh
yarn develop
```
