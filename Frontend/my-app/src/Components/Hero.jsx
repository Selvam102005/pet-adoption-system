import { Card } from "react-bootstrap";

const Hero = () => {
  return (
    <>
      <style>{`
        .hero-section {
          background: linear-gradient(135deg,rgb(250, 13, 84),rgb(254, 251, 251));
          padding: 60px 20px;
          border-radius: 20px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          text-align: center;
          margin: 40px auto;
          max-width: 900px;
        }

        .hero-title {
          color:rgb(111, 8, 42);
          font-size: 1.75rem;
          font-weight: bold;
          margin-bottom: 1rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .hero-quote {
          color:rgb(56, 3, 24);
          font-size: 1.1rem;
          font-style: italic;
          font-weight: 500;
        }
      `}</style>

      <div className="hero-section">
        <Card.Title className="hero-title">
          "Saving one animal may not change the world, but for that one animal, the world changes forever."
        </Card.Title>
        <Card.Text className="hero-quote">
          ~ Charles Henderson
        </Card.Text>
      </div>
    </>
  );
};

export default Hero;
