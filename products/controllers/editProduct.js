const Product = require('../productModel');
const Category = require('../../categories/categoryModel');

async function editProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    const { title, description, price, condition, categories, images } =
      req.body;

    const category = await Category.find({ name: categories });

    product.title = title || product.title;
    product.description = description || product.description;
    product.price = price || product.price;
    product.condition = condition || product.condition;
    if (category.length !== 0) {
      product.categories = category || product.categories;
    }

    product.images = images || product.images;

    product.save();

    res.status(200).send(product);
  } catch {
    res
      .status(404)
      .json(
        `Product with the id ${req.params.id} does not exist in the database`,
      );
  }
}
module.exports = editProduct;
