import React from 'react';
import { Container, Row } from 'react-bootstrap';

const NotFoundPage = () => {
  return (
    <Container>
      <Row>
        <div className="col-10 mx-auto text-center text-title text-uppercase py-5">
          <h1 className="display-4">404</h1>
          <h1>Error</h1>
          <h2>Page Not Found</h2>
          <h3>The requested URL was not found</h3>
        </div>
      </Row>
    </Container>
  );
};

export default NotFoundPage;
