import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Update() {
  const [id, setID] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [checkbox, setCheckbox] = useState(false);

  useEffect(() => {
    // setID('id');
    // setFirstName('First Name');
    // setLastName('Last Name');
    // setCheckbox('Checkbox Value');
  }, []);

  const updateAPIData = () => {
    axios
      .put(`https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData/${id}`, {
        firstName,
        lastName,
        checkbox,
      })
      .then(() => {});
  };
  return (
    <div>
      <label>First Name</label>
      <input
        placeholder='First Name'
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />

      <label>Last Name</label>
      <input
        placeholder='Last Name'
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      <button type='submit' onClick={updateAPIData}>
        Update
      </button>
    </div>
  );
}
