import Routes from '../containers/Routes';
import ParseButton from '../components/ParseButton';
import { endpoint } from '../../types';
import { useState, useEffect } from 'react';
// main app to display in the sidebar provider html

export default function SideBar() {
  const [routes, setRoutes] = useState([]);
  // function to retrieve endpoints from... somewhere
  const getRoutes = () => {

  };

  return (
    <div>
      {routes.length ? <p>No routes configured.</p> : <Routes endpoints={routes}/>}
      <ParseButton />
    </div>
  )
}