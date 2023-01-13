// component containing information and config for a specific endpoint
import { endpoint } from '../../types';
import Config from './Config';

export default function Endpoint(endpoint: endpoint) {
  // function to update body passing down to Config
  // onClick handlers to conditionally render Config or Response components
  return (
    <div>
      <vscode-button>Config</vscode-button>
      <button>Response</button>
    </div>
  )
}