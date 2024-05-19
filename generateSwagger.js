const swaggerAutogen = require('swagger-autogen')();

const args = null; // Você pode definir argumentos adicionais, se necessário
const endpointsFiles = [
  './controllers/Usuario.js',
  './controllers/Veiculo.js',
  './controllers/Vaga.js',
  './controllers/Reserva.js',
  './controllers/Ticket.js'
  // Adicione o caminho de todos os seus controladores aqui
];
const data = null; // Você pode definir dados adicionais, se necessário

const outputFile = './swagger_output.json';

swaggerAutogen(outputFile, endpointsFiles, data).then(result => {
  if (result) {
    console.log('Swagger documentation generated successfully:', result);
  } else {
    console.error('Failed to generate Swagger documentation.');
  }
}).catch(error => {
  console.error('Error generating Swagger documentation:', error);
});
