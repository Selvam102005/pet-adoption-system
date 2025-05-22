import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import '../NewPet/PetAddFormStyle.css';
import Navigationbar from '../Navigationbar';

function PetAddForm() {
  const [formData, setFormData] = useState({
    petName: '',
    breed: '',
    species: '',
    age: '',
    gender: '',
    origin: '',
    size: '',
    weight: '',
    temperament: '',
    coat: '',
    lifeSpan: '',
    specialCharacteristics: '',
    image: ''
  });

  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setAlert({ show: false, message: '', variant: '' });

    try {
      const response = await axios.post('http://localhost:8000/api/pets', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setAlert({ show: true, message: 'Pet added successfully!', variant: 'success' });
      clearForm();
    } catch (error) {
      setAlert({ show: true, message: 'Failed to add pet. Please try again.', variant: 'danger' });
    } finally {
      setIsLoading(false);
    }
  };

  const clearForm = () => {
    setFormData({
      petName: '',
      breed: '',
      species: '',
      age: '',
      gender: '',
      origin: '',
      size: '',
      weight: '',
      temperament: '',
      coat: '',
      lifeSpan: '',
      specialCharacteristics: '',
      image: ''
    });
  };

  return (
    <>
      <Navigationbar />
      <div className="form-container">
        {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}
        <Form onSubmit={handleSubmit}>
          <h2 style={{ textAlign: 'center' }}>Add Pet Form</h2>
          <Form.Group className="mb-3">
            <Form.Label>Pet Name</Form.Label>
            <Form.Control
              type="text"
              className="input"
              name="petName"
              placeholder="Enter Name"
              value={formData.petName}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Breed</Form.Label>
            <Form.Control
              type="text"
              name="breed"
              className="input"
              placeholder="Enter Breed"
              value={formData.breed}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Species</Form.Label>
            <Form.Control
              type="text"
              name="species"
              className="input"
              placeholder="Enter Species"
              value={formData.species}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="text"
              name="age"
              className="input"
              placeholder="Enter Age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              type="text"
              name="gender"
              className="input"
              placeholder="Enter Gender"
              value={formData.gender}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Origin</Form.Label>
            <Form.Control
              type="text"
              name="origin"
              className="input"
              placeholder="Enter Origin"
              value={formData.origin}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Size</Form.Label>
            <Form.Control
              type="text"
              name="size"
              className="input"
              placeholder="Enter Size"
              value={formData.size}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Weight</Form.Label>
            <Form.Control
              type="text"
              className="input"
              name="weight"
              placeholder="Enter Weight"
              value={formData.weight}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Temperament</Form.Label>
            <Form.Control
              type="text"
              className="input"
              name="temperament"
              placeholder="Enter Temperament"
              value={formData.temperament}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Color and Coat Type</Form.Label>
            <Form.Control
              type="text"
              className="input"
              name="coat"
              placeholder="Enter Color and Coat Type"
              value={formData.coat}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Life-Span</Form.Label>
            <Form.Control
              type="text"
              className="input"
              name="lifeSpan"
              placeholder="Enter Life Span"
              value={formData.lifeSpan}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Special Characteristics</Form.Label>
            <Form.Control
              type="text"
              className="input"
              name="specialCharacteristics"
              placeholder="Enter Special Characteristics"
              value={formData.specialCharacteristics}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Pet Image URL</Form.Label>
            <Form.Control
              type="text"
              className="input"
              name="image"
              placeholder="Enter Image URL"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" id="gen-btn" disabled={isLoading}>
            {isLoading ? 'Adding...' : 'Add New Pet'}
          </Button>
        </Form>
      </div>
    </>
  );
}

export default PetAddForm;
