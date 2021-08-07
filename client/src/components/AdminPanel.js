import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import CardRow from './CardRow';
import { Button } from 'react-bootstrap';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [verifiedProduct, setVerifiedProduct] = useState({});
  const [checkVerified, setCheckVerified] = useState(null);

  useEffect(() => {
    fetchData();
  }, [checkVerified]);

  async function fetchData() {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/products`);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const pendingProducts = products.filter((product) => product.verified === null);
  const checkedProducts = products.filter(
    (product) => product.verified === true || product.verified === false,
  );

  const acceptProduct = async (e) => {
    const productID = e.target.id;
    try {
      await axios.patch(`http://localhost:3000/api/v1/products/${productID}`).then((response) => {
        setVerifiedProduct(response.data);
        setCheckVerified(verifiedProduct.verified);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const isExpert = (isVerified, product_id) => {
    switch (isVerified) {
      case true:
        return (
          <div>
            <span style={{ color: 'green', fontWeight: 'bold', cursor: 'default' }}>Verified</span>
            <Button
              id={product_id}
              onClick={(e) => acceptProduct(e)}
              style={{ backgroundColor: 'red', color: 'white', margin: '0 10px' }}
            >
              Decline
            </Button>
          </div>
        );
      case false:
        return (
          <div>
            <span style={{ color: 'red', fontWeight: 'bold', cursor: 'default' }}>
              Not Verified
            </span>
            <Button
              id={product_id}
              onClick={(e) => acceptProduct(e)}
              style={{ backgroundColor: 'green', color: 'white', margin: '0 10px' }}
            >
              Accept
            </Button>
          </div>
        );
      case null:
        return (
          <div>
            <Button
              id={product_id}
              onClick={(e) => acceptProduct(e)}
              style={{ backgroundColor: 'blue', color: 'white', margin: '0 10px' }}
            >
              Pending Verification ...
            </Button>
          </div>
        );
    }
  };

  return (
    <>
      <div style={{ marginTop: '1em' }}>
        <Tabs defaultActiveKey="Not Verified" justify>
          <Tab eventKey="Verified" title="Verified">
            <div style={{ paddingTop: '1em', paddingBottom: '1em' }}>
              {checkedProducts.map((product) => {
                return (
                  <CardRow key={product._id}>
                    <Col style={{ maxWidth: '100px', padding: '0' }}>
                      <Link to={`/${product._id}`} style={{ textDecoration: 'none' }}>
                        <img width={100} src={product.images[0]} alt={product.title} />
                      </Link>
                    </Col>
                    <Col>
                      <span style={{ fontWeight: 'bold' }}> {product.title} </span>
                    </Col>
                    <Col style={{ textAlign: 'center' }}>
                      <span style={{ fontWeight: 'bold' }}>Price : {product.price}€ </span>
                    </Col>
                    <Col style={{ textAlign: 'center' }}>
                      {isExpert(product.verified, product._id)}
                    </Col>
                  </CardRow>
                );
              })}
            </div>
          </Tab>
          <Tab eventKey="Not Verified" title="Not verified yet">
            <div style={{ paddingTop: '1em', paddingBottom: '1em' }}>
              {pendingProducts.map((product) => {
                return (
                  <CardRow key={product._id}>
                    <Col style={{ maxWidth: '100px', padding: '0' }}>
                      <Link to={`/${product._id}`} style={{ textDecoration: 'none' }}>
                        <img width={100} src={product.images[0]} alt={product.title} />
                      </Link>
                    </Col>
                    <Col>
                      <span style={{ fontWeight: 'bold' }}> {product.title} </span>
                    </Col>
                    <Col style={{ textAlign: 'center' }}>
                      <span style={{ fontWeight: 'bold' }}>Price : {product.price}€ </span>
                    </Col>
                    <Col style={{ textAlign: 'center' }}>
                      {isExpert(product.verified, product._id)}
                    </Col>
                  </CardRow>
                );
              })}
            </div>
          </Tab>
        </Tabs>
      </div>
    </>
  );
}

export default AdminPanel;
