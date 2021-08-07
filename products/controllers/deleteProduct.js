const Product = require('../productModel');

async function deleteProduct(req, res) {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).send(`Product with the id ${req.params.id} was deleted from the database`);
  } catch {
    res.status(404).json(`Product with the id ${req.params.id} does not exist in the database`);
  }
}
module.exports = deleteProduct;
