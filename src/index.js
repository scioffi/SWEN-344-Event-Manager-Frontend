import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

window.events = {
	hostname: process.env.NODE_ENV === "production" ? "http://webeng.stephencioffi.com:8080" : "http://localhost:8080"
};

ReactDOM.render(<App />, document.getElementById('page-content'));
registerServiceWorker();
