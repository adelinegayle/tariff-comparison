const config = require("config");
const express = require("express");
const app = express();
const router = express.Router();

const logger = require("./util/logger");
const productComputation = require("./app/controllers/product.controller");

const routePath = process.env.ROUTEPATH || config.get("express.routes.path");
const port = process.env.PORT || config.get("http.port");

router.get("/fetch", (req, res) => {
  const compute = productComputation(req, res);
  compute(config);
});

const onListening = (port) => {
  logger.info(`Server is listening on port ${port}`);
};

app.use(routePath, router);
const server = app.listen(port, onListening(port));
