import React, { useRef, useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";

import { Link, Navigate, useNavigate } from "react-router-dom";
import { useLocation } from "react-router";

import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "store/slices/userSlice/userSlice";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginNameRef = useRef();
  const loginPasswordRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();

  const userInfo = useSelector(state => state.user.userInfoState);
  const dispatch = useDispatch();

  if (userInfo.data) {
    return <Navigate to={'/home'} />
  }

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(loginAction({
      email: email,
      password: password
    }));
  };

  return (
    <Helmet title="Login">
      <CommonSection title="Login" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              <form className="form mb-5" onSubmit={submitHandler}>
                <div className="form__group">
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    ref={loginNameRef}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    ref={loginPasswordRef}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="addToCart__btn">
                  Login
                </button>
              </form>
              <Link to="/register">
                Don't have an account? Create an account
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet >
  );
};

export default Login;