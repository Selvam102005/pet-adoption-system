import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserCard from './Components/Users/UserCard';
import AdminLogin from './Components/Admin/AdminLogin.jsx';
import Home from './Components/Home';
import PetAddForm from './Components/NewPet/PetAddForm';
import DogDetails from './Components/Dogpage/DogDetails';
import CatDetails from './Components/Catpage/CatDetails';
import AdoptForm from './Components/AdoptPet/AdoptForm';
import Petrequestlist from './Components/Petrequestlist/Petrequestlist.jsx';
import Pets from './Components/AllDetails/Pets';
import AdminDash from './Components/Admindash/AdminDashboard.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';


// Simple auth check function
const isAuthenticated = () => {
  return localStorage.getItem('user') !== null;
};

// Admin auth check function
const isAdminAuthenticated = () => {
  return localStorage.getItem('admin') !== null;
};

// Protected route component
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" />;
};

// Admin protected route component
const AdminProtectedRoute = ({ children }) => {
  return isAdminAuthenticated() ? children : <Navigate to="/admin" />;
};

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<UserCard />} />
        <Route path="/admin" element={<AdminLogin />} />
        
        {/* Protected User Routes */}
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/Admindash" 
           element={
            <AdminProtectedRoute>
              <AdminDash />
           </AdminProtectedRoute>
         } 
       />

        <Route 
          path="/dogs/:id" 
          element={
            <ProtectedRoute>
              <DogDetails />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/cats/:id" 
          element={
            <ProtectedRoute>
              <CatDetails />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dogs" 
          element={
            <ProtectedRoute>
              <DogDetails />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/cats" 
          element={
            <ProtectedRoute>
              <CatDetails />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/viewPetDetails" 
          element={
            <ProtectedRoute>
              <Pets />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/adopt" 
          element={
            <ProtectedRoute>
              <AdoptForm />
            </ProtectedRoute>
          } 
        />
        
        {/* Protected Admin Routes */}
        <Route 
          path="/PetAddForm" 
          element={
            <AdminProtectedRoute>
              <PetAddForm />
            </AdminProtectedRoute>
          } 
        />
        <Route 
          path="/Petrequestlist" 
          element={
            <ProtectedRoute>
              <Petrequestlist />
            </ProtectedRoute>
          } 
        />
        
        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;