import Routes from './Routes';
import ParseButton from '../components/ParseButton';
import RunButtons from '../components/RunButtons';
import { endpoint } from '../../types';
import { useState, useEffect } from 'react';
// mock data for testing purposes
import { MOCK_ROUTES } from '../data/api';
// main app to display in the sidebar provider html
import { VSCodeAPI } from '../vscodeapi';

export default function SideBar() {
  const [routes, setRoutes] = useState<endpoint[]>([]);
  const [selected, setSelected] = useState([]);
  const [stateTest, setStateTest] = useState('test');

  // function to retrieve endpoints from... somewhere
  const getRoutes = () => {
    setRoutes(MOCK_ROUTES);
  };
  // function to send requests
  const runRoutes = () => {

  }

  //useEffects to listener
  useEffect(() => {
    window.addEventListener('message', event => {
      console.log('message heard');
      const message = event.data;
  
      switch (message.name) {
        case 'test':
          console.log('message received by the sidebar');
          VSCodeAPI.setState(message.data);
          setStateTest(VSCodeAPI.getState());
          break;
        case 'get-routes':
          getRoutes();
          break;
      }
    });
  }, [])


  return (
    <div>
      {routes.length ? <Routes endpoints={routes}/> : <p>No routes configured.</p>}
      <ParseButton />
      <RunButtons />
      {stateTest}
    </div>
  )
}