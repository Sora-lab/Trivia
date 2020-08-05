import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as firebase from "firebase/app";
import * as serviceWorker from './serviceWorker';
const firebaseConfig = {
  apiKey: "AIzaSyA-9XWFknd2ifYkUa6EO8p0u87RKIv2SgE",
  authDomain: "ross-trivia.firebaseapp.com",
  databaseURL: "https://ross-trivia.firebaseio.com",
  projectId: "ross-trivia",
  storageBucket: "ross-trivia.appspot.com",
  messagingSenderId: "531832313839",
  appId: "1:531832313839:web:25fd0ab4373c10a5e5c81a",
  measurementId: "G-VG041GXPPJ"
};
firebase.initializeApp(firebaseConfig);
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
