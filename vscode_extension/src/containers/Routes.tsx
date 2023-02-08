// container to hold all endpoint components
// have to pass in array of endpoint objects
import { Dispatch, SetStateAction } from 'react';
import { endpoint } from '../../types';
import Endpoint from '../components/Endpoint';
import ParseButton from '../components/ParseButton';
import RunButtons from '../components/RunButtons';

interface RoutesProps {
  setConfigInit: Dispatch<SetStateAction<boolean>>,
  setSelected: Dispatch<SetStateAction<Array<endpoint>>>,
  selectedRoutes: endpoint[],
  endpoints: endpoint[]
}

export default function Routes({ setConfigInit, setSelected, selectedRoutes, endpoints}: RoutesProps) {
  // render array of endpoint components
  const routes = endpoints.map((endpoint, i) => {
    return (
      <Endpoint setSelected={setSelected} selectedRoutes={selectedRoutes} endpoint={endpoint} key={i}/>
    )
  })
  return (
    <div>
      <div className='routes-header'>
        <h1>Routes</h1>
        <ParseButton setConfigInit={setConfigInit}/>
      </div>
      {routes}
      <RunButtons selectedRoutes={selectedRoutes} />
    </div>
  )
}