import React from "react";
import { Modal, Button } from "react-bootstrap";
const PetModal = ({ show, onHide, Pets }) => {
  return (
    <div>
      <Modal show={show} onHide={onHide} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{Pets.petName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul id={Pets.id}>
            <li>Breed : {Pets.breed}</li>
            <li>Age : {Pets.age}</li>
            <li>Gender : {Pets.gender}</li>
            <li>Species : {Pets.species}</li>
            <li>Special Characteristics : {Pets.specialCharacteristics}</li>
            <li>Weight : {Pets.weight}</li>
            <li>Temperamant : {Pets.temperament}</li>
            <li>Coat and Colour : {Pets.coat}</li>
            <li>Life Span : {Pets.lifeSpan}</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide} variant="primary">
            {" "}
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PetModal;
