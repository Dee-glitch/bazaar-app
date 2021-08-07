import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import axios from 'axios';

const SeeWhatNew = () => {
  const [products, setProducts] = useState([]);
  products.sort(function sortProductsByDateDesc(a, b) {
    const dateA = new Date(a.createdAt),
      dateB = new Date(b.createdAt);
    return dateB - dateA;
  });
  const sortedProductsByDate = products.slice(0, 10);
  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>See Whats New</h2>
      <ProductList products={sortedProductsByDate} />
    </div>
  );
};
export default SeeWhatNew;
