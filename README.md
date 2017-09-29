# Website for SonaSarovarTrust

## Contributing

### Prerequisites

| Prerequisite                                | Version |
| ------------------------------------------- | ------- |
| [MongoDB](http://www.mongodb.org/downloads) | `~ ^3`  |
| [Node.js](http://nodejs.org)                | `~ 7`   |

Please use **Node 7** for this project, as other node versions may cause
inconsistent behaviour. 

### Deploying the Project

#### Setting Up Your System

1. Start *mongodb* server

2. Clone the project from this repo.

3. `cd` into the cloned repo

4. Create and fill a `.env` file.

```shell
   cp sample.env .env
```

Then fill it up with appropriate values.

7. Install `npm` dependencies

```shell
   npm i
```

6. Seed your database and create resources.

```shell
   npm run seed
```

7. Install forever globally  
(Optional) If you are deploying in production env
```shell
   npm i forever -g
```


#### Start dev server

1. Run npm's `start` command
```shell
   npm start
```

2. Go to url - [http://localhost:8080](http://localhost:8080) to see the live project
