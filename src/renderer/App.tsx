import React from 'react';
import { ipcRenderer } from 'electron';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';

// const remote = require('electron').remote;
// const dialog = remote.require('dialog');

const Start = () => {
  React.useEffect(() => {
    // ipcRenderer.addListener
    // ipcRenderer.on('store-data', function (event, store) {
    //   console.log(store);
    // });
  }, []);

  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1>Cebulionetes - free k8 gui</h1>
      <div className="Hello">Select k8 config</div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />
      </Routes>
    </Router>
  );
}
