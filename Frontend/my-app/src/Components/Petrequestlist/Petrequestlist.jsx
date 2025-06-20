import React, { useEffect, useState } from "react";
import axios from "axios";
import './PetRequestList.css';
import Navigationbar from "../Navigationbar";
import ConfirmModal from "../ConfirmPage/ConfirmModal";
import InfoModal from "../InfoModal/InfoModal";

const PetRequestList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState({
    id: null,
    petName: '',
  });

  const [showInfoModal, setShowInfoModal] = useState(false);
  const [info, setInfo] = useState({ title: '', message: '', variant: 'primary' });

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
        setError("Failed to fetch requests. Please check the console.");
        setLoading(false);
      });
  };

  const handleRequestDelete = (id, petsname) => {
    setConfirmConfig({ id, petName: petsname || 'this pet' });
    setShowConfirmModal(true);
  };

  const handleConfirmAction = async () => {
    const { id, petName } = confirmConfig;

    try {
      await axios.delete(`http://localhost:8000/api/adopts/${id}`);
      setRequests((prev) => prev.filter((req) => req._id !== id));
      setInfo({
        title: 'Request Deleted',
        message: `The adoption request for ${petName} has been deleted.`,
        variant: 'danger',
      });
      setShowInfoModal(true);
    } catch (err) {
      console.error('Failed to delete request:', err);
      setInfo({
        title: 'Error',
        message: 'Failed to delete request. Please try again.',
        variant: 'danger',
      });
      setShowInfoModal(true);
    } finally {
      setShowConfirmModal(false);
      setConfirmConfig({ id: null, petName: '' });
    }
  };

  if (loading) return <><Navigationbar /><div className="loading-message">Loading requests...</div></>;
  if (error) return <><Navigationbar /><div className="error-message">{error}</div></>;
  if (requests.length === 0) return <><Navigationbar /><div className="no-requests-message">No adoption requests found.</div></>;

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
                <th>Address</th>
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
                  <td>{request.address || "-"}</td>
                  <td className="action-buttons-cell">
                    <button
                      className="action-button delete-button"
                      onClick={() => handleRequestDelete(request._id, request.petsname)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirm Modal */}
      <ConfirmModal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmAction}
        title="Confirm Delete"
        message={`Are you sure you want to delete the request for "${confirmConfig.petName}"?`}
      />

      {/* Info Modal */}
      <InfoModal
        show={showInfoModal}
        onHide={() => setShowInfoModal(false)}
        title={info.title}
        message={info.message}
        variant={info.variant}
      />
    </>
  );
};

export default PetRequestList;
