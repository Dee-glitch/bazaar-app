import React from 'react';
import { Container, Row } from 'react-bootstrap';

const CardRow = ({ children }) => {
  return (
    <Container style={{ margin: '2px 0', backgroundColor: 'var(--color-main-opacity-10)' }}>
      <Row style={{ alignItems: 'center' }}>{children}</Row>
    </Container>
  );
};

export default CardRow;
