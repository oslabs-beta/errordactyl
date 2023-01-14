// component containing information and config for a specific endpoint
import { endpoint } from '../../types';
import Config from './Config';
import { VSCodeButton } from '@vscode/webview-ui-toolkit/react';

interface EndpointProps {
  endpoint: endpoint
};

export default function Endpoint({ endpoint }: EndpointProps) {
  // function to update body passing down to Config
  // onClick handlers to conditionally render Config or Response components
  return (
    <div>
      <VSCodeButton>Config</VSCodeButton>
      <VSCodeButton>Response</VSCodeButton>
    </div>
  )
}