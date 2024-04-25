# Table of contents

- [Table of contents](#table-of-contents)
  - [Frontend](#frontend)
    - [How to run](#how-to-run)
      - [Prerequisites](#prerequisites)
      - [Setting up the environment](#setting-up-the-environment)
      - [Running the frontend](#running-the-frontend)
    - [Building docker](#building-docker)
  - [Deploy to gcp](#deploy-to-gcp)

## Frontend

This is the React frontend for the Emily project.

### How to run

#### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18.18.0 or higher)
- [yarn](https://yarnpkg.com/) (v1.22.19 or higher)

#### Setting up the environment

1. Open the project in Visual Studio Code
2. Add an `.env` file to the root of the project with the following contents (replace the values with the correct ones):
3. Add

```
REACT_APP_API_URL="<Base URL to the backend>"
```

3. Install the dependencies by running the following command in the terminal:

```
yarn install
```

#### Running the frontend

1. Open the project in Visual Studio Code
2. Run the following command in the terminal:

```
yarn start
```

3. The frontend should now be running on `http://localhost:3000/`

### Building docker

```
docker build --build-arg REACT_APP_API_URL="<Base URL to the backend>" -t <container name> .
```

## Deploy to gcp

1. go inside the frontend folder `cd  frontend`
2. build the `build` folder `yarn build`
3. run `gcloud app deploy`
