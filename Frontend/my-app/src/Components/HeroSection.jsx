import React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  // Function to navigate to the adoption page
  const handleClick = () => {
    navigate("/adopt");
  };

  return (
    <Container className="col-xxl-8 px-4 py-5" style={{ backgroundColor: "" }}>
      <Row className="flex-lg-row-reverse align-items-center g-5 py-5" style={{ borderColor: '#f75e38' }}>
        <Col xs={10} sm={8} lg={6}>
          <Image
            src="https://i.pinimg.com/236x/0f/ea/8c/0fea8c0d46e7d3824403f681cfde019b.jpg"
            className="d-block mx-lg-auto img-fluid"
            alt="Pet Adoption"
            width={350}
            height={350}
            loading="lazy"
            roundedCircle
          />
        </Col>
        <Col lg={6}>
          <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
            Lets Adopt...
          </h1>
          <p className="text-justify">
            PetPals Connect is your go-to platform for pet adoption and care. We
            feature detailed pet profiles with engaging photos and videos,
            making it easy to see each pet’s unique personality. Our site offers
            step-by-step adoption guides, FAQs, and helpful articles on pet
            care, training, and health. Join our community to share adoption
            success stories, connect with other pet owners in forums, and
            discover local pet resources. PetPals Connect is here to help you
            find and care for your new furry friend!
          </p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <Button
              style={{ width: "200px" }}
              className="px-4 me-md-2"
              id="gen-btn"
              variant="outline-success"
              onClick={handleClick}
            >
              Adopt Me
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HeroSection;
