import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import { AuthContext } from '../context/AuthContext';
import NotifyIcon from './NotifyIcon';

const ProductList = (props) => {
  const sortedProducts = props.products;
  const { user, currentUser } = useContext(AuthContext);

  return (
    <>
      <div className="d-flex flex-wrap justify-content-center">
        {sortedProducts.length !== 0 &&
          sortedProducts.map((product) => {
            return (
              <Card className="m-3" style={{ width: '15rem' }} key={product._id}>
                <Link to={`/${product._id}`} style={{ textDecoration: 'none' }}>
                  <Card.Img
                    variant="top"
                    src={product.images}
                    style={{
                      height: '200px',
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                  />
                  <Card.Body style={{ color: 'var(--color-main)' }}>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>{product.price} €</Card.Text>
                    <Card.Text>
                      <NotifyIcon product={product.verified} />
                    </Card.Text>
                    {currentUser && currentUser.favorites.includes(product._id) ? (
                      <AiFillStar style={{ color: 'red', float: 'right', marginTop: '-70px' }} />
                    ) : null}
                  </Card.Body>
                </Link>
              </Card>
            );
          })}
      </div>
    </>
  );
};

export default ProductList;
