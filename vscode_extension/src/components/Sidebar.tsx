import Routes from '../containers/Routes';
import ParseButton from './ParseButton';
import RunButtons from './RunButtons';
import { endpoint } from '../../types';
import { useState, useEffect } from 'react';
// main app to display in the sidebar provider html

export default function SideBar() {
  const [routes, setRoutes] = useState([]);
  const [selected, setSelected] = useState([]);
  // function to retrieve endpoints from... somewhere
  const getRoutes = () => {

  };

  // function to send requests
  const runRoutes = () => {

  }

  return (
    <div>
      {routes.length ? <p>No routes configured.</p> : <Routes endpoints={routes}/>}
      <ParseButton />
      <RunButtons />
    </div>
  )
}