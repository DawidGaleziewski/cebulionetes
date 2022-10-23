import { Channels } from 'main/preload';
import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
  const [k8context, setK8context] = React.useState(null);
  const [kubeConfig, setkubeConfig] = useMainProcessStateOnMount(
    'pass-k8-config',
    null
  );

  const [podsListing, setPodsListing] = useMainProcessStateOnMount(
    'kubectl-get-pods',
    null
  );

  const refreshData = () => {
    window.electron.ipcRenderer.sendMessage('pass-k8-config');
    window.electron.ipcRenderer.sendMessage('kubectl-get-pods');
  };

  console.log('main cube config is ', kubeConfig);
  console.log('podsListing:', podsListing);
  return (
    <Container sx={{ mt: 12 }} maxWidth="lg">
      <Typography variant="h3" component="h2">
        Cebulionetes: open k8 gui{' '}
        <Button onClick={() => refreshData()} variant="outlined">
          Refresh
        </Button>
      </Typography>

      {kubeConfig ? (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Context</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={k8context}
            label="context"
            onChange={(event) => setK8context(event.target.value)}
            defaultValue={kubeConfig.contexts.find(
              (context) => context.name === kubeConfig['current-context']
            )}
          >
            {kubeConfig.contexts.map((context) => {
              return (
                <MenuItem key={context.name} value={context.name}>
                  {context.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      ) : null}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Working/All containers</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {podsListing?.items
              ? podsListing?.items.map((pod) => {
                  return (
                    <TableRow
                      key={pod.metadata.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {pod.metadata.name}
                      </TableCell>
                      <TableCell align="right">
                        {
                          pod.status.conditions.filter(
                            (item) => item.status === 'True'
                          ).length
                        }
                        /{pod.status.conditions.length}
                      </TableCell>
                    </TableRow>
                  );
                })
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
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
