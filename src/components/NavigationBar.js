import React, { Component } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class NavigationBar extends Component {
  render() {
    const { username, onLogout } = this.props;
    const {isAdmin } = this.props; // Destructuring isAdmin prop

    if(isAdmin){
    return (
      <Navbar bg="primary" variant="dark">
        <Link to={""} className="navbar-brand">
          {" "}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Book_icon_1.png"
            width="25"
            height="25"
            alt="brand"
          />
        </Link>
        <Nav className="mr-auto">
              <Link to={"add"} className="nav-link">
                Add Book
              </Link>
              <Link to={"list"} className="nav-link">
              Book Listing
            </Link>
              <Link to={"reviewList"} className="nav-link">
                Review List
              </Link>
              <Link to={"contactUs"} className="nav-link">
              Contact Us
            </Link>
        </Nav>
        <Navbar.Text>
         <a href="#login">Hi, {username}</a>
        </Navbar.Text>
        {/* Logout button */}
        <Button variant="light" onClick={this.props.onLogout}>Logout</Button>
      </Navbar>
    );
    } else {
      return (
        <Navbar bg="primary" variant="dark">
          <Link to={""} className="navbar-brand">
            {" "}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Book_icon_1.png"
              width="25"
              height="25"
              alt="brand"
            />
          </Link>
          <Nav className="mr-auto">
          <Link to={"list"} className="nav-link">
              Book Listing
            </Link>
            <Link to={"review"} className="nav-link">
              Review
            </Link>
            <Link to={"contactUs"} className="nav-link">
              Contact Us
            </Link>
          </Nav>
          <Navbar.Text>
         <a href="#login">Hi, {username}</a>
        </Navbar.Text>
          {/* Logout button */}
          <Button variant="light" onClick={this.props.onLogout}>Logout</Button>
        </Navbar>
      );
    }
  }
}

export default NavigationBar;
