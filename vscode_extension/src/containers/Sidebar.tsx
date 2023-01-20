import Routes from './Routes';
import ParseButton from '../components/ParseButton';
import RunButtons from '../components/RunButtons';
import { endpoint } from '../../types';
import { useState, useEffect } from 'react';
// mock data for testing purposes
import { MOCK_ROUTES } from '../data/api';
// main app to display in the sidebar provider html

export default function SideBar() {
  const [routes, setRoutes] = useState<endpoint[]>([]);
  const [selected, setSelected] = useState([]);
  // function to retrieve endpoints from... somewhere
  const getRoutes = () => {
    setRoutes(MOCK_ROUTES);
  };
  // function to send requests
  const runRoutes = () => {

  }

  //useEffects to run API calls
  useEffect(() => {
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