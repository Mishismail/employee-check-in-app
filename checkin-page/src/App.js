// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CheckInForm from './components/CheckInForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <Routes>
          <Route path="/check-in" element={<CheckInForm />} />
          {/* Redirect the root "/" route to "/check-in" */}
          <Route path="/" element={<Navigate to="/check-in" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



