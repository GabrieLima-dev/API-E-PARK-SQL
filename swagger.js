const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./controllers/usuario.js']


swaggerAutogen(outputFile, endpointsFiles).then(() => {
    require('./generateSwagger')
})