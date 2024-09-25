import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import './Docs.css'; // Import your CSS file

const Docs = () => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [doc, setDoc] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(''); // For error handling
  const [agreements, setAgreements] = useState([]); // State to hold agreements

  // Fetch agreements from the server
  const fetchAgreements = async () => {
    try {
      const response = await fetch('http://192.168.2.202:5000/api/agreements');
      if (!response.ok) {
        throw new Error('Failed to fetch agreements');
      }
      const data = await response.json();
      setAgreements(data); // Set fetched agreements to state
    } catch (error) {
      console.error('Error fetching agreements:', error);
      setError('Could not load agreements: ' + error.message);
    }
  };

  // UseEffect to fetch data on component mount
  useEffect(() => {
    fetchAgreements();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('propertyType', propertyType);
    formData.append('doc', doc);

    try {
      const response = await fetch('http://192.168.2.202:5000/api/agreements', {
        method: 'POST',
        body: formData,
      });

      // Check if the response is ok
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Unknown error occurred');
      }

      // Only access responseData after checking the response is OK
      const responseData = await response.json();
      console.log('Agreement added successfully:', responseData);
      setSubmitted(true);
      setName(''); // Clear input fields
      setPropertyType('');
      setDoc(null); // Reset the file input

      // Refetch agreements to include the newly added agreement
      fetchAgreements();

    } catch (error) {
      console.error('Error submitting form:', error.message);
      setError('There was a problem submitting your data: ' + error.message);
    }
  };    

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setDoc(file);
    } else {
      alert('Please upload a valid PDF file.');
      setDoc(null);
    }
  };

  return (
    <div>
      <h1>Docs Page</h1>
      <Navbar />


      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Property Type</th>
            <th>Doc</th>
          </tr>
        </thead>
        <tbody>
          {agreements.length > 0 ? (
            agreements.map((agreement, index) => (
              <tr key={index}>
                <td>{agreement.name}</td>
                <td>{agreement.propertyType}</td>
                <td>
                  <a 
                    href={`http://192.168.2.202:5000/uploads/${agreement.doc}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {agreement.doc}
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No agreements found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={{ marginTop: '20px' }}>
        <button className="add-agreement-button" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add Agreement'}
        </button>
        <Link to="/home" style={{ marginLeft: '10px' }}>
          <button className="home-button">Home page</button>
        </Link>
      </div>

      {showForm && (
        <div style={{ marginTop: '20px' }}>
          <h2>Add Agreement</h2>
          {submitted && <p>Agreement added successfully!</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>} {/* Error message */}
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Name" 
              required 
            />
            <input 
              type="text" 
              value={propertyType} 
              onChange={(e) => setPropertyType(e.target.value)} 
              placeholder="Property Type" 
              required 
            />
          <input 
   type="file" 
   onChange={(e) => setDoc(e.target.files[0])} 
   required 
/>

            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Docs;
