import React from "react";
import Carousel from "react-bootstrap/Carousel";

const Carousels = () => {
  return (
    <Carousel
      controls={false}
      indicators={false}
      style={{ height: "500px", width: "100%" }}
    >
      <Carousel.Item interval={2500}>
        <img
          src="https://img.freepik.com/premium-photo/dogs-cats-portrait-together_978585-737.jpg"
          className="d-block w-100 h-100"
          alt="..."
          style={{ maxHeight: "500px" }}
        />
      </Carousel.Item>
      <Carousel.Item interval={2500}>
        <img
          src="https://img.freepik.com/premium-photo/cute-white-kittens-pink-background_124603-3223.jpg"
          className="d-block w-100"
          alt="..."
          style={{ maxHeight: "500px" }}
        />
      </Carousel.Item>
      <Carousel.Item interval={2500}>
        <img
          src="https://img.freepik.com/premium-photo/many-dogs-front-pink-background_87557-21511.jpg"
          className="d-block w-100"
          alt="..."
          style={{ maxHeight: "500px" }}
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default Carousels;
