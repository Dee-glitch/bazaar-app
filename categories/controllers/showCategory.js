const CategoryModel = require('../categoryModel');

async function showCategory(req, res) {
  res.header('Access-Control-Allow-Origin', '*');

  try {
    const categories = await CategoryModel.find().populate('categories');
    res.status(200).json(categories);
  } catch (error) {
    console.log('Error while showing category');
    console.log('Request', req);
    console.log('Error', error);

    res.status(500).json(`Could not show category`);
  }
}

module.exports = showCategory;
