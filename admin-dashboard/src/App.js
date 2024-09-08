import React from 'react';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

function App() {
  return (
    <div className="app-container min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex flex-col items-center p-8">
      <AdminDashboard />
    </div>
  );
}

export default App;
