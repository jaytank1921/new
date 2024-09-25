// src/Agents.js
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';


const agentsData = [
  { id: 1, name: 'Agent Smith' },
  { id: 2, name: 'Agent Johnson' },
  { id: 3, name: 'Agent Carter' },
];

const Agents = () => {
  return (
    <div>
      <h1>Agents Page</h1>
      <Navbar />

      <ul>
        {agentsData.map(agent => (
          <li key={agent.id}>{agent.name}</li>
        ))}
       
      </ul>
      <div>  <Link to="/home">
  <button className="home-button">Home page</button>
</Link> </div>
     
    </div>
    
  );
};

export default Agents;
