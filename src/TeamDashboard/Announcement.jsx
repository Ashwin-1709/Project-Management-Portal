import React, { useContext, useState } from 'react';
import './Announcement.css';

function Announcement() {
    return (

      <div className='Wrapper'>
        <div className="Input"  mode="outlined">
          <input type="text" id="input" className="Input-text" placeholder="Announce Something to Class" />
          <label htmlFor="input" className="Input-label">Announcement</label>
        </div>
      </div>
    );
  }

export default Announcement;