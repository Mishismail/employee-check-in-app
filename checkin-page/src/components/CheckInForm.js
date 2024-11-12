import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function CheckInForm() {
  const [employeeName, setEmployeeName] = useState('');
  const [notes, setNotes] = useState('');
  const [locationId, setLocationId] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [formattedDateTime, setFormattedDateTime] = useState('');
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const locId = queryParams.get('location');
    setLocationId(locId);
  }, [location]);

  const handleSubmit = async () => {
    if (!employeeName || !locationId) return;

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/check-in`, {
        employeeName,
        locationId,
        notes,
      });

      const now = new Date();
      const formattedDate = now.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
      const formattedTime = now.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
      });
      setFormattedDateTime(`${formattedDate} at ${formattedTime}`);
      setShowSuccessAlert(true);
    } catch (error) {
      console.error('Error recording check-in:', error);
      alert('Error recording check-in. Please try again later.');
    }
  };

  const handleCloseAlert = () => {
    setShowSuccessAlert(false);
  };

  return (
    <div className="check-in-container">
      {showSuccessAlert && (
        <div className="success-alert bg-blue-100 border-l-4 border-blue-500 text-blue-900 p-4 w-full max-w-lg mx-auto rounded-lg shadow mb-4 flex justify-between items-center">
          <div>
            <p className="font-bold">Check-In Successful!</p>
            <p>You checked in on {formattedDateTime}.</p>
          </div>
          <button
            className="text-blue-900 font-bold text-xl hover:text-blue-700"
            onClick={handleCloseAlert}
          >
            &times;
          </button>
        </div>
      )}

      <div className="check-in-form flex flex-col items-center p-8 max-w-lg mx-auto bg-white rounded-2xl shadow-lg mt-10 border-t-4 border-blue-300">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">Employee Check-In</h1>
        
        {locationId ? (
          <p className="text-gray-600 mb-4 text-base">You are checking in at: <span className="font-bold text-blue-600">{locationId}</span></p>
        ) : (
          <p className="text-gray-600 mb-4 text-base">Loading location...</p>
        )}

        <div className="w-full mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="employeeName">
            Employee Name
          </label>
          <input
            id="employeeName"
            type="text"
            placeholder="Enter your name"
            className="p-3 border rounded-lg w-full text-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 placeholder-gray-400"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
          />
        </div>

        <div className="w-full mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="notes">
            Notes (Optional)
          </label>
          <textarea
            id="notes"
            placeholder="Enter any additional notes (Optional)"
            className="p-3 border rounded-lg w-full text-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 placeholder-gray-400"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <button
          className="bg-blue-500 text-white mt-6 py-2 px-5 rounded-lg w-full hover:bg-blue-600 hover:shadow-lg transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
          onClick={handleSubmit}
          disabled={!employeeName || !locationId}
        >
          Check In
        </button>
      </div>

      <div className="animated-background">
        <div className="bubble bubble1"></div>
        <div className="bubble bubble2"></div>
        <div className="bubble bubble3"></div>
        <div className="bubble bubble4"></div>
        <div className="bubble bubble5"></div>
        <div className="bubble bubble6"></div>
        <div className="bubble bubble7"></div>
        <div className="bubble bubble8"></div>
        <div className="bubble bubble9"></div>
        <div className="bubble bubble10"></div>
        <div className="bubble bubble11"></div>
        <div className="bubble bubble12"></div>
        <div className="bubble bubble13"></div>
        <div className="bubble bubble14"></div>
        <div className="bubble bubble15"></div>
      </div>
    </div>
  );
}

export default CheckInForm;


