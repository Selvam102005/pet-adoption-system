import React, { useState } from "react";
import { Button, Row, Col, Card } from "react-bootstrap";
import PetModal from "../Modal/PetModal";
import { useNavigate } from "react-router-dom";
import '../AllDetails/styles.css'

const Dogcard = ({ dogs }) => {
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
                src={dogs.image}
                style={{ height: "250px", width: "250px" }}
              />
            </Col>
            <Col md={4}>
              <Card.Title style={{ fontSize: "30px", textAlign: "center" }}>
                {dogs.petName}
              </Card.Title>
              <ul id={dogs._id} className="list-unstyled">
                <li>Breed: {dogs.breed}</li>
                <li>Age: {dogs.age}</li>
                <li>Gender: {dogs.gender}</li>
                <li>Species: {dogs.species}</li>
                <li>Special Characteristics: {dogs.specialCharacteristics}</li>
              </ul>
            </Col>
            <Col md={4} className="d-flex flex-column align-items-center">
              <Button
                className="mb-2 adopt-btn"
                style={{ width: '200px' }}
                onClick={handleAdoptClick}
              >
                Adopt me
              </Button>
              <Button
                className="mb-2 about-btn"
                style={{ width: '200px' }}
                onClick={handleShow}
              >
                About me
              </Button>
              <PetModal show={showModal} onHide={handleClose} Pets={dogs} />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Dogcard;
