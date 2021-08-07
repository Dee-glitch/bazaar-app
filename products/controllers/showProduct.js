const ProductModel = require('../productModel');

async function showProduct(req, res) {
  try {
    const product = await ProductModel.findById(req.params.id).populate('categories');

    res.status(200);
    res.json(product);
  } catch (error) {
    console.log('Error while showing product');
    console.log('Request', req);
    console.log('Error', error);

    res.status(500).json(`Could not show product`);
  }
}

module.exports = showProduct;
