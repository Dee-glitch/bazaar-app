import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import noImage from '../images/noImage.png';

const UserDetail = ({ product }) => {
  const [user, setUser] = useState('');

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/${product.user}`);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Card style={{ width: '12rem', margin: '0 auto' }}>
      {user.avatar === null ? (
        <Card.Img style={{ height: '200px' }} variant="top" src={noImage} />
      ) : (
        <Card.Img style={{ height: '200px' }} variant="top" src={user.avatar} />
      )}
      <Card.Body>
        <Card.Title>
          {user.first_name} {user.last_name}
        </Card.Title>
        <Button className="w-100" style={{ backgroundColor: 'var(--color-main)' }}>
          Send a message
        </Button>
      </Card.Body>
    </Card>
  );
};

export default UserDetail;
