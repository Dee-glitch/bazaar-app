import React from 'react';
import emailjs from 'emailjs-com';
import { Form, Button, Container } from 'react-bootstrap';
const { REACT_APP_SERVICE_ID, REACT_APP_TEMPLATE_ID, REACT_APP_USER_ID } = process.env;

const ContactUsPage = () => {
  async function sendEmail(e) {
    e.preventDefault();

    try {
      await emailjs.sendForm(
        `${REACT_APP_SERVICE_ID}`,
        `${REACT_APP_TEMPLATE_ID}`,
        e.target,
        `${REACT_APP_USER_ID}`,
      );

      e.target.reset();
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Container className="border" style={{ marginTop: '50px', marginBottom: '2%', width: '50%' }}>
      <h1 style={{ marginTop: '25px' }}>Contact Us</h1>
      <Form onSubmit={sendEmail}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Subject</Form.Label>
          <Form.Control type="text" name="subject" placeholder="Enter Subject" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" placeholder="Enter Name" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="user_email" placeholder="Enter email" required />
          <Form.Text className="text-muted">
            We will never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            name="message"
            placeholder="Enter your message here"
            required
            rows={3}
          />
        </Form.Group>
        <Button variant="primary" type="submit" style={{ marginBottom: '2%' }}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};
export default ContactUsPage;
