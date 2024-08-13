
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import EmployeeDetails from './Pages/EmployeeDetails';
import EditUpdate from './Pages/EditUpdate';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/employee/:id" element={<EmployeeDetails />} />
      <Route path="/add" element={<EditUpdate />} />
      <Route path="/edit/:id" element={<EditUpdate />} />
    </Routes>
  );
}

export default App;
