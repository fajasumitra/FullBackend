const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const server = http.createServer(app);
const db = require("./apps/database/db");
const routes = require("./apps/routes/api.routes");
const limiter = require("./apps/utils/rateLimit");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Database Connection
db();

//Routes
routes(app);

//limiter
limiter(app);

//Server Connection
const PORT = process.env.PORT;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));