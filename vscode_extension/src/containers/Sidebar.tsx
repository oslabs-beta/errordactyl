import Routes from './Routes';
import Initialize from './Initalize';
import { endpoint } from '../../types';
import { useState, useEffect } from 'react';
import { VSCodeAPI } from '../utils/vsCodeApi';


// main app to display in the sidebar provider html
export default function SideBar() {
  const [routes, setRoutes] = useState<endpoint[]>([]);
  const [selected, setSelected] = useState<endpoint[]>([]);
  const [configInit, setConfigInit] = useState(false);

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
        case 'config':
          message.data? setRoutes(message.data) : null;
          setConfigInit(true);
      }
    });
    // retrieve initial state
    getRoutes();
  }, [])

  return (
    <div className='sidebar'>
      {configInit? routes && <Routes setConfigInit={setConfigInit} setSelected={setSelected} selectedRoutes={selected} setRoutes={setRoutes} endpoints={routes}/> : <Initialize />}
    </div>
  )
}