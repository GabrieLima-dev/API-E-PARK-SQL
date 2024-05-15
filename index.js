const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");
require("./models");

const port = 3000;

require("./controllers/Usuario")(app);

app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(port);
console.log("Rodando...");
