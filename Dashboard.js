/*import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
const Dashboard = () => {
  return (
    <section>
      <h1>Welcome to the Dashboard</h1>
      <p>Please complete your contact details.</p>
      <Link to="/contact">Complete Contact Details</Link>
    </section>
  );
};

export default Dashboard;*/



import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import './Dashboard.css';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);

  useEffect(() => {
    const checkEmailVerification = async () => {
      const user = firebase.auth().currentUser;

      if (user) {
        await user.reload();

        if (user.emailVerified) {
          setEmailVerified(true);
          setMessage('Email verified. You can access the dashboard.');
        } else {
          setEmailVerified(false);
          setMessage(
            'Email not verified. Please check your email and verify your account.'
          );
        }
      } else {
        // Use window.location.href to navigate to the login page
        window.location.href = '/login';
      }

      setIsLoading(false);
    };

    checkEmailVerification();
  }, []);

  const logoutHandler = async () => {
    await firebase.auth().signOut();
    // Use window.location.href to navigate to the login page
    window.location.href = '/login';
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section>
      <h1>Dashboard</h1>
      {message && <p>{message}</p>}
      {emailVerified && (
        <div>
          <p>You are logged in and your email is verified.</p>
          <button onClick={logoutHandler}>Logout</button>
        </div>
      )}
    </section>
  );
};

export default Dashboard;


