import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';


import './index.css';
import App from './App.jsx'

ReactDOM.render(
  <CookiesProvider>
    <App />
  </CookiesProvider>,
  document.getElementById('root')
);

