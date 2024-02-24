import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const CreateGroup = () => {
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSaveGroup = () => {
        console.log("save group placeholder")
        // const data = {
        //     name,
        //     code,
        //     description,
        //     userEmail
        // };
        // setLoading(true);
        // axios.post('http://localhost:5000/creategroup', data)
        // .then (() => {
        //     enqueueSnackbar('Group Created Successfully', {variant: 'success'});
        //     navigate('/group');
        // })
        // .catch((error) => {
        //     enqueueSnackbar('Code Already in Use', {variant: 'error'});
        //     console.log(error);
        // });
    };
    return (
        <div className="groups--centered create-group">
          <h2>Create Group</h2>
          <br />
          <div className="groups--inputs-col">
            <div className="groups--input-row">
              <p className="groups--input-text">Name: </p>
              <input
                type = "text"
                value = { name }
                onChange = {(e) => setName(e.target.value)}
                className = "groups--create-input"
              />
            </div>
            <div className="groups--input-row">
              <p className="groups--input-text">Group Code: </p>
              <input type="text"
                value = { code }
                onChange = {(e) => setCode(e.target.value)}
                className = "groups--create-input"
              />
            </div>
            <div className="groups--input-row">
              <p className="groups--input-text">Description: </p>
              <textarea 
                value = { description }
                onChange = {(e) => setDescription(e.target.value)}
              />
            </div>
            <button className="groups--create-button"
            onClick={handleSaveGroup}>
              Create Group
            </button>
          </div>
        </div>
      );
}

export default CreateGroup