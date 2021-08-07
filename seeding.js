const path = require('path');
const seeder = require('mongoose-seed');
const dummyUsers = require('./dummy-files/users.json');
const dummyOrders = require('./dummy-files/orders.json');
const dummyAddress = require('./dummy-files/addresses.json');
const dummyProducts = require('./dummy-files/products.json');
const dummyCategories = require('./dummy-files/categories.json');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
}

seeder.connect(process.env.DB_URL, { useUnifiedTopology: true }, () => {
  seeder.loadModels([
    path.join(__dirname, 'addresses/addressModel.js'),
    path.join(__dirname, 'users/userModel.js'),
    path.join(__dirname, 'products/productModel.js'),
    path.join(__dirname, 'categories/categoryModel.js'),
    path.join(__dirname, 'orders/orderModel.js'),
  ]);

  seeder.clearModels(['address', 'user', 'product', 'category', 'order'], () => {
    seeder.populateModels(data, (err, done) => {
      if (err) {
        return console.log('seed error', err);
      }
      if (done) {
        return console.log('seed done', done);
      }
      return seeder.disconnect();
    });
  });
});

const data = [
  {
    model: 'address',
    documents: dummyAddress,
  },
  {
    model: 'user',
    documents: dummyUsers,
  },

  {
    model: 'product',
    documents: dummyProducts,
  },
  {
    model: 'category',
    documents: dummyCategories,
  },
  {
    model: 'order',
    documents: dummyOrders,
  },
];
