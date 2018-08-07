import React from 'react';
import { Container, Col } from 'reactstrap';

export default props => (
  <Container>
    <Col xs={12} sm={{ size: 8, offset: 2 }} className="bg-white mt-5 pb-5">
      {props.children}
    </Col>
  </Container>
);
