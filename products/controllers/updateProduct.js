const ProductModel = require('../productModel');

let update = {};

async function updateProduct(req, res) {
  try {
    const checkVerify = await ProductModel.findById(req.params.id).select('verified');
    if (checkVerify.verified) {
      update = { verified: false };
    } else if (!checkVerify.verified) {
      update = { verified: true };
    }
    const options = { new: true };
    const result = await ProductModel.findByIdAndUpdate(req.params.id, update, options);
    res.status(200).send(result);
    // res.send(checkVerify);
    // res.send(update);
  } catch (error) {
    res.status(400).json(`Error : ${error}`);
  }
}

module.exports = updateProduct;
