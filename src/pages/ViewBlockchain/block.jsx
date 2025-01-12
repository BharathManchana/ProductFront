import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import Modal from 'react-modal';
import '../ViewBlockchain/block.css';

const Blockchain = () => {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://food-quality-2s5r.onrender.com/api/transaction/blockchain');
        console.log('API Response:', response.data);
        setTransactions(response.data.blockchainData);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const sortData = (data, key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    return sortedData;
  };

  const handleSort = (key) => {
    setTransactions(sortData(transactions, key));
  };

  const getSortArrow = (key) => {
    if (sortConfig.key !== key) return '';
    return sortConfig.direction === 'ascending' ? ' ↑' : ' ↓';
  };

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
  
      {loading && (
        <div className="loading-message">
          <div className="bike-animation">
            <img src="./src/assets/bike.png" alt="Loading bike" className="bike" />
          </div>
          <p>Hold on! The database is in another continent. Please wait while we fetch the data...</p>
        </div>
      )}
  
      {!loading && transactions.length > 0 && (
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Sno</th>
              <th onClick={() => handleSort('timestamp')}>Timestamp {getSortArrow('timestamp')}</th>
              <th onClick={() => handleSort('action')}>Action {getSortArrow('action')}</th>
              <th onClick={() => handleSort('name')}>Name {getSortArrow('name')}</th>
              <th onClick={() => handleSort('blockchainId')}>Blockchain ID {getSortArrow('blockchainId')}</th>
              <th onClick={() => handleSort('updatedFields')}>Updated Fields {getSortArrow('updatedFields')}</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={transaction.blockchainId}>
                <td>{index + 1}</td>
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
  
      {isModalOpen && selectedTransaction && (
        <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
          <h2>Transaction Details</h2>
          <pre>{JSON.stringify(selectedTransaction, null, 2)}</pre>
          <button onClick={closeModal}>Close</button>
        </Modal>
      )}
    </div>
  );
};

export default Blockchain;
