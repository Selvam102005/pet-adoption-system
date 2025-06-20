import React from "react";
import { Modal, Button } from "react-bootstrap";

const InfoModal = ({ show, onHide, title, message, variant }) => {
  const getVariantColor = () => {
    switch (variant) {
      case "success":
        return "success";
      case "danger":
        return "danger";
      default:
        return "primary";
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className={`bg-${getVariantColor()} text-white`}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={getVariantColor()} onClick={onHide}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InfoModal;
