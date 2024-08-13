import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Link to="/" className="btn btn-primary">Home</Link>
              </div>
              <Card.Title>About the Local Event Finder</Card.Title>
              <Card.Subtitle className="mb-3 text-muted">Meet *Celebrity Name*</Card.Subtitle>
              <Card.Text>
                *Celebrity Name* is a celebrated figure in the St. Louis community, known for their extensive knowledge and passion for local events and culture. With a career spanning *number* years, *Celebrity Name* has shared their expertise through popular articles, books, guides, and media appearances. Their deep understanding of what makes St. Louis unique has made them a trusted voice for locals and visitors alike.
              </Card.Text>
              <Card.Subtitle className="mb-3 text-muted">Our Mission</Card.Subtitle>
              <Card.Text>
                Our mission is to connect you with the best events and activities that the St. Louis metro area has to offer. Whether you're looking for a lively concert, a family-friendly festival, or a hidden gem, we've got you covered. Our curated lists are designed to provide you with only the most exciting and noteworthy events, ensuring that you always have something to look forward to.
              </Card.Text>
              <Card.Text>
                Thank you for visiting Local Event Finder. We hope you find this platform helpful and inspiring as you explore the best of St. Louis!
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
