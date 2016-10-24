import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import App from './Components/App';
import './Styles/main.scss';

render(
  <App />,
  document.getElementById('app')
);
