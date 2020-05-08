import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Root from './components/root';

const root = document.getElementById('react-root');

render(
  <Router>
    <Root />
  </Router>,
  root,
);
