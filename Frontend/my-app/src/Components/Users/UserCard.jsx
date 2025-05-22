import React, { useState } from "react";
import { Form, Button, Container, Alert, Card } from "react-bootstrap";
import "./UserCard.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserCard = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const handleSignupChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginEmailChange = (e) => {
    setUserEmail(e.target.value);
  };

  const handleLoginPasswordChange = (e) => {
    setUserPassword(e.target.value);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setAlert({ show: false, message: "", variant: "" });

    if (!formData.username || !formData.email || !formData.password) {
      setAlert({
        show: true,
        message: "All fields are required!",
        variant: "danger",
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/users",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setAlert({
          show: true,
          message: "User Registered Successfully! Please log in.",
          variant: "success",
        });
        setFormData({
          username: "",
          email: "",
          password: "",
        });
        setIsSignup(false);
      } else {
        setAlert({
          show: true,
          message: response.data.error || "Registration failed!",
          variant: "danger",
        });
      }
    } catch (error) {
      console.error("Error during signup:", error);
      const errorMessage = error.response?.data?.error || "Registration failed! Please try again.";
      setAlert({
        show: true,
        message: errorMessage,
        variant: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setAlert({ show: false, message: "", variant: "" });

    if (!userEmail || !userPassword) {
      setAlert({
        show: true,
        message: "Email and password are required!",
        variant: "danger",
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/login",
        { email: userEmail, password: userPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setUserEmail("");
        setUserPassword("");
        navigate("/home");
      } else {
        setAlert({
          show: true,
          message: "Invalid email or password!",
          variant: "danger",
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      const errorMessage = error.response?.data?.message || "Login Failed! Please check your credentials.";
      setAlert({
        show: true,
        message: errorMessage,
        variant: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminClick = () => {
    navigate('/admin');
  };

  return (
    <div className="auth-container">
      {alert.show && (
        <Alert
          variant={alert.variant}
          onClose={() => setAlert({ ...alert, show: false })}
          dismissible
          className="mt-3 mx-auto alert-custom"
        >
          {alert.message}
        </Alert>
      )}

      <Container className="d-flex justify-content-center align-items-center">
        <Card className="auth-card">
          <Card.Body>
            {isSignup ? (
              <>
                <h2 className="auth-title">Create Account</h2>
                <p className="auth-subtitle">Join our community today</p>
                <Form onSubmit={handleSignupSubmit}>
                  <Form.Group className="mb-3" controlId="formSignUpName">
                    <Form.Control
                      type="text"
                      value={formData.username}
                      onChange={handleSignupChange}
                      placeholder="Your username"
                      name="username"
                      required
                      className="auth-input"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formSignUpEmail">
                    <Form.Control
                      type="email"
                      value={formData.email}
                      onChange={handleSignupChange}
                      placeholder="Your email"
                      name="email"
                      required
                      className="auth-input"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formSignUpPassword">
                    <Form.Control
                      type="password"
                      value={formData.password}
                      onChange={handleSignupChange}
                      placeholder="Your password"
                      name="password"
                      required
                      className="auth-input"
                    />
                  </Form.Group>
                  <Button
                    className="auth-button w-100"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Registering..." : "Register"}
                  </Button>
                </Form>
                <p className="auth-switch-text">
                  Already have an account?{" "}
                  <span className="auth-switch-link" onClick={() => setIsSignup(false)}>
                    Log in
                  </span>
                </p>
              </>
            ) : (
              <>
                <h2 className="auth-title">Welcome back!</h2>
                <h3 className="auth-subtitle">Login to your account</h3>
                <p className="auth-welcome-text">It's nice to see you again. Ready to adopt pet?</p>
                <Form onSubmit={handleLoginSubmit}>
                  <Form.Group className="mb-3" controlId="formLoginEmail">
                    <Form.Control
                      type="email"
                      name="loginemail"
                      placeholder="Your email"
                      value={userEmail}
                      onChange={handleLoginEmailChange}
                      required
                      className="auth-input"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formLoginPassword">
                    <Form.Control
                      type="password"
                      name="loginpassword"
                      placeholder="Your password"
                      value={userPassword}
                      onChange={handleLoginPasswordChange}
                      required
                      className="auth-input"
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-between mb-3">
                    <Form.Check
                      type="checkbox"
                      label="Remember me"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                      className="auth-remember"
                    />

                  </div>
                  <Button
                    className="auth-button w-100 mb-3"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Log In"}
                  </Button>
                </Form>
                <p className="auth-switch-text">
                  Don't have an account?{" "}
                  <span className="auth-switch-link" onClick={() => setIsSignup(true)}>
                    Sign up
                  </span>
                </p>
              </>
            )}
          </Card.Body>
        </Card>
      </Container>

      <div className="admin-section">
        <p className="admin-question">Are you an admin?</p>
        <Button
          className="admin-button"
          variant="outline-primary"
          onClick={handleAdminClick}
        >
          Admin Login
        </Button>
      </div>
    </div>
  );
};

export default UserCard;