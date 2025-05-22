import React from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import './PetList.css';
import './AllDetails/styles.css';

const PetList = () => {
  const navigate = useNavigate();

  const handleDogClick = () => {
    navigate('/dogs');
  };

  const handleCatClick = () => {
    navigate('/cats');
  };

  return (
    <Container className="pet-list-container">
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="d-grid gap-4 pet-grid">
            <Card className="text-center pet-card">
              <Card.Img
                variant="top"
                src="https://i.pinimg.com/236x/fe/de/cc/fedecc5f7c08330b01c1088d8f98c0c3.jpg"
                alt="Dogs and Puppies"
              />
              <Card.Body>
                <Card.Title>Dogs and Puppies</Card.Title>
                <div className="d-grid">
                  <Button onClick={handleDogClick} className="adopt-btn">
                    Dogs
                  </Button>
                </div>
              </Card.Body>
            </Card>

            <Card className="text-center pet-card">
              <Card.Img
                variant="top"
                src="https://i.pinimg.com/236x/a3/a2/98/a3a2981c812d1873cf25ff393babde00.jpg"
                alt="Cats and Kittens"
              />
              <Card.Body>
                <Card.Title>Cats and Kittens</Card.Title>
                <div className="d-grid">
                  <Button onClick={handleCatClick} className="adopt-btn">
                    Cats
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PetList;
