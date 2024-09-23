// src/Agents.js
import React from 'react';

const agentsData = [
  { id: 1, name: 'Agent Smith' },
  { id: 2, name: 'Agent Johnson' },
  { id: 3, name: 'Agent Carter' },
];

const Agents = () => {
  return (
    <div>
      <h1>Agents Page</h1>
      <ul>
        {agentsData.map(agent => (
          <li key={agent.id}>{agent.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Agents;
