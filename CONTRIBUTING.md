# Contributing

## Table of contents

  * [Contributing](#contributing)
  * [Table of contents](#table-of-contents)
  * [Prerequisites](#prerequisites)
    * [Install Via NVM](#install-via-nvm)
  * [Deploy Project](#deploy-project)
    * [Set Up Project](#set-up-project)
    * [Start Development Server](#start-development-server)
    * [Deploy Old UI](#deploy-old-ui)

## Prerequisites

| Prerequisite                                | Version |
| ------------------------------------------- | ------- |
| [MongoDB](http://www.mongodb.org/downloads) | `~ ^3`  |
| [Node.js](http://nodejs.org)                | `~ 7`   |

Please use **Node 7** for this project, as other node versions may cause
inconsistent behaviour.

 ### Install Via NVM
 ```shell
   nvm install 7
 ```

## Deploy Project

 #### Set Up Project

  1. Start *mongodb* server

  2. Clone the project from this repo.

  3. `cd` into the cloned repo

  4. Create and fill a `.env` file.

     a> First copy the `sample.env` file

        ```shell
          cp sample.env .env
        ```

     b> Then fill it up with appropriate values.

  5. Install `npm` dependencies

  ```shell
    npm i
  ```

  6. Seed your database and create resources.

  ```shell
    npm run seed
  ```

  7. Install forever globally
 (Optional) Only if you are deploying in production env

  ```shell
    npm i forever -g
  ```

 #### Start Development Server

  1. Run npm's `start` command

  ```shell
    npm start
  ```

  2. Go to url - [http://localhost:8080](http://localhost:8080) to see the live project

 #### Deploy Old UI
 If you want to see the old ui. Please follow the following steps.

  1. Fetch the old ui branch and switch to it

  ```shell
    git fetch origin old-ui
    git checkout old-ui
  ```

  2. Install additional dependencies

  ```shell
    npm i
  ```
  3. Run npm's `start` command

  ```shell
    npm start
  ```
