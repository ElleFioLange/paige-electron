import React from 'react';
import { render } from 'react-dom';
import App from './App';
import config from './config';

const { username, data } = config;

render(
  <App username={username} data={data} />,
  document.getElementById('root')
);
