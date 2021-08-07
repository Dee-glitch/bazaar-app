import React, { useState } from 'react';
import { ButtonGroup, Dropdown, Row, Col, Form, Button } from 'react-bootstrap';
import ProductList from './ProductList';

const Filters = ({
  handlePriceRange,
  handleState,
  oldNewProducts,
  newOldProducts,
  handleLocation,
  fetchData,
}) => {
  const [lowPrice, setLowPrice] = useState([]);
  const [highPrice, setHighPrice] = useState([]);
  const [location, setLocation] = useState([]);

  return (
    <div>
      <div>
        <div className="d-flex flex-wrap justify-content-evenly p-4 m-5">
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle
              style={{ backgroundColor: 'var(--color-main)', width: '260px' }}
              id="dropdown-basic"
            >
              Price
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Form>
                <Row>
                  <Col>
                    <Form.Control
                      placeholder="From"
                      onChange={(e) => setLowPrice(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      placeholder="To"
                      onChange={(e) => setHighPrice(e.target.value)}
                    />
                  </Col>

                  <Col>
                    <Button
                      style={{ backgroundColor: 'var(--color-main)', color: 'white' }}
                      variant="info"
                      onClick={() => {
                        handlePriceRange(lowPrice, highPrice);
                      }}
                    >
                      Enter
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle
              style={{ backgroundColor: 'var(--color-main)', width: '260px' }}
              id="dropdown-basic"
            >
              Date
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="old-new" onClick={oldNewProducts}>
                Old - New
              </Dropdown.Item>
              <Dropdown.Item eventKey="new-old" onClick={newOldProducts}>
                New - Old
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle
              style={{ backgroundColor: 'var(--color-main)', width: '260px' }}
              id="dropdown-basic"
            >
              State
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                eventKey="new"
                onClick={() => {
                  handleState('new');
                }}
              >
                New
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="like-new"
                onClick={() => {
                  handleState('like new');
                }}
              >
                Like New
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="fairly-user"
                onClick={() => {
                  handleState('fairly used');
                }}
              >
                Fairly Used
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle
              style={{ backgroundColor: 'var(--color-main)', width: '260px' }}
              id="dropdown-basic"
            >
              Location
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Form>
                <Row>
                  <Col>
                    {' '}
                    <Form.Control
                      placeholder="City Name..."
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Button
                      style={{ backgroundColor: 'var(--color-main)', color: 'white' }}
                      onClick={() => {
                        handleLocation(location);
                      }}
                    >
                      Enter
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Filters;
