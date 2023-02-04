import Routes from './Routes';
import ParseButton from '../components/ParseButton';
import RunButtons from '../components/RunButtons';
import SetupWizard from '../components/SetupWizard';
import { endpoint, config } from '../../types';
import { useState, useEffect } from 'react';
// mock data for testing purposes
import { MOCK_ROUTES } from '../data/api';
import { VSCodeAPI } from '../vsCodeApi';

// main app to display in the sidebar provider html
export default function SideBar() {
  const [routes, setRoutes] = useState<endpoint[]>([]);
  const [selected, setSelected] = useState([]);
  const [stateTest, setStateTest] = useState('test');
  const [config, setConfig] = useState(false);

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
        case 'config':
          setConfig(true);
          setRoutes(message.data.routes);
      }
    });
    // retrieve initial state
    getRoutes();
  }, [])

  return (
    <div className='sidebar'>
      {config ? <ParseButton setConfig={setConfig}/> : <SetupWizard/>}
    </div>
  )
}