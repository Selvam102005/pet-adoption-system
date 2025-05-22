import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Navigationbar from "../Navigationbar";
import "./AdoptForm.css";
import { useNavigate } from "react-router-dom";

function AdoptForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    address: "",
    occupation: "",
    phone: "",
    email: "",
    homeType: "",
    adultsInFamily: "",
    childrenInFamily: "",
    petsInHome: "",
    petsname: "",
    species: "",
    breed: "",
    agePreference: "",
    sizePreference: "",
    genderPreference: "",
    timeAvailability: "",
    veterinaryCare: false,
    indoorOutdoor: "",
    petSupervision: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [id]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/adopts",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      console.log("Response:", response.data);
      alert(`Request send successfully`);
      navigate('/home');
    } catch (error) {
      console.log("Error:", error.response);
      alert(`Error:404`);
    }
  };

  return (
    <>
      <Navigationbar />
      <Form className="form-container" onSubmit={handleSubmit}>
        <h2 className="form-title">Pet Adoption Application Form</h2>

        <h3>Adopter Information</h3>
        <Form.Group className="mb-3" controlId="petsname">
          <Form.Label>Pet Name:</Form.Label>
          <Form.Control
            type="text"
            className="input"
            name="petsname"
            placeholder="Enter Pet Name"
            autoComplete="off"
            value={formData.petsname}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="fullName">
          <Form.Label>Full Name:</Form.Label>
          <Form.Control
            type="text"
            className="input"
            name="fullName"
            placeholder="Enter Full Name"
            autoComplete="off"
            value={formData.fullName}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="age">
          <Form.Label>Age:</Form.Label>
          <Form.Control
            type="number"
            name="age"
            className="input"
            placeholder="Enter Age"
            autoComplete="off"
            value={formData.age}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="gender">
          <Form.Label>Gender:</Form.Label>
          <Form.Control
            type="text"
            name="gender"
            className="input"
            value={formData.gender}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="address">
          <Form.Label>Address:</Form.Label>
          <Form.Control
            type="text"
            name="address"
            className="input"
            placeholder="Enter Address"
            autoComplete="off"
            value={formData.address}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="occupation">
          <Form.Label>Occupation:</Form.Label>
          <Form.Control
            type="text"
            className="input"
            name="occupation"
            placeholder="Enter Occupation"
            autoComplete="off"
            value={formData.occupation}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="phone">
          <Form.Label>Phone:</Form.Label>
          <Form.Control
            type="text"
            className="input"
            name="phone"
            placeholder="Enter Phone Number"
            autoComplete="off"
            value={formData.phone}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email Address:</Form.Label>
          <Form.Control
            type="email"
            className="input"
            name="email"
            placeholder="Enter Email Address"
            autoComplete="off"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="outline-success" id="gen-btn" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default AdoptForm;
