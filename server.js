const express = require('express');
const cors = require('cors');
const path = require('path');

const { loadDb } = require('./db');
const { handleErrors } = require('./middlewares/errors');
const userRouter = require('./users/userRouter');
const productRouter = require('./products/productRouter');
const categoryRouter = require('./categories/categoryRouter');
const addressRouter = require('./addresses/addressRouter');
const orderRouter = require('./orders/orderRouter');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API running');
  });
}

async function run() {
  await loadDb();

  // Middlewares
  app.use(express.json());

  // Route middlewares
  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/products', productRouter);
  app.use('/api/v1/categories', categoryRouter);
  app.use('/api/v1/addresses', addressRouter);
  app.use('/api/v1/orders', orderRouter);

  // handleErrors must be the last middleware
  app.use(handleErrors);

  app.listen(PORT, () => {
    console.log(`Example app listening at ${PORT}`);
  });
}

run();
