const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");
const { sequelize } = require("./models");
const bodyParser = require('body-parser');
var cors = require('cors')

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

require("./controllers/Usuario")(app);
require("./controllers/Veiculo")(app);
require("./controllers/Vaga")(app);
require("./controllers/Reserva")(app);
require("./controllers/Ticket")(app);

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});
  
// Inicialização do servidor
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

sequelize.sync().then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  });