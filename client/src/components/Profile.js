import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import noImage from '../images/noImage.png';

const Profile = ({ user }) => {
  let addresses = [];
  if (user.addresses) {
    addresses = user.addresses.map((address) => {
      return (
        <Row key={address._id}>
          <Card style={{ borderColor: 'var(--color-main)' }} className="mt-3">
            <Card.Body>
              <Row>
                <Col>
                  <Card.Title>
                    {address.first_name} {address.last_name}
                  </Card.Title>
                  <Card.Text>
                    {address.city} - {address.country}
                  </Card.Text>
                  <Card.Text>
                    {address.street_name} {address.building_number} {address.extension}
                  </Card.Text>
                  <Card.Text>Postal code: {address.post_code}</Card.Text>
                  <Card.Text>{address.comment}</Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>
      );
    });
  }
  return (
    <Container className="mt-3">
      <Row>
        <Col>
          <h4 className="mb-3">My profile data</h4>
        </Col>
        <Col>
          <a
            className="btn btn-primary"
            href="/edit-profile"
            role="button"
            style={{ background: 'var(--color-main)' }}
          >
            Edit my profile data
          </a>
        </Col>
      </Row>
      <Row>
        <Card style={{ borderColor: 'var(--color-main)' }}>
          <Card.Body>
            <Row>
              <Col>
                {user.avatar === null ? (
                  <Card.Img style={{ maxWidth: '200px' }} variant="top" src={noImage} />
                ) : (
                  <Card.Img style={{ maxWidth: '200px' }} variant="top" src={user.avatar} />
                )}
              </Col>
              <Col>
                <Card.Title>
                  {user && user.first_name} {user && user.last_name}
                </Card.Title>
                <Card.Text>
                  <li>
                    {user.expert ? (
                      <span style={{ color: 'green' }}>Expert</span>
                    ) : (
                      <span style={{ color: 'red' }}>User</span>
                    )}
                  </li>
                  <li> Phone number: {user && user.phone}</li>
                  <li>Email: {user && user.email}</li>
                </Card.Text>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Row>
      <Row>
        <Col>
          {user.addresses && user.addresses.length > 0 ? (
            <h4 className="mt-5">My addresses</h4>
          ) : (
            <h4>You don&apos;t have addresses yet.</h4>
          )}
        </Col>
      </Row>
      {addresses}
    </Container>
  );
};

export default Profile;
