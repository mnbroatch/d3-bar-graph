import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import App from './Components/App';

const store = {a: 'a', b: 'b'};

render(
  <App store={store} />,
  document.getElementById('app')
);
