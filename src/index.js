import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom'
import { CustomContextProvider } from './customContext';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CustomContextProvider>
    <Router>
      <App />
    </Router>
  </CustomContextProvider>
);


