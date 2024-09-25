// import React, { useState } from 'react';
// //import { v4 as uuidv4 } from 'uuid';
// import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
// import { useNavigate } from 'react-router-dom';



// const MyComponent = () => {
//   const [open, setOpen] = useState(false);
//   const [buttonPath, setButtonPath] = useState(null);
//   const navigate = useNavigate();

//   const handleClickOpen = (path) => {
//     setButtonPath(path);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setButtonPath(null);
//   };

//   const handleNavigate = () => {
//     if (buttonPath) {
//       navigate(buttonPath);
//     }
//     setOpen(false);
//     setButtonPath(null);0
//   };

//   return (
//     <div>
//      <Button variant="contained" color="primary" onClick={() => handleClickOpen('/landing')}> Home </Button>
//       <Button variant="contained" color="secondary" onClick={() => handleClickOpen('/anotherlanding')}> Button 2</Button>
//     <Dialog open={open} onClose={handleClose} aria-describedby="alert-dialog-description">  
//         <DialogContent style={{width:'400px'}}>
//               <DialogContentText id="alert-dialog-description" textAlign="center">  Do you Wish to proceed?        </DialogContentText>
//         </DialogContent>
//      <DialogActions style={{width:'100%'}}>
//         <Button onClick={handleNavigate} color="primary" style={{width:'50%'}}> Yes </Button>
//         <Button onClick={handleClose} color="primary" autoFocus style={{width:'50%'}}> Cancel </Button>
//     </DialogActions>
//     </Dialog>
//   </div>
//   );
// };

// export default MyComponent;
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Leads from './Leads';
import Owners from './Owners';
import Agents from './Agents';
import AddUser from './adduser'; // Import your new component
import Docs from './Docs';
import AddAgreement from './AddAgreement';
 
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/adduser" element={<AddUser />} /> {/* Add route for AddUser */}
        <Route path="/leads" element={<Leads />} />
        <Route path="/add-agreement" component={AddAgreement} />

        <Route path="/owners" element={<Owners />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/docs" element={<Docs />} />
      </Routes>
    </Router>
  );
}

export default App;
