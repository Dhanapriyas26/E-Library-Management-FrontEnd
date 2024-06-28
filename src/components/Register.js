import React, { Component } from "react";
import { Card, Form, Button } from "react-bootstrap";
import axios from "axios";

export default class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      confirmPassword: "",
      error: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const { username, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      this.setState({ error: "Passwords do not match" });
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/register", {
        username,
        password,
        confirmPassword // Include confirmPassword in the request
      });

      if (response.status === 200) {
        // Redirect to login page upon successful registration
        this.props.history.push("/login");
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      this.setState({ error: "Registration failed. Please try again." });
    }
  }

  render() {
    const { username, password, confirmPassword, error } = this.state;
    return (
      <div>
        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header>Registration</Card.Header>
          <Form onSubmit={this.handleSubmit}>
            <Card.Body>
              {error && <p>{error}</p>}
              <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={username}
                  onChange={this.handleInputChange}
                  placeholder="Enter your username"
                  className={"bg-dark text-white"}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleInputChange}
                  placeholder="Enter your password"
                  className={"bg-dark text-white"}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formConfirmPassword">
                <Form.Label>Confirm Password:</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={this.handleInputChange}
                  placeholder="Confirm your password"
                  className={"bg-dark text-white"}
                  required
                />
              </Form.Group>
            </Card.Body>
            <Card.Footer style={{ textAlign: "right" }}>
              <Button variant="primary" type="submit">
                Register
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      </div>
    );
  }
}
