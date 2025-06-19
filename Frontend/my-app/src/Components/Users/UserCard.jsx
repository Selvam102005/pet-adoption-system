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
    confirmPassword: ""
  });

  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });
  const [fieldErrors, setFieldErrors] = useState({ username: "", email: "" });
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
    setFieldErrors({ username: "", email: "" });

    const { username, email, password, confirmPassword } = formData;

    if (!username || !email || !password || !confirmPassword) {
      setAlert({ show: true, message: "All fields are required!", variant: "danger" });
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setAlert({ show: true, message: "Passwords do not match!", variant: "danger" });
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setAlert({ show: true, message: "Password must be at least 8 characters long!", variant: "danger" });
      setIsLoading(false);
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setAlert({ show: true, message: "Password must contain at least one uppercase letter!", variant: "danger" });
      setIsLoading(false);
      return;
    }

    if (!/\d/.test(password)) {
      setAlert({ show: true, message: "Password must contain at least one number!", variant: "danger" });
      setIsLoading(false);
      return;
    }

    if (!/[!@#$%^&*()_+]/.test(password)) {
      setAlert({ show: true, message: "Password must contain at least one special character (!@#$%^&*()_+).", variant: "danger" });
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/users", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.success) {
        setFieldErrors({ username: "", email: "" });
        setAlert({ show: true, message: "User Registered Successfully! Please log in.", variant: "success" });
        setFormData({ username: "", email: "", password: "", confirmPassword: "" });
        setTimeout(() => setIsSignup(false), 1500);
      } else {
        setAlert({ show: true, message: response.data.error || "Registration failed!", variant: "danger" });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Registration failed! Please try again.";
      setAlert({ show: true, message: errorMessage, variant: "danger" });

      // Set field-specific errors
      if (errorMessage.includes("Username")) {
        setFieldErrors((prev) => ({ ...prev, username: "Username already taken" }));
      }
      if (errorMessage.includes("Email")) {
        setFieldErrors((prev) => ({ ...prev, email: "Email already registered" }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setAlert({ show: false, message: "", variant: "" });

    if (!userEmail || !userPassword) {
      setAlert({ show: true, message: "Email and password are required!", variant: "danger" });
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/users/login", {
        email: userEmail,
        password: userPassword
      }, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.success) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setUserEmail("");
        setUserPassword("");
        navigate("/home");
      } else {
        setAlert({ show: true, message: "Invalid email or password!", variant: "danger" });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login Failed! Please check your credentials.";
      setAlert({ show: true, message: errorMessage, variant: "danger" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminClick = () => {
    navigate("/admin");
  };

  return (
    <div className="auth-container">
      {alert.show && (
        <Alert variant={alert.variant} onClose={() => setAlert({ ...alert, show: false })} dismissible className="mt-3 mx-auto alert-custom">
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
                      name="username"
                      value={formData.username}
                      onChange={handleSignupChange}
                      placeholder="Your username"
                      required
                      className="auth-input"
                      isInvalid={!!fieldErrors.username}
                    />
                    <Form.Control.Feedback type="invalid">
                      {fieldErrors.username}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formSignUpEmail">
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleSignupChange}
                      placeholder="Your email"
                      required
                      className="auth-input"
                      isInvalid={!!fieldErrors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {fieldErrors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formSignUpPassword">
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleSignupChange}
                      placeholder="Your password"
                      required
                      className="auth-input"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formConfirmPassword">
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleSignupChange}
                      placeholder="Confirm password"
                      required
                      className="auth-input"
                    />
                  </Form.Group>
                  <Button className="auth-button w-100" type="submit" disabled={isLoading}>
                    {isLoading ? "Registering..." : "Register"}
                  </Button>
                </Form>
                <p className="auth-switch-text">
                  Already have an account?{" "}
                  <span className="auth-switch-link" onClick={() => setIsSignup(false)}>Log in</span>
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
                  <Form.Check
                    type="checkbox"
                    label="Remember me"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="auth-remember mb-3"
                  />
                  <Button className="auth-button w-100 mb-3" type="submit" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Log In"}
                  </Button>
                </Form>
                <p className="auth-switch-text">
                  Don't have an account?{" "}
                  <span className="auth-switch-link" onClick={() => setIsSignup(true)}>Sign up</span>
                </p>
              </>
            )}
          </Card.Body>
        </Card>
      </Container>

      <div className="admin-section">
        <p className="admin-question">Are you an admin?</p>
        <Button className="admin-button" variant="outline-primary" onClick={handleAdminClick}>
          Admin Login
        </Button>
      </div>
    </div>
  );
};

export default UserCard;