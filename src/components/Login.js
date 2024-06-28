import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/login", {
        username: credentials.username,
        password: credentials.password
      });

      if (response.status === 200) {
        const isAdmin = credentials.username === "admin"; // Check if user is admin
        onLogin(credentials.username, isAdmin); // Pass username and isAdmin to onLogin
        history.push("/welcome"); // Redirect to welcome page
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error logging in. Please try again.");
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h2 className="text-white">Login</h2>
          {error && <p className="text-danger">{error}</p>}
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label className="text-white">Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                value={credentials.username}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label className="text-white">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
            <div className="mt-3">
              <p className="text-white">Don't have an account? <Link to="/register">Sign Up</Link></p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
