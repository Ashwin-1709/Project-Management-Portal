import React from 'react';
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';
import { Link } from '@mui/material';
import './TaskCard.css';

export default function TaskCard( {taskTitle, taskStatus, taskDeadline} ) {
  let map = new Map();
  map.set("finished", "#81c784");
  map.set("in progress", "#ffa726");
  map.set("not started", "#e57373");

  return (
    <MDBCard className='taskcard'>
      <MDBRow className='g-0'>
        <MDBCol md='1' style={{backgroundColor: map.get(taskStatus)}}>
            
        </MDBCol>
        <MDBCol md='8'>
          <MDBCardBody>
            <MDBCardTitle>{taskTitle}</MDBCardTitle>
            <MDBCardText style={{color:'GrayText'}}>
              Deadline: {taskDeadline}
            </MDBCardText>
          </MDBCardBody>
        </MDBCol>
      </MDBRow>
    </MDBCard>
  );
}