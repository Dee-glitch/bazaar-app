import React from 'react';
import CardRow from './CardRow';
import { Col } from 'react-bootstrap';

const Orders = ({ orders }) => {
  if (orders) {
    const ordersItems = orders.map((order) => {
      const date = new Date(order.createdAt);

      return (
        <CardRow key={order._id}>
          <Col style={{ maxWidth: '100px', padding: '0' }}>
            <img
              width={100}
              src={order.product.images[0]}
              alt={order.product.title}
            />
          </Col>

          <Col>{order.product.title}</Col>

          <Col style={{ textAlign: 'right' }}>{order.product.price}</Col>

          <Col style={{ textAlign: 'right' }}>
            {date.getDate()}-{date.getMonth()}-{date.getFullYear()}
          </Col>
        </CardRow>
      );
    });

    return ordersItems;
  }

  return (
    <div style={{ paddingTop: '1em', paddingBottom: '1em' }}>
      {/* {orders && ordersItems} */}
    </div>
  );
};

export default Orders;
