import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import './Leads.css';

const Leads = () => {
  const [contactValue, setContactValue] = useState('');
  const [fieldValue, setFieldValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [addressValue, setAddressValue] = useState('');
  const [docTypeValue, setDocTypeValue] = useState('');
  const [formVisible, setFormVisible] = useState(false);
  const [leadsData, setLeadsData] = useState([]);

  // Fetch leads data from the backend when the component mounts
  useEffect(() => {
    const fetchLeadsData = async () => {
      try {
        const response = await axios.get('http://192.168.2.202:5000/api/leads');
        setLeadsData(response.data);
      } catch (error) {
        console.error('Error fetching leads:', error);
      }
    };

    fetchLeadsData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newLead = {
      contact: contactValue,
      field: fieldValue,
      name: nameValue,
      address: addressValue,
      docType: docTypeValue,
    };

    try {
      const response = await axios.post('http://192.168.2.202:5000/api/leads', newLead);
      console.log('Lead added:', response.data);
      // Clear form fields after submission
      setContactValue('');
      setFieldValue('');
      setNameValue('');
      setAddressValue('');
      setDocTypeValue('');
      setFormVisible(false); // Hide the form
      // Re-fetch leads data to update the table
      const updatedLeads = await axios.get('http://192.168.2.202:5000/api/leads');
      setLeadsData(updatedLeads.data);
    } catch (error) {
      console.error('Error adding lead:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <h1>Leads</h1>
      <Navbar />

      <button onClick={() => setFormVisible(true)}>Create Lead</button>

      {formVisible && (
        <form onSubmit={handleSubmit} className="lead-form">
          <input
            type="text"
            placeholder="Contact"
            value={contactValue}
            onChange={(e) => setContactValue(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Field"
            value={fieldValue}
            onChange={(e) => setFieldValue(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Name"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Address"
            value={addressValue}
            onChange={(e) => setAddressValue(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Doc Type"
            value={docTypeValue}
            onChange={(e) => setDocTypeValue(e.target.value)}
            required
          />
          <button type="submit">Add Lead</button>
          <button type="button" onClick={() => setFormVisible(false)}>Cancel</button>
        </form>
      )}

      <table className="leads-table">
        <thead>
          <tr>
            <th>Contact</th>
            <th>Field</th>
            <th>Name</th>
            <th>Address</th>
            <th>Doc Type</th>
          </tr>
        </thead>
        <tbody>
          {leadsData.map((lead, index) => (
            <tr key={index}>
              <td>{lead.contact}</td>
              <td>{lead.field}</td>
              <td>{lead.name}</td>
              <td>{lead.address}</td>
              <td>{lead.docType}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/home">
        <button className="home-button">Home page</button>
      </Link>

    </div>
  );
};

export default Leads;
