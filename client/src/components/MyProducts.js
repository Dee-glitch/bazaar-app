import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Card, Button } from 'react-bootstrap';

const MyProducts = () => {
  const [userData, setUserData] = useState([]);
  const { user } = useContext(AuthContext);

  async function fetchUser() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/${user._id}`);
      setUserData(response.data.products);
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteProduct(id) {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/products/${id}`);
      const filteredProducts = userData.filter((filteredProduct) => {
        return filteredProduct._id !== id;
      });
      setUserData(filteredProducts);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="d-flex flex-wrap justify-content-center">
      {userData.length !== 0 ? (
        userData.map((product) => {
          return (
            <Card className="m-3" style={{ width: '15rem' }} key={product._id}>
              <Card.Img
                variant="top"
                src={product.images}
                alt={product.title}
                style={{
                  height: '200px',
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
              <Card.Body style={{ color: 'var(--color-main)' }}>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>{product.price} €</Card.Text>
                <Button onClick={() => deleteProduct(product._id)} variant="danger">
                  Delete
                </Button>
                <Link to={`/update/${product._id}`}>
                  <Button
                    style={{ background: 'var(--color-main)', color: 'white', marginLeft: '5px' }}
                  >
                    Edit
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          );
        })
      ) : (
        <h1>No Products Yet</h1>
      )}
    </div>
  );
};

export default MyProducts;
