import React, { useEffect, useState } from "react";
import axios from "axios";
import './PetRequestList.css';

const PetRequestList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchRequests();
  }, []);
  const fetchRequests = () => {
    setLoading(true);
    setError(null);
    axios
      .get("http://localhost:8000/api/adopts") 
      .then((res) => {
        setRequests(res.data.adoptRequests || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching requests:", err);
        setError("Failed to fetch requests. Please check the console for details.");
        setLoading(false);
      });
  };

  const handleRequestAction = (id, action) => {
    const alertMessage = action === 'approved' ? 'Approved successfully!' : 'Declined successfully!';

    axios
      .delete(`http://localhost:8000/api/adopts/${id}`) 
      .then(() => {
        alert(alertMessage);
        setRequests(prevRequests =>
          prevRequests.filter(request => request._id !== id)
        );
      })
      .catch((err) => {
        console.error(`Error ${action === 'approved' ? 'approving' : 'declining'} request:`, err);
        alert(`Failed to ${action} request. Please try again.`);
      });
  };

  if (loading) {
    return <div className="loading-message">Loading requests...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (requests.length === 0) {
    return <div className="no-requests-message">No adoption requests found.</div>;
  }
  return (
    <div className="request-list-container">
      <h2 className="request-list-title">Adoption Requests</h2>
      <div className="table-responsive-container">
        <table className="request-table">
          <thead>
            <tr>
              <th>Pet Name</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request._id}>
                <td>{request.petsname || "-"}</td>
                <td>{request.fullName || "-"}</td>
                <td>{request.email || "-"}</td>
                <td>{request.phone || "-"}</td>
                <td>
                  
                  <span className={`status-badge status-${request.status || 'pending'}`}>
                    {request.status || 'Pending'}
                  </span>
                </td>
                <td className="action-buttons-cell">
                 
                  <>
                    <button
                      className="action-button approve-button"
                      onClick={() => handleRequestAction(request._id, 'approved')}
                    >
                      Approve
                    </button>
                    <button
                      className="action-button decline-button"
                      onClick={() => handleRequestAction(request._id, 'declined')}
                    >
                      Decline
                    </button>
                  </>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PetRequestList;