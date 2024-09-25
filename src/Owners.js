// src/Owners.js
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const ownersData = [
  { id: 1, property: 'Villa', address: '123 Main St', type: 'Sell', agreement: 'Signed' },
  { id: 2, property: 'Apartment', address: '456 Oak Ave', type: 'Rent', agreement: 'Pending' },
  { id: 3, property: 'Condo', address: '789 Pine Rd', type: 'Sell', agreement: 'Signed' },
];

const Owners = () => {
  return (
    
    <TableContainer component={Paper} sx={{ width: '80%', margin: 'auto' }}>
        <h3 style={{textAlign:'center'}}> Owners details</h3>
        <Navbar />

      <Table width="80%">
        <TableHead>
          <TableRow style={{background:'skyblue'}}>
            <TableCell sx={{ fontWeight: 'bold' }}>Property</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Address</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Sell or Rent</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Agreement</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ownersData.map(owner => (
            <TableRow key={owner.id}>
              <TableCell>{owner.property}</TableCell>
              <TableCell>{owner.address}</TableCell>
              <TableCell>{owner.type}</TableCell>
              <TableCell>{owner.agreement}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link to="/home">
  <button className="home-button">Home page</button>
</Link>
    </TableContainer>
    
    
  );
 
};

export default Owners;
