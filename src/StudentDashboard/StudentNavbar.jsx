import React, { useContext, useEffect, useState } from 'react';
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
import { Link } from 'react-router-dom';
import { redirect } from 'react-router-dom';
import { fontWeight } from '@mui/system';
import './StudentNavbar.css';
import AuthContext from '../AuthContext';
import { Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, TextField } from '@mui/material';
import axios from 'axios';
 
function StudentNavbar({ stateChanger }) {
  const [showNavColor, setShowNavColor] = useState(false);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [severity, setSeverity] = useState("");
  const [msg, setMsg] = useState("");
  const [classCode, setClassCode] = useState("");
  const {student, setStudent, teacher, setTeacher} = useContext(AuthContext);

  useEffect(() => {

  }, [open1, severity, msg])

  const logoutUser = () => {
    localStorage.removeItem('student');
    setStudent({});
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen1(false);
    setSeverity("");
    setMsg("");
  };

  const enrol = async () => {
    await axios.post("https://project-management-portal-server.vercel.app/class/enrol", {
      code: classCode,
      email: student.token.email
    }).then((res) => {
      if (res.status === 200) {
        let newStudent = student;
        if (classCode.length > 0) newStudent.token.courses.push(classCode);
        setStudent(newStudent);
        localStorage.setItem('student', JSON.stringify(student));
        setOpen1(true);
        setSeverity("success");
        setMsg("Successfully enrolled!");
      }
      else {
        setOpen1(true);
        setSeverity("warning");
        setMsg(res.data);
      }
      setOpen(false);
      stateChanger(prev => !prev);
    }).catch((err) => {
      setOpen1(true);
      setSeverity("error");
      setMsg(err.response.data);
    })
  }

  const joinClass = async () => {
    await axios.get(`https://project-management-portal-server.vercel.app/class/search?code=${classCode}`)
      .then((res) => {
      if (res.status === 200) {
        enrol();
      }
    }).catch((err) => {
      setOpen1(true);
      setSeverity("error");
      setMsg(err.response.data);
    })
    setOpen(false);
    stateChanger(prev => !prev);
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
                    <MDBNavbarLink>
                        <Button variant='outlined' onClick={() => setOpen(true)}>Join Class</Button>
                    </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                    <MDBNavbarLink href="/login">
                        <Button variant='contained' onClick={logoutUser}>Logout</Button>
                    </MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
      <br />
      <Dialog open={open}>
        <DialogTitle>Join Class</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the class code:
          </DialogContentText>
          <TextField variant='outlined' style={{marginTop: '5%'}} value={classCode} onChange={(e) => setClassCode(e.target.value)} placeholder="Class Code"></TextField>
        </DialogContent>
        <DialogActions>
          <Button variant='text' color='error' onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant='text' onClick={joinClass}>Join Class</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={open1} autoHideDuration={5000} onClose={handleClose}>
        <Alert severity={severity} variant="filled" onClose={handleClose}>{msg}</Alert>
      </Snackbar>
    </>
  );
}

export default StudentNavbar;