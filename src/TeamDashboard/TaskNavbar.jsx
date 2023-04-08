import React, { useContext, useState } from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse
} from 'mdb-react-ui-kit';
import Button from '@mui/material/Button';
import './TaskNavbar.css';
import AuthContext from '../AuthContext';

export default function App() {
  const [showNavColor, setShowNavColor] = useState(false);
  const {student, setStudent, teacher, setTeacher} = useContext(AuthContext);

  const logoutUser = () => {
    localStorage.removeItem('teacher');
    setTeacher({});
  }

  return (
    <>
      <MDBNavbar expand='lg'  bgColor='light'>
        <MDBContainer fluid>
          <MDBNavbarBrand href='#'><span className='navbar-title'>Teamify</span>{' '}</MDBNavbarBrand>
          <MDBNavbarToggler
            type='button'
            data-target='#navbarColor02'
            aria-controls='navbarColor02'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowNavColor(!showNavColor)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
          <MDBCollapse  show={showNavColor} navbar>
            <MDBNavbarNav className='me-auto mb-2 mb-lg-0 justify-content-end' style={{ width: "100%" }}>
                <MDBNavbarItem>
                    <MDBNavbarLink href="/login">
                        <Button variant='contained' onClick={logoutUser}>Logout</Button>
                    </MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>

      </>
  );
}


  
  
   