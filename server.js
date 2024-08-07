const express = require('express');
const http=require('http');
const bodyParser = require('body-parser');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const ngrok = require('ngrok');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const typeDefs = require('./graphql/schema/schema');
const resolvers = require('./graphql/resolvers/resolvers');
const redis=require('redis')
//socket io 

const app = express();
app.use(bodyParser.json());
app.use(cors());
const server=http.createServer(app);

app.use(express.urlencoded({ extended:true}));
const PORT = process.env.PORT || 8080;


//simple welcome api for home page
app.get('/', (req, res) => {
  res.send('Welcome to the E-commerce API');
});


//  Swagger
const swaggerDocument = YAML.load('config/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/products', require('./routes/productRoutes'));
app.use('/orders', require('./routes/orderRoutes'));


const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server1 = new ApolloServer({
  typeDefs,
  resolvers
});
const startServer = async () => {
  await server.start();
  app.use('/graphql', expressMiddleware(server1));}

// Apply Apollo Server as middleware to Express
(async () => {
  await server1.start();
  app.use('/graphql', expressMiddleware(server1));
})();

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});



