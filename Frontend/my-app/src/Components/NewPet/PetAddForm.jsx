import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Navigationbar from "../Navigationbar";
import InfoModal from "../InfoModal/InfoModal";
import ConfirmModal from "../ConfirmPage/ConfirmModal"; 
import '../NewPet/PetAddFormStyle.css';

function PetAddForm() {
  const [formData, setFormData] = useState({
    petName: '',
    type: '',
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

  const [isLoading, setIsLoading] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false); // ✅ Add state
  const [info, setInfo] = useState({ title: '', message: '', variant: 'primary' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Trigger confirm modal first
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = async () => {
    setShowConfirmModal(false); // Close confirm modal
    setIsLoading(true);

    try {
      await axios.post('http://localhost:8000/api/pets', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setInfo({
        title: 'Success',
        message: 'Pet added successfully!',
        variant: 'success'
      });
      setShowInfoModal(true);
      clearForm();
    } catch (error) {
      setInfo({
        title: 'Failed',
        message: 'Failed to add pet. Please try again.',
        variant: 'danger'
      });
      setShowInfoModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const clearForm = () => {
    setFormData({
      petName: '',
      type: '',
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
        <Form onSubmit={handleSubmit}>
          <h2 style={{ textAlign: 'center' }}>Add Pet Form</h2>

          {[
            ['petName', 'Pet Name'],
            ['type', 'Type'],
            ['breed', 'Breed'],
            ['species', 'Species'],
            ['age', 'Age'],
            ['gender', 'Gender'],
            ['origin', 'Origin'],
            ['size', 'Size'],
            ['weight', 'Weight'],
            ['temperament', 'Temperament'],
            ['coat', 'Color and Coat Type'],
            ['lifeSpan', 'Life Span'],
            ['specialCharacteristics', 'Special Characteristics'],
            ['image', 'Pet Image URL']
          ].map(([key, label]) => (
            <Form.Group className="mb-3" key={key}>
              <Form.Label>{label}</Form.Label>
              <Form.Control
                type="text"
                name={key}
                className="input"
                placeholder={`Enter ${label}`}
                value={formData[key]}
                onChange={handleChange}
                required
              />
            </Form.Group>
          ))}

          <Button variant="primary" type="submit" id="gen-btn" disabled={isLoading}>
            {isLoading ? 'Adding...' : 'Add New Pet'}
          </Button>
        </Form>
      </div>

      {/* Confirm Modal */}
      <ConfirmModal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmSubmit}
        title="Confirm Add Pet"
        message="Are you sure you want to add this pet to the system?"
      />

      {/* Info Modal */}
      <InfoModal
        show={showInfoModal}
        onHide={() => setShowInfoModal(false)}
        title={info.title}
        message={info.message}
        variant={info.variant}
      />
    </>
  );
}

export default PetAddForm;
