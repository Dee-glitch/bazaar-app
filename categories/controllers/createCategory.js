const CategoryModel = require('../categoryModel');

async function createCategory(req, res) {
  const categoryBody = req.body;
  const { name } = categoryBody;

  const newCategory = new CategoryModel({
    name,
  });

  try {
    const saved = await newCategory.save();

    if (!saved) {
      return res.status(400).json('Unable to save user please try later');
    }
    return res.status(201).json('Category created successfully');
  } catch (error) {
    console.log('Error while creating category');
    console.log('Request', req);
    console.log('Error', error);

    res.status(500).json('Could not create category');
  }
}

module.exports = createCategory;
