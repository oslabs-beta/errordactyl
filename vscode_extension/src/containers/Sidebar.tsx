import Routes from './Routes';
import ParseButton from '../components/ParseButton';
import RunButtons from '../components/RunButtons';
import { endpoint } from '../../types';
import { useState, useEffect } from 'react';
// mock data for testing purposes
import { MOCK_ROUTES } from '../data/api';
import { VSCodeAPI } from '../vsCodeApi';

// main app to display in the sidebar provider html
export default function SideBar() {
  const [routes, setRoutes] = useState<endpoint[]>([]);
  const [selected, setSelected] = useState([]);

  // function to retrieve endpoints from extension storage
  const getRoutes = () => {
    VSCodeAPI.postMessage({action: 'get-initial-state'});
  };
  // function to send requests
  const runRoutes = () => {

  }

  //useEffects to listener
  useEffect(() => {
    VSCodeAPI.onMessage((event) => {
      console.log('message heard');
      const message = event.data;

      switch (message.action) {
        case 'parse':
          console.log('message received by the sidebar');
					// message should come back with routes array
          setRoutes(message.data);
          break;
      }
    });
    // retrieve initial state
    getRoutes();
  }, [])

  return (
    <div>
      {routes.length ? <Routes endpoints={routes}/> : <p>No routes configured.</p>}
      <ParseButton />
      <RunButtons />
    </div>
  )
}