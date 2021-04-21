import React, { useState } from "react";
import "./Login.css";
import { useDispatch } from "react-redux";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { LoginRedux } from "../../store/Action/Login";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("smithcheryl@yahoo.com");
  const [password, setPassword] = useState("12345678");

  //use to login into application
  const Login = (event) => {
    event.preventDefault();    
    const params = {
      email,
      password,
	};
	//this dispatch is used to send data to redux action
	dispatch(LoginRedux(params));
	//this dispatch is used to send data to redux action
  };
//use to login into application
  return (
    <Container fluid>
      <Row className="loginContainer">
        <Col></Col>
        <Col>
          <div className="loginForm">
            <h4 className="loginHeader"> LOGIN</h4>
            <Form onSubmit={Login}>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  required
                  disabled
                  placeholder="Email"
                  name="email"
                  value={email}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  disabled
                  placeholder="Password"
                  name="password"
                  value={password}
                />
              </Form.Group>

              <Row>
                <Col></Col>
                <Col>
                  <Button variant="primary" type="submit" className="mb-4">
                    Login
                  </Button>
                </Col>
                <Col></Col>
              </Row>
            </Form>
          </div>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default Login;
