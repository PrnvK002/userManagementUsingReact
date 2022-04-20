import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import UserAuth from "./context/context";


ReactDOM.render(
  <React.StrictMode>
    <UserAuth>
      <App />
    </UserAuth>
  </React.StrictMode>,
  document.getElementById('root')
);
