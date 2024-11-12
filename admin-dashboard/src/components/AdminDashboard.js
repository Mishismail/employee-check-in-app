import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [checkIns, setCheckIns] = useState([]);
  const [totalCheckIns, setTotalCheckIns] = useState(0);
  const [totalDailyCheckIns, setTotalDailyCheckIns] = useState(0);
  const [summaryData, setSummaryData] = useState({});
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const fetchCheckIns = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/check-ins`);
        const data = res.data;
        setCheckIns(data);

        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        const today = new Date().toLocaleDateString('en-GB', options);
        setCurrentDate(today);

        const currentMonth = new Date().getMonth();
        const monthlyCheckIns = data.filter(
          (checkIn) => new Date(checkIn.checkInTime).getMonth() === currentMonth
        );
        setTotalCheckIns(monthlyCheckIns.length);

        const dailyCheckIns = data.filter(
          (checkIn) => new Date(checkIn.checkInTime).toLocaleDateString('en-GB') === new Date().toLocaleDateString('en-GB')
        );
        setTotalDailyCheckIns(dailyCheckIns.length);

        const summary = data.reduce((acc, checkIn) => {
          acc[checkIn.locationId] = acc[checkIn.locationId]
            ? acc[checkIn.locationId] + 1
            : 1;
          return acc;
        }, {});
        setSummaryData(summary);
      } catch (error) {
        console.error('Error fetching check-ins');
      }
    };

    fetchCheckIns();
  }, []);

  return (
    <div className="center-wrapper">
      <div className="admin-dashboard-container p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-lg mt-10">
        <h1 className="text-4xl font-bold text-blue-700 mb-8 text-center">Admin Dashboard</h1>

        <div className="dashboard-summary grid grid-cols-1 md:grid-cols-3 gap-12 mb-10 justify-center">
          <div className="bg-blue-100 p-6 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Total Check-Ins for the Month</h2>
            <p className="text-3xl font-semibold">{totalCheckIns}</p>
          </div>
          <div className="bg-blue-100 p-6 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Check-Ins Today</h2>
            <p className="check-ins-today-date">{currentDate}</p> 
            <p className="text-3xl font-semibold">{totalDailyCheckIns}</p> 
          </div>

          <div className="bg-blue-100 p-6 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Check-Ins by Location</h2>
            <div className="flex flex-col items-center justify-center">
              <ul className="mt-2 w-full">
                {Object.entries(summaryData).map(([location, count]) => (
                  <li key={location} className="text-lg py-2 border-b border-gray-200">
                    <span className="font-semibold text-blue-600">{location}:</span>{' '}
                    <span className="text-blue-600">{count}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="check-ins-list">
          <h2 className="text-2xl font-bold text-blue-600 mb-6">Recent Check-Ins</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border-collapse rounded-lg shadow">
              <thead>
                <tr className="bg-blue-50">
                  <th className="py-3 px-5 border-b text-left font-semibold text-blue-700">Employee Name</th>
                  <th className="py-3 px-5 border-b text-left font-semibold text-blue-700">Location ID</th>
                  <th className="py-3 px-5 border-b text-left font-semibold text-blue-700">Check-In Time</th>
                  <th className="py-3 px-5 border-b text-left font-semibold text-blue-700">Notes</th>
                </tr>
              </thead>
              <tbody>
                {checkIns
                  .sort((a, b) => new Date(b.checkInTime) - new Date(a.checkInTime)) 
                  .map((checkIn) => (
                    <tr key={checkIn._id} className="hover:bg-blue-50">
                      <td className="py-3 px-5 border-b">{checkIn.employeeName}</td>
                      <td className="py-3 px-5 border-b">{checkIn.locationId}</td>
                      <td className="py-3 px-5 border-b">
                        {new Date(checkIn.checkInTime).toLocaleString('en-GB', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="py-3 px-5 border-b">{checkIn.notes || 'No notes provided'}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;






