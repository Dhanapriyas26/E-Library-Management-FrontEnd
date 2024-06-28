import React, { Component } from "react";
import { Container, Row, Jumbotron, Col, Navbar } from "react-bootstrap";

export default class Footer extends Component {
  render() {
    return (
      <Navbar fixed="bottom" bg="primary" variant="dark">
        <Container>
          <Col lg={12} className="text-center text-muted">
            <div>PriyaSunidhi Project April 2024</div>
          </Col>
        </Container>
      </Navbar>
    );
  }
}
