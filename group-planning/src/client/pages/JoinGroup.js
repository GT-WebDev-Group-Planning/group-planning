import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import axios from 'axios';

const JoinGroup = () => {
    const [code, setCode] = useState('');
    const navigate = useNavigate();

    const handleAddGroup = () => {
        const data = {
          code,
        };
        axios
          .post('http://localhost:5000/joingroup', data)
          .then(() => {
            enqueueSnackbar('Group Joined Successfully', { variant: 'success' });
            navigate('/groups');
          })
          .catch((error) => {
            enqueueSnackbar('Code does not exist or already in group', { variant: 'error' });
            console.log(error);
        });
        navigate('/groups');
    };
    
    const handleCodeChange = (event) => {
        setCode(event.target.value);
    };

    return (
      <div className="groups--centered join-group">
      <h2>Join Group</h2>
      <br />
      <div className="groups--inputs-col">
        <div className="groups--input-row">
          <SnackbarProvider />
          <p className="groups--input-text">Group Code: </p>
          <input
            type="text"
            value={code}
            onChange={handleCodeChange}
            className="groups--create-input"
          />
        </div>
        <button
          className="groups--create-button"
          onClick={handleAddGroup}
        >
          Join Group
        </button>
      </div>
    </div>
  );
}

export default JoinGroup