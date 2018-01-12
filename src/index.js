
// Get React library
import React from 'react';
import ReactDOM from 'react-dom';

// Get child components
import App from './App.react';

// Get styles styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './theme.css';
import './index.css';
import 'toastr/build/toastr.css';

// Get service worker
import registerServiceWorker from './registerServiceWorker';

// Render entry point
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
