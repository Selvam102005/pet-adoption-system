import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Navigationbar from '../Navigationbar';
import { Container, Row } from 'react-bootstrap';
import CatCard from './CatCard';
import { getPets } from '../../api/pets';

const CatDetails = () => {
  const { id } = useParams();
  const [catData, setCatData] = useState([]);
  const catRefs = useRef({});

  useEffect(() => {
    getPets()
      .then((response) => {
        setCatData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (id && catRefs.current[id]) {
      catRefs.current[id].scrollIntoView({ behavior: 'smooth' });
    }
  }, [id, catData]);

  return (
    <div>
      <Navigationbar/>
      <Container>
        <Row>
          {catData.map((data) => {
            return (
              data.type === "Cat" && (
                <div ref={el => (catRefs.current[data._id] = el)} key={data._id}>
                  <CatCard
                    cats={data}
                  />
                </div>
              )
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default CatDetails;
