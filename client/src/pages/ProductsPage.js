import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap';

import axios from 'axios';
import ProductList from '../components/ProductList';
import Filters from '../components/Filters';
import Category from '../components/Category';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [state, setState] = useState(false);
  const { keyword } = useParams();

  useEffect(() => {
    fetchData();
    fetchDataKeyword();
  }, [keyword]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchDataKeyword = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/products/searchedProduct/${keyword}`,
      );
      const { data } = response;

      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/products`);
      const { data } = response;
      setState(false);
      setAllProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const productsByCategory = allProducts.filter(
    (product) => product.categories.length > 0 && product.categories[0].name === keyword,
  );

  const handlePriceRange = (lowPrice, highPrice) => {
    const priceRange = productsByCategory.filter(
      (item) => item.price >= Number(lowPrice) && item.price <= Number(highPrice),
    );
    setState(true);
    setProducts(priceRange);
  };

  const handleState = (state) => {
    const stateList = productsByCategory.filter((item) => item.condition === state);
    setState(true);
    setProducts(stateList);
  };

  const oldNewProducts = () => {
    const sortedOldNew = productsByCategory.sort(function sortProductsByDateDesc(a, b) {
      const dateA = new Date(a.createdAt),
        dateB = new Date(b.createdAt);
      return dateA - dateB;
    });
    setState(true);
    setProducts(sortedOldNew);
  };

  const newOldProducts = () => {
    const sortedNewOld = productsByCategory.sort(function sortProductsByDateDesc(a, b) {
      const dateA = new Date(a.createdAt),
        dateB = new Date(b.createdAt);
      return dateB - dateA;
    });
    setState(true);
    setProducts(sortedNewOld);
  };

  const handleLocation = (location) => {
    const sortedLocation = productsByCategory.filter(
      (item) => item.city.toLowerCase() === location.toLowerCase(),
    );
    setState(true);
    setProducts(sortedLocation);
  };

  return (
    <div>
      <Filters
        products={productsByCategory}
        handlePriceRange={handlePriceRange}
        handleState={handleState}
        oldNewProducts={oldNewProducts}
        newOldProducts={newOldProducts}
        handleLocation={handleLocation}
        fetchData={fetchData}
      />

      <Container>
        <Row>
          <Col xs={12} md={4} lg={3}>
            <div>
              <Category />
            </div>
          </Col>
          <Col xs={12} md={8} lg={9}>
            <div>
              {products.length === 0 && productsByCategory.length !== 0 && !state && (
                <ProductList products={productsByCategory} />
              )}

              {products.length !== 0 && productsByCategory.length !== 0 && (
                <ProductList products={products} />
              )}

              {products.length !== 0 && !state && <ProductList products={products} />}

              {products.length === 0 && state && (
                <h1 className="text-center margin-t-3">No Items Available </h1>
              )}
              {products.length === 0 && productsByCategory.length === 0 && (
                <ProductList products={allProducts} />
              )}
              {productsByCategory.length === 0 && products.length === 0 && !state && (
                <h1 className="text-center margin-t-3">No Items Available </h1>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Products;
