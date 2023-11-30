const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const server = http.createServer(app);
const dbMongo = require("./apps/database/dbMongo");
const dbPG = require("./apps/database/dbPG");
const routes = require("./apps/routes/api.routes");
const limiter = require("./apps/utils/rateLimit");
require("dotenv").config();

//Database Connection
// dbMongo();
dbPG.connectDbPG();

//middlewares
app.use(limiter);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
routes(app);

//Server Connection
const PORT = process.env.PORT;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));