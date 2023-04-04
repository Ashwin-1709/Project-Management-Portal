import React, { useContext, useState, useReducer, useEffect } from 'react';
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
import './TeacherNavbar.css';
import AuthContext from '../AuthContext';
import { Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, TextField } from '@mui/material';
import axios from 'axios';

function TeacherNavbar({ stateChanger }) {
  const [showNavColor, setShowNavColor] = useState(false);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [severity, setSeverity] = useState("");
  const [msg, setMsg] = useState("");
  const [classCode, setClassCode] = useState("");
  const [classTitle, setClassTitle] = useState("");
  const { student, setStudent, teacher, setTeacher } = useContext(AuthContext);

  useEffect(() => {

  }, [open1, severity, msg]);

  const logoutUser = () => {
    localStorage.removeItem('teacher');
    setTeacher({});
  }

  const closeDialog = () => {
    setOpen(false);
    setClassCode("");
    setClassTitle("");
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen1(false);
    setSeverity("");
    setMsg("");
  };

  const createClass = async () => {
    if (classCode.length === 0 || classTitle.length === 0) {
      setOpen1(true);
      setSeverity("error");
      setMsg("Please enter valid class code and title!");
    }
    else {
      await axios.post("https://project-management-portal-server.vercel.app/class/create", {
        email: teacher.token.email,
        title: classTitle,
        code: classCode
      }).then((res) => {
        if (res.status === 200) {
          let newTeacher = teacher;
          if (classCode.length !== 0) newTeacher.token.courses.push(classCode);
          setTeacher(newTeacher);
          localStorage.setItem('teacher', JSON.stringify(teacher));
          setOpen1(true);
          setSeverity("success");
          setMsg("New class created");
        }
        else {
          setOpen1(true);
          setSeverity("warning");
          setMsg(res.data);
        }
      }).catch((err) => {
        console.log(err);
        setOpen1(true);
        setSeverity("error");
        setMsg(err.response.data);
      })
      setOpen(false);
      stateChanger(prev => !prev);
    }
  }

  return (
    <>
      <MDBNavbar expand='lg' bgColor='light'>
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
          <MDBCollapse show={showNavColor} navbar>
            <MDBNavbarNav className='me-auto mb-2 mb-lg-0 justify-content-end' style={{ width: "100%" }}>
              <MDBNavbarItem>
                <MDBNavbarLink>
                  <Button variant='outlined' onClick={() => setOpen(true)}>Create Class</Button>
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
        <DialogTitle>Create Class</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the code and title of the new class:
          </DialogContentText>
          <TextField variant='outlined' required fullWidth style={{ marginTop: '5%' }} value={classCode} onChange={(e) => setClassCode(e.target.value)} label="New Class Code" />
          <br />
          <TextField variant='outlined' required fullWidth style={{ marginTop: '5%' }} value={classTitle} onChange={(e) => setClassTitle(e.target.value)} label="New Class Title" />
        </DialogContent>
        <DialogActions>
          <Button variant='text' color='error' onClick={closeDialog}>Cancel</Button>
          <Button variant='text' onClick={createClass}>Create Class</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={open1} autoHideDuration={5000} onClose={handleClose}>
        <Alert severity={severity} variant="filled" onClose={handleClose}>{msg}</Alert>
      </Snackbar>
    </>
  );
}

export default TeacherNavbar;