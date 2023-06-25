import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/compat/app';
import { initializeApp } from 'firebase/compat/app';
import 'firebase/compat/auth';
import App from './App';

const firebaseConfig = {
  apiKey: "AIzaSyDx0SVoBQfPlrxT68IwmNR3OKKdQdp-1Yw",
  authDomain: "expense-tracker-9da4c.firebaseapp.com",
  databaseURL: "https://expense-tracker-9da4c-default-rtdb.firebaseio.com",
  projectId: "expense-tracker-9da4c",
  storageBucket: "expense-tracker-9da4c.appspot.com",
  messagingSenderId: "640370122741",
  appId: "1:640370122741:web:8fd9a5346ee2a7bbf10abc"
};
firebase.initializeApp(firebaseConfig);

const rootElement = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
