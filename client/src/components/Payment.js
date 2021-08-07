import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Form, Alert, Button } from 'react-bootstrap';
import { Elements, CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

const PaymentForm = ({ product, shippingAddress }) => {
  const stripe = useStripe();
  const elements = useElements();

  const { user } = useContext(AuthContext);

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const CARD_OPTIONS = {
    iconStyle: 'solid',
    style: {
      base: {
        color: '#32325d',
        fontSize: '1.2rem',
        iconColor: '#32325d',
        fontFamily: 'Arial',
        fontSmoothing: 'antialiased',
        '::placeholder': { color: '#cccccc' },
        ':-webkit-autofill': { color: '#fce883' },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/orders/checkout`, {
          id,
          user: user._id,
          product: product._id,
          amount: product.price,
          address: shippingAddress._id,
        });

        if (response.data.success) {
          setSuccess(true);
          document.getElementById('addresses_dropdown').disabled = true;
        }
      } catch (error) {
        console.error(`Error ${error}`);
      }
    } else {
      console.error(error.message);
    }

    setLoading(false);
  };

  return (
    <>
      {!success ? (
        <Form onSubmit={handleSubmit}>
          <CardElement options={CARD_OPTIONS} />
          <Button
            type="submit"
            disabled={loading || !shippingAddress}
            style={{
              width: '100%',
              marginTop: '10px',
              background: 'var(--color-main)',
            }}
          >
            Pay now
          </Button>
        </Form>
      ) : (
        <Alert variant="success">Thank you!</Alert>
      )}
    </>
  );
};

const Payment = ({ product, shippingAddress }) => {
  const stripePromise = loadStripe(process.env.REACT_APP_PUBLIC_KEY);

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm product={product} shippingAddress={shippingAddress} />
    </Elements>
  );
};

export default Payment;
