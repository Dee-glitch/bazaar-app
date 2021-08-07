import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from './ProductList';

const SimilarProducts = ({ product }) => {
  const [products, setProducts] = useState([]);
  const category = product.categories[0].name;

  useEffect(() => {
    fetchData();
  }, [product]);

  async function fetchData() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  const similarProducts = products.filter((similarProduct) => {
    return similarProduct.categories[0].name === category && similarProduct._id !== product._id;
  });

  return (
    <div>
      <ProductList products={similarProducts} />
    </div>
  );
};
export default SimilarProducts;
