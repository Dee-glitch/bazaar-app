import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import SimilarProducts from '../components/SimilarProducts';
import ProductDetail from '../components/ProductDetail';
import NotFoundPage from './NotFoundPage';
import UserDetail from '../components/UserDetail';
import Loading from '../components/Loading';
import SeeWhatNew from '../components/SeeWhatNew';

const ProductDetailPage = () => {
  const [product, setProduct] = useState('');
  const [error, setError] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    fetchData();
  }, [id]);

  async function fetchData() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      setError(true);
      console.log('error:', error);
    }
  }
  if (product)
    return (
      <>
        <Container>
          <Row>
            <Col xs={12} md={8} lg={8}>
              <ProductDetail product={product} />
            </Col>
            <Col xs={12} md={4} lg={4}>
              <UserDetail product={product} />
            </Col>
          </Row>
        </Container>

        <h2 style={{ textAlign: 'center', marginTop: '70px' }}>See Similar Products</h2>
        {product.categories && <SimilarProducts product={product} />}
        {<SeeWhatNew />}
      </>
    );
  if (error) return <NotFoundPage />;
  return <Loading />;
};

export default ProductDetailPage;
