import React, { useEffect, useState } from "react";
import axios from "axios";
import './PetRequestList.css';
import Navigationbar from "../Navigationbar";

const PetRequestList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [actionToConfirm, setActionToConfirm] = useState(null);
  const [requestIdToConfirm, setRequestIdToConfirm] = useState(null);
  const [petNameForModal, setPetNameForModal] = useState('');

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

  const handleRequestAction = (id, action, petsname) => {
    setShowConfirmModal(true);
    setActionToConfirm(action);
    setRequestIdToConfirm(id);
    setPetNameForModal(petsname || 'this pet');
  };

  const handleConfirmAction = async () => {
    const actionVerb = actionToConfirm === 'approved' ? 'approve' : 'decline';
    const successMessage = actionToConfirm === 'approved' ? 'Approved successfully!' : 'Declined successfully!';

    try {
      await axios.delete(`http://localhost:8000/api/adopts/${requestIdToConfirm}`);
      setRequests(prevRequests =>
        prevRequests.filter(request => request._id !== requestIdToConfirm)
      );
    } catch (err) {
      console.error(`Error ${actionVerb} request:`, err);
      alert(`Failed to ${actionVerb} request. Please try again.`);
    } finally {
      setShowConfirmModal(false);
      setActionToConfirm(null);
      setRequestIdToConfirm(null);
      setPetNameForModal('');
    }
  };

  const handleCancelAction = () => {
    setShowConfirmModal(false);
    setActionToConfirm(null);
    setRequestIdToConfirm(null);
    setPetNameForModal('');
  };

  if (loading) {
    return (
      <>
        <Navigationbar />
        <div className="loading-message">Loading requests...</div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navigationbar />
        <div className="error-message">{error}</div>
      </>
    );
  }

  if (requests.length === 0) {
    return (
      <>
        <Navigationbar />
        <div className="no-requests-message">No adoption requests found.</div>
      </>
    );
  }

  return (
    <>
      <Navigationbar />
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
                        onClick={() => handleRequestAction(request._id, 'approved', request.petsname)}
                      >
                        Approve
                      </button>
                      <button
                        className="action-button decline-button"
                        onClick={() => handleRequestAction(request._id, 'declined', request.petsname)}
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

      {showConfirmModal && (
        <div className={`web-modal-overlay ${showConfirmModal ? 'active' : ''}`}>
          <div className="web-modal-content">
            <div className="web-modal-header">
              <h3 className="web-modal-title">
                {actionToConfirm === 'approved' ? 'Confirm Approval' : 'Confirm Decline'}
              </h3>
            </div>
            <div className="web-modal-body">
              <p className="web-modal-message">
                Are you sure you want to <strong>{actionToConfirm === 'approved' ? 'approve' : 'decline'}</strong> the request for <strong>{petNameForModal}</strong>? This action cannot be undone.
              </p>
            </div>
            <div className="web-modal-footer">
              <button
                className="web-modal-button button-cancel"
                onClick={handleCancelAction}
              >
                Cancel
              </button>
              <button
                className="web-modal-button button-confirm"
                onClick={handleConfirmAction}
              >
                {actionToConfirm === 'approved' ? 'Approve' : 'Decline'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PetRequestList;
