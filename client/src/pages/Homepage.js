import React from 'react';
import { Carousel } from 'react-bootstrap';
import Products from './ProductsPage';
function Homepage() {
  return (
    <>
      <Carousel className="d-flex flex-wrap justify-content-evenly p-4 m-5">
        <Carousel.Item>
          <img
            style={{
              objectFit: 'cover',
              height: '500px',
              width: 'fitContent',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
            className="d-block w-100 carousel-img"
            src={
              'https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80'
            }
            alt="support_locals"
          />
          <Carousel.Caption style={{ position: 'absolute', bottom: '20px' }}>
            <h3
              style={{
                fontSize: '2.77rem',
                textShadow: '2px 2px 10px rgba(0, 0, 0, 0.7)',
                paddingBottom: '0px',
              }}
            >
              Buy, sell, discover{' '}
            </h3>
            <p
              style={{
                textShadow: '0px 0px 5px rgba(0, 0, 0, 2)',
                width: '75%',
                margin: '0 auto',
                fontSize: '1.2rem',
                fontFamily: 'Roboto',
                lineHeight: '30px',
              }}
            >
              Sell what’s in your closet today to buy what you crave tomorrow — always on your own
              terms
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-img"
            style={{
              objectFit: 'cover',
              height: '500px',
              width: 'fitContent',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
            src={
              'https://images.unsplash.com/photo-1470305585628-a7d2cb18efa2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'
            }
            alt="healthy_and_fresh"
          />
          <Carousel.Caption style={{ position: 'absolute', bottom: '20px' }}>
            <h3
              style={{
                fontSize: '2.77rem',
                textShadow: '2px 2px 10px rgba(0, 0, 0, 0.7)',
                paddingBottom: '0px',
              }}
            >
              Quality over quantity
            </h3>
            <p
              style={{
                textShadow: '0px 0px 5px rgba(0, 0, 0, 2)',
                width: '75%',
                margin: '0 auto',
                fontSize: '1.2rem',
                fontFamily: 'Roboto',
                lineHeight: '30px',
              }}
            >
              We care about the quality of the products that you consume, that is why our panel of
              experts will thoroughly examine the merchandise before they verify it.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{
              objectFit: 'cover',
              height: '500px',
              width: 'fitContent',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
            className="d-block w-100 carousel-img"
            src={
              'https://images.unsplash.com/photo-1567981964101-13d2faf0e38b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'
            }
            alt="Delivery"
          />
          <Carousel.Caption style={{ position: 'absolute', bottom: '20px' }}>
            <div>
              <h3
                style={{
                  fontSize: '2.77rem',
                  textShadow: '2px 2px 10px rgba(0, 0, 0, 0.7)',
                  paddingBottom: '0px',
                }}
              >
                Join us today
              </h3>
              <p
                style={{
                  textShadow: '0px 0px 5px rgba(0, 0, 0, 2)',
                  width: '75%',
                  margin: '0 auto',
                  fontSize: '1.2rem',
                  lineHeight: '30px',
                }}
              >
                Sign up now and join millions of people on the bazaar marketplace for all things
                second hand
              </p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Products />
    </>
  );
};
export default Homepage;
