import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const InfoPage = () => {
  return (
    <Container className="border" style={{ color: 'teal' }}>
      <Container style={{ marginTop: '2%', marginBottom: '2%', padding: '1%' }}>
        <h2>
          <a style={{ color: 'teal', textDecoration: 'none' }} href="#about">
            About Bazaar
          </a>
        </h2>
        <h2>
          <a style={{ color: 'teal', textDecoration: 'none' }} href="#payment">
            Payment
          </a>
        </h2>
        <h2>
          <a style={{ color: 'teal', textDecoration: 'none' }} href="#details">
            Buy/Sell details
          </a>
        </h2>
        <h2>
          <a style={{ color: 'teal', textDecoration: 'none' }} href="#fqa">
            FAQ
          </a>
        </h2>
        <h2>
          <a style={{ color: 'teal', textDecoration: 'none' }} href="#contact">
            Contact Us
          </a>
        </h2>
      </Container>
      <Container
        style={{ marginTop: '2%', marginBottom: '2%', padding: '1%' }}
        className="border"
        id="about"
      >
        <h3>About Bazaar</h3>
        <p style={{ fontSize: '1.1rem' }}>
          About Bazaar, Bazaar is an online trading place in the Netherlands for private and
          business providers of second-hand and new products. There is something for everyone on
          Marktplaats (founded in 2021). From furniture and clothing to cars and everyday products,
          via Bazaar it finds a second, third or even fourth life. On Bazaar, every deal makes a
          big difference. we connect buyers and sellers. In this way, Bazaar users contribute
          together to a world in which people share more and waste less
        </p>
      </Container>
      <Container
        style={{ marginTop: '2%', marginBottom: '2%', padding: '1%' }}
        className="border"
        id="payment"
      >
        <h3>Payment</h3>
        <p style={{ fontSize: '1.1rem' }}>
          At Bazaar we are always innovating to make trading on Bazaar even easier, safer and more
          fun. For example, with Payment Requests via Stripe , our users pay even easier and safer.
        </p>
      </Container>
      <Container
        style={{ marginTop: '2%', marginBottom: '2%', padding: '1%' }}
        className="border"
        id="details"
      >
        <h3>Buy/Sell Details</h3>
        <p style={{ fontSize: '1.1rem' }}>
          Bazaar is an advertising site that brings buyers and sellers together. Despite the fact
          that the website is mainly characterized by its accessible character, Bazaar sees it as
          its mission to advise them as well as possible about pleasant, safe and responsible
          trading. The website is very easy to use. Anyone can place an ad or sell products there.
          All it takes is an email address and a few minutes of your time. Currently, users can
          choose from over 11 categories to place their ad in; from Antiques and Art to Business
          Goods.
        </p>
      </Container>
      <Container
        style={{ marginTop: '2%', marginBottom: '2%', padding: '1%' }}
        className="border"
        id="fqa"
      >
        <h3>FQA</h3>
        <p style={{ fontSize: '1.1rem' }}>
          How to find ads near me
          <br /> Are you curious about advertisements in your area? Then use our Filter on our
          website! This way you can immediately see on the map what is for sale in your area.
        </p>
        <p style={{ fontSize: '1.1rem' }}>
          How do I sign up for My Bazaar?
          <br /> If you want to use My Bazaar , you can easily create an account. With an account
          you benefit from the following handy options:{' '}
          <ul style={{ fontSize: '1.1rem' }}>
            <li> Advertise on Bazaar.</li>
            <li>Making use of Payment Requests.</li>
            <li>Save ads as favorite.</li>
          </ul>
        </p>
        <p style={{ fontSize: '1.1rem' }}>
          How do I delete my ad? <br /> Do you want to delete your ad? No problem! If you use a
          laptop or PC, follow the steps below to remove your ad: Log in to My Marketplace . Go to
          My ads . Click Delete on the add . Your ad has now been removed.
        </p>
      </Container>
      <Container
        style={{ marginTop: '2%', marginBottom: '2%', padding: '1%' }}
        className="border"
        id="contact"
      >
        <h3>
          Have a question? :{' '}
          <Link style={{ color: 'teal' }} to="/ContactUsPage">
            Contact us{' '}
          </Link>{' '}
        </h3>
      </Container>
    </Container>
  );
};

export default InfoPage;
