import React, { useContext, useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import NotifyIcon from './NotifyIcon';
import { AiFillStar } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProductDetail = ({ product }) => {
  const history = useHistory();
  const { addFavorite, deleteFavorite } = useContext(AuthContext);
  const { user, currentUser } = useContext(AuthContext);

  const goToCheckout = () =>
    history.push({
      pathname: '/orders/checkout',
      state: product,
    });

  return (
    <div key={product._id}>
      <Card style={{ borderColor: 'var(--color-main)' }}>
        <Card.Body>
          <Row>
            <Col>
              <Card.Img style={{ minWidth: '250px' }} src={product.images} alt={product.title} />
            </Col>
            <Col>
              <Card.Title>{product.title}</Card.Title>
              <NotifyIcon product={product.verified} />
              <Card.Text>{product.price} € </Card.Text>
              <Card.Text style={{ textAlign: 'left' }}>{product.description}</Card.Text>
              <Row>
                {' '}
                <Col>
                  {currentUser && currentUser.favorites.includes(product._id) ? (
                    <Button
                      className="w-100"
                      style={{ backgroundColor: 'var(--color-main)' }}
                      onClick={() => {
                        deleteFavorite(user, product._id);
                      }}
                    >
                      <AiFillStar style={{ color: 'red' }} />{' '}
                    </Button>
                  ) : (
                    <Button
                      className="w-100"
                      style={{ backgroundColor: 'var(--color-main)' }}
                      onClick={() => {
                        addFavorite(user, product._id);
                      }}
                    >
                      <AiFillStar style={{ color: 'yellow' }} />
                    </Button>
                  )}
                </Col>
                <Col>
                  {' '}
                  <Button
                    className="w-100"
                    style={{ backgroundColor: 'var(--color-main)' }}
                    onClick={goToCheckout}
                  >
                    Buy
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductDetail;
