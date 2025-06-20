import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Navigationbar from "../Navigationbar";
import ConfirmModal from "../ConfirmPage/ConfirmModal";
import InfoModal from "../InfoModal/InfoModal";
import { useNavigate } from "react-router-dom";
import "./AdoptForm.css";

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

  const [showConfirm, setShowConfirm] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [info, setInfo] = useState({ title: "", message: "", variant: "primary" });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [id]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const handleConfirmSubmit = async () => {
    setShowConfirm(false);
    try {
        await axios.post("http://localhost:8000/api/adopts", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setInfo({
      title: "Success",
      message: `Adoption request sent successfully!\n\nWe will reply within 24 hours at ${formData.email}.`,
      variant: "success",
      });

      setShowInfoModal(true);
    } catch (error) {
      console.error("Error:", error.response);
      setInfo({
      title: "Failed",
      message: `Submission failed. Please try again later or contact us.`,
       variant: "danger",
      });

      setShowInfoModal(true);
    }
  };

  const handleInfoClose = () => {
    setShowInfoModal(false);
    if (info.variant === "success") {
      navigate("/home");
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
            required
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
            required
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
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="gender">
          <Form.Label>Gender:</Form.Label>
          <Form.Control
            type="text"
            name="gender"
            className="input"
            placeholder="Enter Gender"
            autoComplete="off"
            value={formData.gender}
            onChange={handleChange}
            required
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
            required
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
            required
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
            required
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
            required
          />
        </Form.Group>

        <Button variant="outline-success" id="gen-btn" type="submit">
          Submit
        </Button>
      </Form>

      <ConfirmModal
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        onConfirm={handleConfirmSubmit}
        title="Confirm Submission"
        message="Are you sure you want to submit the adoption request?"
      />

      <InfoModal
        show={showInfoModal}
        onHide={handleInfoClose}
        title={info.title}
        message={info.message}
        variant={info.variant}
      />
    </>
  );
}

export default AdoptForm;
