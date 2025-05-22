import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const UpdatePetModal = ({ show, onHide, pet, onUpdate }) => {
  const [petData, setPetData] = useState(pet);

  useEffect(() => {
    setPetData(pet);
  }, [pet]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetData({ ...petData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8000/api/pets/update/${petData._id}`,
        petData
      );
      if (response.status === 200) {
        onUpdate(petData);
        onHide();
        window.location.reload(true);
      } else {
        console.error("Failed to update pet");
      }
    } catch (error) {
      console.error("Error updating pet:", error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Update Pet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formPetName">
            <Form.Label>Pet Name</Form.Label>
            <Form.Control
              type="text"
              name="petName"
              value={petData.petName || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBreed">
            <Form.Label>Breed</Form.Label>
            <Form.Control
              type="text"
              name="breed"
              value={petData.breed || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formSpecies">
            <Form.Label>Species</Form.Label>
            <Form.Control
              type="text"
              name="species"
              value={petData.species || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formAge">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="text"
              name="age"
              value={petData.age || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formGender">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              type="text"
              name="gender"
              value={petData.gender || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formOrigin">
            <Form.Label>Origin</Form.Label>
            <Form.Control
              type="text"
              name="origin"
              value={petData.origin || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formSize">
            <Form.Label>Size</Form.Label>
            <Form.Control
              type="text"
              name="size"
              value={petData.size || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formWeight">
            <Form.Label>Weight</Form.Label>
            <Form.Control
              type="text"
              name="weight"
              value={petData.weight || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formTemperament">
            <Form.Label>Temperament</Form.Label>
            <Form.Control
              type="text"
              name="temperament"
              value={petData.temperament || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formCoat">
            <Form.Label>Color and Coat Type</Form.Label>
            <Form.Control
              type="text"
              name="coat"
              value={petData.coat || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formLifeSpan">
            <Form.Label>Life Span</Form.Label>
            <Form.Control
              type="text"
              name="lifeSpan"
              value={petData.lifeSpan || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formSpecialCharacteristics">
            <Form.Label>Special Characteristics</Form.Label>
            <Form.Control
              type="text"
              name="specialCharacteristics"
              value={petData.specialCharacteristics || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Update
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdatePetModal;
