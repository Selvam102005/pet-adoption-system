import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Navigationbar from '../Navigationbar';
import { Container, Row } from 'react-bootstrap';
import Dogcard from '../Dogpage/Dogcard';
import { getPets } from '../../api/pets';

const DogDetails = () => {
  const { id } = useParams();
  const [dogData, setDogData] = useState([]);
  const dogRefs = useRef({});

  useEffect(() => {
    getPets()
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
              data.type === "Dog" && (
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
