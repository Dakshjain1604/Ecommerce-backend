const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const ngrok = require('ngrok');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = YAML.load('config/swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  
app.use(bodyParser.json());


app.use('/auth', require('./routes/authRoutes'));
app.use('/products', require('./routes/productRoutes'));
app.use('/orders', require('./routes/orderRoutes'));
 

app.get('/', (req, res) => {
  res.send('Welcome to the E-commerce API');
});

const PORT = process.env.PORT ||8080 ;
  

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  // try {
  //   // Start ngrok and create a tunnel
  //   const url = await ngrok.connect({
  //     addr: PORT,
  //     authtoken: '2j5u9nzuxuE7QZBmzNG5CHpMPDa_6xFuJw3Dwk5xtL81emivb',  // Add your ngrok auth token here
  //     region: 'us',                  // Optional: Set the region (us, eu, au, ap, sa, jp, in)
  //   });
  //   console.log(`ngrok tunnel opened at ${url}`);
  // }catch (error) {
  //   console.error('Error starting ngrok:', error);
  // }
});
