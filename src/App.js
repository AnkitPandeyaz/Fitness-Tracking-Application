import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';

import './App.css';
import ExerciseDetail from './pages/ExerciseDetail';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Auth from "./components/Auth";
import FitnessTracker from "./components/FitnessTracker";

const App = () => (
  <Box sx={{ maxWidth: { xs: '100%', xl: '1488px' }, m: 'auto', p: 2 }}>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/exercise/:id" element={<ExerciseDetail />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/fitnesstracker" element={<FitnessTracker />} />
    </Routes>
    <Footer />
  </Box>
);

export default App;

