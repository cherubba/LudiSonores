import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom'
import { CustomContextProvider } from './customContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CustomContextProvider>
    <Router>
      <App />
    </Router>
  </CustomContextProvider>
);



