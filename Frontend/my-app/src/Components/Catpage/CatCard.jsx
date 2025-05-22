import React, { useState } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import PetModal from "../Modal/PetModal";
import { useNavigate } from "react-router-dom";
import '../AllDetails/styles.css'
const CatCard = ({ cats }) => {
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const navigate = useNavigate();
  const handleAdoptClick = () => {
    navigate("/adopt");
  };

  return (
    <div className="cards">
      <Card className="mb-3">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={4} className="text-center">
              <Card.Img
                src={cats.image}
                style={{ height: "250px", width: "250px" }}
              />
            </Col>
            <Col md={4}>
              <Card.Title style={{ fontSize: "30px", textAlign: "center" }}>
                {cats.petName}
              </Card.Title>
              <ul id={cats.id} className="list-unstyled">
                <li>Breed: {cats.breed}</li>
                <li>Age: {cats.age}</li>
                <li>Gender: {cats.gender}</li>
                <li>Species: {cats.species}</li>
                <li>Special Characteristics: {cats.specialCharacteristics}</li>
              </ul>
            </Col>
            <Col md={4} className="d-flex flex-column align-items-center">
              <Button
                // variant="primary"
                className="adopt-btn mb-2"
                style={{ width: '200px' }}
                onClick={handleAdoptClick}
              >
                Adopt me
              </Button>
              <Button
                // variant="info"
                className="about-btn mb-2"
                style={{ width: '200px' }}
                onClick={handleShow}
              >
                About me
              </Button>
              <PetModal show={showModal} onHide={handleClose} Pets={cats} />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CatCard;
