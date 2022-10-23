import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';

// const remote = require('electron').remote;
// const dialog = remote.require('dialog');

const Start = () => {
  React.useEffect(() => {
    // window.electron.ipcRenderer.sendMessage('pass-k8-config', (args) => {
    //   console.log(args);
    // });
    // ipcRenderer.on('pass-k8-config', (event, args) => {
    //   console.log(event);
    // });
    // console.log('#############store', window.electron.store.get('foo'));
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
