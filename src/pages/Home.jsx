import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container} from 'react-bootstrap';
import Header from "../components/Header";

function Home() {

  return (
    <Container>
      <Header />
      <h1>Home</h1>
    </Container>
  );
};

export default Home;