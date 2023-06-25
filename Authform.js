/*import React, { useState, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { AuthContext } from './AuthContext';
import './Authform.css';

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current?.value;

    setIsLoading(true);
    setError(null);

    if (!isLogin && enteredPassword !== enteredConfirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    try {
      if (isLogin) {
        const response = await firebase.auth().signInWithEmailAndPassword(enteredEmail, enteredPassword);
        const user = response.user;
        const expirationTime = new Date().getTime() + 3600000; // Set expiration time to 1 hour from now
        authCtx.login(user.uid, expirationTime);
        navigate('/dashboard'); // Redirect to the dashboard or any desired page
      } else {
        const response = await firebase.auth().createUserWithEmailAndPassword(enteredEmail, enteredPassword);
        const user = response.user;
        const expirationTime = new Date().getTime() + 3600000; // Set expiration time to 1 hour from now
        authCtx.login(user.uid, expirationTime);
        navigate('/dashboard'); // Redirect to the dashboard or any desired page
      }
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  };

  return (
    <div className="container">
      <div className="box">
        <h1 className="heading">{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input className="input" type="email" id="email" required ref={emailInputRef} />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input className="input" type="password" id="password" required ref={passwordInputRef} />
          </div>
          {!isLogin && (
            <div className="form-group">
              <label className="label" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                className="input"
                type="password"
                id="confirmPassword"
                required
                ref={confirmPasswordInputRef}
              />
            </div>
          )}
          {error && <p className="error">{error}</p>}
          <div className="button">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <button type="submit">{isLogin ? 'Login' : 'Create Account'}</button>
            )}
          </div>
        </form>
        <div className="switch">
          <p>{isLogin ? 'Don’t have an account?' : 'Already have an account?'}</p>
          <Link to="#" onClick={switchAuthModeHandler}>
            {isLogin ? 'Sign up' : 'Login'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;*/


import React, { useState, useRef, useContext } from 'react';
import './Authform.css';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


import AuthContext from './AuthContext';

const AuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);

    try {
      let response;

      if (isLogin) {
        response = await firebase
          .auth()
          .signInWithEmailAndPassword(enteredEmail, enteredPassword);
      } else {
        response = await firebase
          .auth()
          .createUserWithEmailAndPassword(enteredEmail, enteredPassword);
        
        const user = response.user;

        const expiresIn = 3600; // 1 hour in seconds
        const expirationTime = new Date().getTime() + expiresIn * 1000;

        await user.sendEmailVerification({
          url: 'https://your-verification-url.com', // Replace with your own verification URL
        });

        setMessage('User created successfully. Please check your email for verification.');
        setIsLoading(false);
        setIsLogin(true);
        return;
      }

      const user = response.user;

      if (user.emailVerified) {
        const expiresIn = 3600; // 1 hour in seconds
        const expirationTime = new Date().getTime() + expiresIn * 1000;

        const idToken = await user.getIdToken();

        authCtx.login(idToken);

        localStorage.setItem('token', idToken);
        localStorage.setItem('expirationTime', expirationTime);

        navigate('/dashboard');
      } else {
        setMessage('Please verify your email before logging in.');
        setIsLoading(false);
      }
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <section>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label>Email</label>
          <input type="email" required ref={emailInputRef} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" required ref={passwordInputRef} />
        </div>
        <div>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button type="button" onClick={switchAuthModeHandler}>
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {message && <p>{message}</p>}
    </section>
  );
};

export default AuthForm;


