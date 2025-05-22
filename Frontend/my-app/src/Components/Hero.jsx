import React from "react";
import { Card, Carousel } from "react-bootstrap";

const Hero = () => {
  return (
    <div className="my-5 position-relative p-5 text-center text-muted">
      {/* Carousel */}
      <Carousel controls={false} indicators={false} style={{ height: "300px", width: "100%" }} className="mt-1">
        <Carousel.Item interval={2500}>
          <img
            src="https://i.pinimg.com/564x/30/6b/20/306b20828bd03a2f36a85d8fe99ff3ce.jpg"
            className="d-block w-100 h-100"
            alt="Carousel Item 1"
            style={{ maxHeight: "300px" }}
          />
        </Carousel.Item>
        <Carousel.Item interval={2500}>
          <img
            src="https://i.pinimg.com/564x/fa/ed/5c/faed5cd36e9d7622ad2d640b7a0d61cc.jpg"
            className="d-block w-100"
            alt="Carousel Item 2"
            style={{ maxHeight: "300px" }}
          />
        </Carousel.Item>
        <Carousel.Item interval={2500}>
          <img
            src="https://i.pinimg.com/564x/06/ca/98/06ca985e66acefc2b0d35745ea27691c.jpg"
            className="d-block w-100"
            alt="Carousel Item 3"
            style={{ maxHeight: "300px" }}
          />
        </Carousel.Item>
      </Carousel>

      {/* Card with Quote */}
      <Card.Title className="text-body-emphasis mt-4">
        "Saving one animal may not change the world, but for that one animal, the world changes forever."
      </Card.Title>
      <Card.Text className="col-lg-6 mx-auto mb-4">
        ~ Charles Henderson
      </Card.Text>
    </div>
  );
};

export default Hero;
