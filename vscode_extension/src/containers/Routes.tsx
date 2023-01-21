// container to hold all endpoint components
// have to pass in array of endpoint objects
import { endpoint } from '../../types';
import Endpoint from '../components/Endpoint';

interface RoutesProps {
  endpoints: endpoint[]
}

export default function Routes({ endpoints }: RoutesProps) {
  // render array of endpoint components
  const routes = endpoints.map((endpoint, i) => {
    return (
      <Endpoint endpoint={endpoint} key={i}/>
    )
  })
  return (
    <div>
      <h1>Routes</h1>
      {routes}
    </div>
  )
}