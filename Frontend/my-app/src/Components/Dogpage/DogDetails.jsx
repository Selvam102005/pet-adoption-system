import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Navigationbar from '../Navigationbar';
import { Container, Row } from 'react-bootstrap';
import axios from 'axios';
import Dogcard from '../Dogpage/Dogcard';

const DogDetails = () => {
  const { id } = useParams();
  const [dogData, setDogData] = useState([]);
  const dogRefs = useRef({});

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/petdata")
      .then((response) => {
        setDogData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (id && dogRefs.current[id]) {
      dogRefs.current[id].scrollIntoView({ behavior: 'smooth' });
    }
  }, [id, dogData]);

  const handleDelete = (dogId) => {
    setDogData(dogData.filter(dog => dog._id !== dogId));
  };

  return (
    <>
      <Navigationbar />
      <Container>
        <Row>
          {dogData.map((data) => {
            return (
              data.species === "Dog" && (
                <div ref={el => (dogRefs.current[data._id] = el)} key={data._id}>
                  <Dogcard
                    dogs={data}
                    onDelete={handleDelete}
                  />
                </div>
              )
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default DogDetails;
