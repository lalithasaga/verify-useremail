import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getDatabase, ref, set } from "firebase/database";
import './ContactDetailsForm.css';

const ContactDetailsForm = () => {
  const [fullName, setFullName] = useState('');
  const [profilePhotoUrl, setProfilePhotoUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleProfilePhotoUrlChange = (event) => {
    setProfilePhotoUrl(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Perform any necessary form validation or data processing here

    // Initialize Firebase Realtime Database
    const database = getDatabase();

    // Reference to the "users" collection in the database
    const usersRef = ref(database, "users");

    try {
      // Save the submitted data to the database
      await set(usersRef, {
        fullName: fullName,
        profilePhotoUrl: profilePhotoUrl,
      });

      // Success: Redirect the user to a new page or perform any other action
      // Replace '/success' with your desired success page route
      window.location.href = '/success';
    } catch (error) {
      // Handle error cases
      // Display error message or take appropriate action
      setErrorMessage('An error occurred while submitting the form.');
    }
  };

  return (
    <div>
      <h3>Complete Your Contact Details</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={handleFullNameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="profilePhotoUrl">Profile Photo URL</label>
          <input
            type="text"
            id="profilePhotoUrl"
            value={profilePhotoUrl}
            onChange={handleProfilePhotoUrlChange}
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit">Submit</button>
          <Link to="/dashboard">
            <button type="button">Cancel</button>
          </Link>
        </div>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default ContactDetailsForm;
