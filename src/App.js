import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Welcome from "./components/Welcome";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "./components/Footer";
import Book from "./components/Book";
import BookList from "./components/BookList";
import Header from "./components/Header";
import ReviewForm from "./components/Review";
import ReviewsList from "./components/ReviewList";
import Login from "./components/Login";
import Register from "./components/Register";
import ContactUs from "./components/ContactUs";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = (username) => {
    setLoggedIn(true);
    setUsername(username);
    setIsAdmin(username === "admin");
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername("");
    setIsAdmin(false);
  };

  const marginTop = { marginTop: "20px" };

  if(isAdmin){
  return (
    <Router>
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" render={() => <Login onLogin={handleLogin} />} />
        <Route path="/">
          {loggedIn? (
            <div>
              <Header />
              <NavigationBar loggedIn={loggedIn} username={username} isAdmin={isAdmin} onLogout={handleLogout} />
              <Container>
                <Row>
                  <Col lg={12} style={marginTop}>
                    <Switch>
                      <Route exact path="/welcome" component={Welcome} />
                      <Route exact path="/add" component={Book} />
                      <Route exact path="/edit/:id" component={Book} />
                      {/* <Route exact path="/list" component={BookList} /> */}
                      {/* <Route exact path="/review" component={ReviewForm} /> */}
                      <Route exact path="/reviewList" component={ReviewsList} />
                      <Route exact path="/contactUs" component={ContactUs} />
                      <BookList isAdmin={isAdmin} />
                      <Redirect to="/welcome" />
                    </Switch>
                  </Col>
                </Row>
              </Container>
              <p>Library Management System</p>
              <Footer />
            </div>
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
      </Switch>
    </Router>
  );
          } else {
            return (
              <Router>
                <Switch>
                  <Route path="/register" component={Register} />
                  <Route path="/login" render={() => <Login onLogin={handleLogin} />} />
                  <Route path="/">
                    {loggedIn? (
                      <div>
                        <Header />
                        <NavigationBar loggedIn={loggedIn} username={username} onLogout={handleLogout} />
                        <Container>
                          <Row>
                            <Col lg={12} style={marginTop}>
                              <Switch>
                                <Route exact path="/welcome" component={Welcome} />
                                {/* <Route exact path="/add" component={Book} />
                                <Route exact path="/edit/:id" component={Book} /> */}
                                <Route exact path="/list" component={BookList} />
                                <Route exact path="/review" component={ReviewForm} />
                                {/* <Route exact path="/reviewList" component={ReviewsList} /> */}
                                <Route exact path="/contactUs" component={ContactUs} />
                                <Redirect to="/welcome" />
                              </Switch>
                            </Col>
                          </Row>
                        </Container>
                        <p>Library Management System</p>
                        <Footer />
                      </div>
                    ) : (
                      <Redirect to="/login" />
                    )}
                  </Route>
                </Switch>
              </Router>
            );
          }
}

export default App;
