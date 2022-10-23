import { Channels } from 'main/preload';
import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';

const useMainProcessStateOnMount = <IInitialType, IResponseType>(
  channelName: Channels,
  initialState: IInitialType
) => {
  const [state, setState] = React.useState(initialState);
  React.useEffect(() => {
    window.electron.ipcRenderer.once(channelName, (arg) => {
      setState(arg);
    });
  }, [setState, channelName]);

  return [state, setState];
};

const Start = () => {
  const [kubeConfig, setCubeConfig] = useMainProcessStateOnMount(
    'pass-k8-config',
    null
  );

  console.log('main cube config is ', kubeConfig);
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
