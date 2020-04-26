import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core';

import App from './app';
import theme from './theme';

ReactDOM.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
  document.getElementById('root')
);
