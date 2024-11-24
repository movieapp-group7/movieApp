import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext'; // Import UserContext

const CreateGroupModal = ({ onClose, onGroupCreated }) => {
  const { user } = useContext(UserContext);  // Access current user context
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/groups/create`, {
        name,
        description,
        created_by: user.id,
      });
      

      if (response.data.success) {
        onGroupCreated(response.data.group);
        onClose();
      }
    } catch (err) {
      setError('Error creating group. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={modalOverlayStyle}>
      <div style={modalStyle}>
        <h2>Create a New Group</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Group Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Group'}
          </button>
        </form>
        <button onClick={onClose} style={{ marginTop: '10px' }}>
          Cancel
        </button>
      </div>
    </div>
  );
};

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '5px',
  width: '400px',
};

export default CreateGroupModal;
