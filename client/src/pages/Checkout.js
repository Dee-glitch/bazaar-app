import axios from 'axios';
import Payment from '../components/Payment';
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Image } from 'react-bootstrap';
import AddressesDropdown from '../components/AddressesDropdown';

const Checkout = (prop) => {
  const product = prop.location.state;

  const [seller, setSeller] = useState([]);
  const [shippingAddress, setShippingAddress] = useState(null);

  const getShippingAddress = (address) => setShippingAddress(address);

  useEffect(() => fetchSellerData(), []);

  const fetchSellerData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/${product.user}`);

      setSeller(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Row style={{ margin: 'auto' }}>
      <Col md={8}>
        <Card style={cardStyles}>
          <Card.Header>{product.title}</Card.Header>

          <Card.Body style={{ display: 'flex', alignItems: 'center' }}>
            <Col xs={6} md={4}>
              <Image
                thumbnail
                alt="Product Image"
                src={product.images[0]}
                style={{ width: '100%', borderRadius: '0.5rem' }}
              />
            </Col>

            <Card style={{ border: '0', textAlign: 'center', marginLeft: '10px' }}>
              <Card.Title>{product.price} €</Card.Title>
              <Card.Title>{product.description}</Card.Title>
            </Card>
          </Card.Body>
        </Card>

        {/* get it from the child component (AddressesDropdown) */}
        <AddressesDropdown getShippingAddress={getShippingAddress} />

        <Card style={cardStyles}>
          <Card.Header>Credit Card Info</Card.Header>

          <Card.Body>
            <Payment product={product} shippingAddress={shippingAddress} />
          </Card.Body>
        </Card>
      </Col>

      <Col style={{ textAlign: 'center', paddingTop: '10rem' }} md={4}>
        <Image
          thumbnail
          alt="User image"
          src={
            seller.avatar ||
            'https://static.zooniverse.org/www.zooniverse.org/assets/simple-avatar.png'
          }
          style={{
            padding: '5px',
            width: '10rem',
            height: '10rem',
            borderRadius: '1rem',
            border: '1px solid var(--color-main)',
          }}
        />

        <Card.Title>
          {seller.first_name} {seller.last_name}
        </Card.Title>
      </Col>
    </Row>
  );
};

const cardStyles = {
  marginBottom: '10px',
  borderColor: 'var(--color-main)',
};

export default Checkout;
