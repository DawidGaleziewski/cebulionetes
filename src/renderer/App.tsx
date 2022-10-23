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
    window.electron.ipcRenderer.on(channelName, (arg) => {
      setState(arg);
    });
  }, [setState, channelName]);

  return [state, setState];
};

const Start = () => {
  const [kubeConfig] = useMainProcessStateOnMount('pass-k8-config', null);

  const [podsListing] = useMainProcessStateOnMount('kubectl-get-pods', null);

  console.log('main cube config is ', kubeConfig);
  console.log('podsListing:', podsListing);
  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1>Cebulionetes - free k8 gui</h1>
      <div className="Hello">Select k8 config</div>
      {podsListing?.items
        ? podsListing?.items.map((pod) => {
            return <div>Name: {pod.metadata.name}, creation time stamp: </div>;
          })
        : null}
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
