import React, { useContext } from 'react'
import { userContext } from '../components/App';
import '../css/Info.css';

function Info() {
  const { user } = useContext(userContext);

  return (

    <div className="info-container">
      <h1>User Information</h1>
      <div className="info-field">
        <span className="field-label">Name:</span>
        <span className="field-value">{user.name}</span>
      </div>
      <div className="info-field">
        <span className="field-label">Username:</span>
        <span className="field-value">{user.username}</span>
      </div>
      <div className="info-field">
        <span className="field-label">Email:</span>
        <span className="field-value">{user.email}</span>
      </div>
      <div className="info-field">
        <span className="field-label">Address:</span>
        <div className="nested-info">
          <div>
            <span className="nested-label">Street:</span>
            <span className="nested-value">{user.street}</span>
          </div>
          <div>
            <span className="nested-label">City:</span>
            <span className="nested-value">{user.city}</span>
          </div>        
        </div>
      </div>
      <div className="info-field">
        <span className="field-label">Phone:</span>
        <span className="field-value">{user.phone}</span>
      </div>
    </div>
  );

}

export default Info