import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

const Navigationbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isUser } = location.state || {};

  const handleAddClick = () => {
    navigate("/petAddform");
  };

  const handleDeleteClick = () => {
    navigate("/viewPetDetails");
  };

  const handleLogoutClick = () => {
    navigate("/");
  };

  // Common button style
  const commonButtonStyle = {
    backgroundColor: "#ff80ab",
    borderColor: "#ff3779",
    color: "white",
    fontWeight: "bold",
    marginRight: "20px"
  };

  // Logout button specific style
  const logoutButtonStyle = {
    backgroundColor: "#ff3779",
    borderColor: "#ff3779",
    color: "white",
    fontWeight: "bold",
    marginRight: "20px"
  };

  return (
    <Navbar expand="lg" style={{ backgroundColor: "#f8f9fa" }}>
      <Container fluid>
        <Navbar.Brand href="/home">PetPals Connect</Navbar.Brand>

        <div className="d-flex justify-content-end">
          {isUser && (
            <>
              <Button onClick={handleAddClick} style={commonButtonStyle}>
                Pet_Add
              </Button>

              <Button onClick={handleDeleteClick} style={commonButtonStyle}>
                Pet_Details
              </Button>
            </>
          )}
          <Button onClick={handleLogoutClick} style={logoutButtonStyle}>
            Logout
          </Button>
        </div>
      </Container>
    </Navbar>
  );
};

export default Navigationbar;
