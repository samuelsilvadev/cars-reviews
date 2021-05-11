<div align="center">
  <h3 align="center">Cars Review - Frontend</h3>

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

To keep gaining knowledge in next.js framework I started this project combining it with strapi, which is another tool that helps the creation of API's really fast.
Here I tried to not concern to much on the layout part handing it to Material UI.
To connect with strapi API I've made use of Next API which acts as a BFF (backend for frontend) helping to deliver just the exact payload that the frontend needs to work.
Finally, the project goal is to enable users go through cars review in modern and simple way.

### Built With

- [material UI](https://material-ui.com/)
- [next.js](https://nextjs.org/)
- [react-hook-form](https://react-hook-form.com/)

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

2. Enter on frontend folder

```sh
cd frontend
```

3. Install NPM packages

```sh
yarn
```

4. Create an environment file and fill the values according to your setup

```sh
cp .env.sample .env
```

5. Spin up the development server

```sh
yarn develop
```
