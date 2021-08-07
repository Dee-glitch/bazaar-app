import axios from 'axios';
import React, { useRef, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';

const AddressForm = ({ getNewAddress }) => {
  const { user } = useContext(AuthContext);

  const cityRef = useRef();
  const commentRef = useRef();
  const countryRef = useRef();
  const lastNameRef = useRef();
  const postCodeRef = useRef();
  const extensionRef = useRef();
  const firstNameRef = useRef();
  const streetNameRef = useRef();
  const buildingNumberRef = useRef();

  const addToLocalStorage = (id) => {
    const userData = JSON.parse(localStorage.user);

    userData.addresses.push(id);

    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const newAddress = {
      user: user._id,
      city: cityRef.current.value || null,
      last_name: lastNameRef.current.value,
      extension: extensionRef.current.value,
      first_name: firstNameRef.current.value,
      comment: commentRef.current.value || '',
      country: countryRef.current.value || null,
      post_code: postCodeRef.current.value || null,
      street_name: streetNameRef.current.value || null,
      building_number: buildingNumberRef.current.value || null,
    };

    const isValid = () => {
      for (const key in newAddress) if (newAddress[key] === null) return false;
      return true;
    };

    if (isValid()) {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/addresses/create`,
        newAddress,
      );

      getNewAddress(response.data.address);

      addToLocalStorage(response.data.address._id);
    }
  };

  return (
    <>
      <Card style={cardStyles}>
        <Card.Header>Shipping Address</Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <Form.Control
                type="text"
                ref={firstNameRef}
                style={inputStyles}
                placeholder="First Name"
              />
            </Col>

            <Col md={6}>
              <Form.Control
                type="text"
                ref={lastNameRef}
                style={inputStyles}
                placeholder="Last Name"
              />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Control
                type="text"
                style={inputStyles}
                ref={streetNameRef}
                placeholder="Street Name *"
              />
            </Col>

            <Col md={4}>
              <Form.Control
                type="text"
                style={inputStyles}
                ref={buildingNumberRef}
                placeholder="Building Number *"
              />
            </Col>

            <Col md={2}>
              <Form.Control
                type="text"
                ref={extensionRef}
                style={inputStyles}
                placeholder="Ext. (Optional)"
              />
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <Form.Control
                type="text"
                ref={postCodeRef}
                style={inputStyles}
                placeholder="Post Code *"
              />
            </Col>

            <Col md={4}>
              <Form.Control type="text" ref={cityRef} placeholder="City *" style={inputStyles} />
            </Col>

            <Col md={4}>
              <Form.Control
                type="text"
                ref={countryRef}
                style={inputStyles}
                placeholder="Country *"
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Control
                type="text"
                ref={commentRef}
                style={inputStyles}
                placeholder="Comment (Optional)"
              />
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Button
                value="Add"
                type="submit"
                style={btnStyles}
                onClick={handleClick}
                className="btn btn-primary"
              >
                Add
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <br />
      <br />
    </>
  );
};

const cardStyles = {
  marginBottom: '10px',
  borderColor: 'var(--color-main)',
};

const inputStyles = {
  width: '100%',
  marginBottom: '10px',
};

const btnStyles = {
  marginTop: '10px',
  background: 'var(--color-main)',
};

export default AddressForm;
