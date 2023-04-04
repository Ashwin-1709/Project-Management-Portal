import React, { useEffect, useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import './Register.css';
import axios from 'axios';
import { MenuItem, Select, Button, Snackbar, Alert } from '@mui/material';
import background from './StudentDashboard/background.png'
import { Link } from 'react-router-dom';

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("Student");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {}, [open, severity, msg]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setSeverity("");
    setMsg("");
  };

  const handleSubmit = async () => {
    if (name.length === 0 || email.length === 0 || password.length === 0 || phone.length === 0) {
      setOpen(true);
      setSeverity("error");
      setMsg("Please fill out all fields!");
    }
    else if (role === "Student") {
      await axios.post('https://project-management-portal-server.vercel.app/student/register', {
        name: name,
        email: email,
        password: password,
        phone: phone
      }).then((res) => {
        if (res.status === 200) {
          setOpen(true);
          setSeverity("success");
          setMsg("Successfully registered!");
        }
        else {
          setOpen(true);
          setSeverity("warning");
          setMsg(res.data);
        }
      }).catch((err) => {
        setOpen(true);
        setSeverity("error");
        setMsg(err.response.data);
      })
    }
    else if (role === "Teacher") {
      await axios.post('https://project-management-portal-server.vercel.app/teacher/register', {
        name: name,
        email: email,
        password: password,
        phone: phone
      }).then((res) => {
        if (res.status === 200) {
          setOpen(true);
          setSeverity("success");
          setMsg("Successfully registered!");
        }
        else {
          setOpen(true);
          setSeverity("warning");
          setMsg(res.data);
        }
      }).catch((err) => {
        setOpen(true);
        setSeverity("error");
        setMsg(err.response.data);
      })
    }
  }

  return (
    <MDBContainer fluid className=' register d-flex align-items-center justify-content-center bg-image' style={{backgroundImage: `url(${background})`, textAlign: 'center'}}>
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5' style={{maxWidth: '600px'}}>
        <MDBCardBody className='px-5'>
          <h2 className="text-center mb-4">Create an account</h2>
          <MDBInput wrapperClass='mb-4' label='Your Name' size='lg' id='form1' type='text' value={name} onChange={(e) => setName(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' label='Your Email' size='lg' id='form2' type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' label='Password' size='lg' id='form3' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' label='Phone' size='lg' id='form4' type='tel' value={phone} onChange={(e) => setPhone(e.target.value)}/>
          <Select style={{marginBottom: '5%', textAlign: 'center'}} size="small" value={role} fullWidth onChange={(e) => setRole(e.target.value)}>
            <MenuItem value={"Student"}>Student</MenuItem>
            <MenuItem value={"Teacher"}>Teacher</MenuItem>
          </Select>
          <Button variant='contained' style={{marginBottom: '3%'}} fullWidth onClick={handleSubmit}>Register</Button>
          <Link to="/login">Already registered? Sign in here.</Link>
        </MDBCardBody>
      </MDBCard>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert severity={severity} variant="filled" onClose={handleClose}>{msg}</Alert>
      </Snackbar>
    </MDBContainer>
  );
}

export default Register;