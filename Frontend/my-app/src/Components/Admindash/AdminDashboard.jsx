import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import AdminHome from './AdminHome';
import PetAddForm from '../NewPet/PetAddForm';
import ViewPetDetails from '../AllDetails/Pets';
import PetRequestList from '../Petrequestlist/Petrequestlist';

const AdminDashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<AdminHome />} />
        <Route path="add-pet" element={<PetAddForm />} />
        <Route path="view-pets" element={<ViewPetDetails />} />
        <Route path="view-requests" element={<PetRequestList />} />
      </Route>
    </Routes>
  );
};

export default AdminDashboard;