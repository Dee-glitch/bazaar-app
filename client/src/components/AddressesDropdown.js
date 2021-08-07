import axios from 'axios';
import { Card, Dropdown } from 'react-bootstrap';
import AddressForm from '../components/AddressForm';
import { AuthContext } from '../context/AuthContext';
import React, { useState, useContext, useEffect } from 'react';

const AddressesDropdown = ({ getShippingAddress }) => {
  const { user } = useContext(AuthContext);

  const [addresses, setAddresses] = useState(null);
  const [shippingAddress, setShippingAddress] = useState(null);

  useEffect(() => fetchAddresses(), [shippingAddress]);

  const fetchAddresses = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/addresses/all/${user._id}`);

    setAddresses(response.data.addresses);
  };

  const handleClick = (e) => {
    const selectedAddress = addresses.find((address) => address._id === e.target.id);

    setShippingAddress(selectedAddress);
  };

  const getNewAddress = (address) => setShippingAddress(address);

  // set it on the parent component (checkoutPage) if the user choose one of the recent addresses
  getShippingAddress(shippingAddress);

  return (
    <>
      <br />
      <Dropdown>
        <Dropdown.Toggle
          id="addresses_dropdown"
          style={{ marginBlock: '1rem', background: 'var(--color-main)' }}
        >
          Choose an address
        </Dropdown.Toggle>

        <Dropdown.Menu onClick={handleClick}>
          {addresses &&
            addresses.map((address) => (
              <Dropdown.Item id={address._id} key={address._id}>
                {`${address.street_name} ${address.building_number} ${address.extension},
                  ${address.post_code} ${address.city} - ${address.country}`}
              </Dropdown.Item>
            ))}

          {shippingAddress && <Dropdown.Item id="new">Add new shipping address</Dropdown.Item>}
        </Dropdown.Menu>
      </Dropdown>

      {shippingAddress ? (
        <Card style={cardStyles}>
          <Card.Header className="card-header">Shipping Address</Card.Header>
          {shippingAddress && (
            <Card.Body>
              <Card.Text>{`${
                shippingAddress.first_name
                  ? shippingAddress.first_name
                  : shippingAddress.last_name
                  ? ''
                  : user.first_name
              } 
                ${
                  shippingAddress.last_name
                    ? shippingAddress.last_name
                    : shippingAddress.first_name
                    ? ''
                    : user.last_name
                }`}</Card.Text>

              <Card.Text>{`${shippingAddress.street_name} ${shippingAddress.building_number} ${shippingAddress.extension},`}</Card.Text>

              <Card.Text>{`${shippingAddress.post_code} ${shippingAddress.city} - ${shippingAddress.country}`}</Card.Text>
              {shippingAddress.comment && <Card.Text>{`${shippingAddress.comment}`}</Card.Text>}
            </Card.Body>
          )}
        </Card>
      ) : (
        // get it from the child component (addressForm) if the user choose to add new one
        !shippingAddress && <AddressForm getNewAddress={getNewAddress} />
      )}
    </>
  );
};

const cardStyles = {
  marginBottom: '10px',
  borderColor: 'var(--color-main)',
};

export default AddressesDropdown;
