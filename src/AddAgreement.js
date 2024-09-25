// src/AddAgreement.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Docs.css'; // Import your CSS file

const AddAgreement = () => {
  const [name, setName] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [doc, setDoc] = useState('');
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle form submission, e.g., send data to the server
    console.log({ name, propertyType, doc });

    // Redirect to Docs page after submission
    navigate('/docs'); // Use navigate instead of history.push
  };

  return (
    <div>
      <h1>Add Agreement</h1>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <label>Name:</label>
              </td>
              <td>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Property Type:</label>
              </td>
              <td>
                <input
                  type="text"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Doc:</label>
              </td>
              <td>
                <textarea
                  value={doc}
                  onChange={(e) => setDoc(e.target.value)}
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddAgreement;
