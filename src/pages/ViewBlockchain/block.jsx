import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import Modal from 'react-modal';
import '../ViewBlockchain/block.css';

const Blockchain = () => {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Fetch blockchain records when the component is mounted
    const fetchTransactions = async () => {
      try {
        setLoading(true); // Start loading
        const response = await axios.get('https://food-quality-2s5r.onrender.com/api/transaction/blockchain');
        console.log('API Response:', response.data);
        setTransactions(response.data.blockchainData);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false); // Stop loading when data is fetched or error occurs
      }
    };

    fetchTransactions();
  }, []);

  const openTransactionDetails = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  return (
    <div className="blockchain-container">
      <h2>Blockchain Records</h2>

      {/* Loading message and bike animation */}
      {loading && (
        <div className="loading-message">
          <p>Hold on! The database is in another continent. Please wait while we fetch the data...</p>
          <div className="bike-animation">
            <img src="assets/bike.png" alt="Loading bike" className="bike" />
          </div>
        </div>
      )}

      {/* Transaction List Table */}
      {!loading && transactions.length > 0 && (
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Action</th>
              <th>Name</th>
              <th>Blockchain ID</th>
              <th>Updated Fields</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.blockchainId}>
                <td>{new Date(transaction.timestamp).toLocaleString()}</td>
                <td>{transaction.action || 'N/A'}</td>
                <td>{transaction.name}</td>
                <td>{transaction.blockchainId}</td>
                <td>{transaction.updatedFields.length > 0 ? transaction.updatedFields.join(', ') : 'N/A'}</td>
                <td>
                  <button onClick={() => openTransactionDetails(transaction)}>
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Transaction Details Modal */}
      {selectedTransaction && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Transaction Details"
          className="modal-content"
        >
          <h3>Transaction Details</h3>
          <div>
            <strong>Timestamp:</strong> {new Date(selectedTransaction.timestamp).toLocaleString()}
          </div>
          <div>
            <strong>Action:</strong> {selectedTransaction.action || 'N/A'}
          </div>
          <div>
            <strong>Name:</strong> {selectedTransaction.name}
          </div>
          <div>
            <strong>Blockchain ID:</strong> {selectedTransaction.blockchainId}
          </div>
          <div>
            <strong>Updated Fields:</strong> {selectedTransaction.updatedFields.length > 0 ? selectedTransaction.updatedFields.join(', ') : 'N/A'}
          </div>
          <div>
            <strong>Description:</strong> {selectedTransaction.description || 'N/A'}
          </div>
          <div>
            <strong>Origin:</strong> {selectedTransaction.origin || 'N/A'}
          </div>
          <div>
            <strong>Expiry Date:</strong> {selectedTransaction.expiryDate ? new Date(selectedTransaction.expiryDate).toLocaleString() : 'N/A'}
          </div>
          <div>
            <strong>Quantity:</strong> {selectedTransaction.quantity}
          </div>
          <div>
            <strong>Quality Score:</strong> {selectedTransaction.qualityScore}
          </div>
          <button onClick={closeModal}>Close</button>
        </Modal>
      )}
    </div>
  );
};

export default Blockchain;
