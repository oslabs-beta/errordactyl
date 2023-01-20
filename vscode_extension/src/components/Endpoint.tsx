// component containing information and config for a specific endpoint
import { endpoint } from '../../types';
import Config from './Config';
import Response from './Response';
import { VSCodeButton } from '@vscode/webview-ui-toolkit/react';
import { useState } from 'react';

interface EndpointProps {
  endpoint: endpoint
};

export default function Endpoint({ endpoint }: EndpointProps) {
  const [configVisible, setConfigVisible] = useState(false);
  const [responseVisible, setResponseVisible] = useState(false);
  // function to update body passing down to Config
  // onClick handlers to conditionally render Config or Response components
  const showConfig = () => {
    setConfigVisible(!configVisible);
  }
  const showResponse = () => {
    setResponseVisible(!responseVisible);
  }

  return (
    <div>
      <span className="endpoint-label">{endpoint.method}: </span>{endpoint.path}
      <div className="endpoint-btns">
        <VSCodeButton onClick={showConfig}>Config</VSCodeButton>
        {configVisible && <Config path={endpoint.path}/>}
        <VSCodeButton onClick={showResponse}>Response</VSCodeButton>
        {responseVisible && <Response />}
      </div>
      
    </div>
  )
}