import React, { useContext, useEffect, useState } from 'react';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
  from 'mdb-react-ui-kit';
import { Button, MenuItem, Select, Snackbar, Typography } from '@mui/material';
import axios from 'axios';
import TeacherDashboard from './TeacherDashboard/TeacherDashboard';
import StudentDashboard from './StudentDashboard/StudentDashboard';
import AuthContext from './AuthContext';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");

  const {student, setStudent, teacher, setTeacher} = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem('student') && JSON.parse(localStorage.getItem('student').token !== undefined)) {
      setStudent(JSON.parse(localStorage.getItem('student')));
    }

    else if (localStorage.getItem('teacher') && JSON.parse(localStorage.getItem('teacher').token !== undefined)) {
      setTeacher(JSON.parse(localStorage.getItem('teacher')));
    }
  })

  const handleSubmit = async () => {
    console.log(email, password, role);
    if (role === "Student") {
      await axios.post('http://localhost:5000/student/login', {
        email: email,
        password: password
      }).then((res) => {
        console.log(res.data);
        localStorage.removeItem('teacher');
        setTeacher({});
        setStudent({token: res.data});
        localStorage.setItem('student', JSON.stringify({token: res.data}))
      }).catch((err) => {
        console.log(err);
      })
    }
    else if (role === "Teacher") {
      await axios.post('http://localhost:5000/teacher/login', {
        email: email,
        password: password
      }).then((res) => {
        console.log(res);
        localStorage.removeItem('student');
        setStudent({});
        setTeacher({token: res.data});
        localStorage.setItem('teacher', JSON.stringify({token: res.data}));
      }).catch((err) => {
        console.log(err);
      })
    }
  }

  return (
    <MDBContainer fluid className="p-3 my-5" style={{ maxWidth: '80%' }}>

      <MDBRow style={{ marginTop: '4%' }}>

        <MDBCol col='12' md='7'>
          <img src="https://img.freepik.com/free-vector/business-team-brainstorm-idea-lightbulb-from-jigsaw-working-team-collaboration-enterprise-cooperation-colleagues-mutual-assistance-concept-pinkish-coral-bluevector-isolated-illustration_335657-1651.jpg?w=996&t=st=1677676073~exp=1677676673~hmac=d3dab1bcc405590e77f8690f7116f620e28484c619c086846551c63baf455973" className="img-fluid" alt="Phone image" height={'120%'} />
        </MDBCol>

        <MDBCol col='4' md='5' style={{ textAlign: 'center', marginTop: '5%' }}>

          <Typography variant='h4' style={{ color: 'black' }}>Teamify</Typography>
          <div style={{ marginTop: '5%' }}>
            <MDBInput wrapperClass='mb-4' value={email} onChange={(e) => setEmail(e.target.value)} label='Email' type='email' size="lg" />
            <MDBInput wrapperClass='mb-4' value={password} onChange={(e) => setPassword(e.target.value)} label='Password' type='password' size="lg" />
          </div>



          <div className="d-flex mb-4">
            <Select fullWidth size='small' value={role} onChange={(e) => setRole(e.target.value)}>
              <MenuItem value={"Student"}>Student</MenuItem>
              <MenuItem value={"Teacher"}>Teacher</MenuItem>
            </Select>
          </div>

          <Button variant='contained' className="mb-4 w-100" size="lg" onClick={handleSubmit}>Sign in</Button>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default Login;