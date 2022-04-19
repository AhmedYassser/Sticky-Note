import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'jquery/dist/jquery.min.js'
import '@popperjs/core/dist/umd/popper.min.js'
import { BrowserRouter } from 'react-router-dom';


ReactDOM.render(
  
    <BrowserRouter>
    <App />
    </BrowserRouter>
  ,
  document.getElementById('root')
);


