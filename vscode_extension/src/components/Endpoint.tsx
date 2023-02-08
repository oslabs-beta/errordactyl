// component containing information and config for a specific endpoint
import { endpoint } from '../../types';
import { VSCodeButton, VSCodeCheckbox } from '@vscode/webview-ui-toolkit/react';
import { useState } from 'react';
import Panel from './Panel';

interface EndpointProps {
  endpoint: endpoint
};

export default function Endpoint({ endpoint }: EndpointProps) {
  const [panel, showPanel] = useState(false);
  // function to update body passing down to Config
  // onClick handlers to conditionally render Config or Response components
  // const showConfig = () => {
  //   setConfigVisible(!configVisible);
  // }
  // const showResponse = () => {
  //   setResponseVisible(!responseVisible);
  // }

  //with panel wrapper

  return (
    <div>
      <div className='endpoint-label'>
        <VSCodeCheckbox>{endpoint.method}: {endpoint.path}
        </VSCodeCheckbox>
        <VSCodeButton id="show-panel-button" onClick={()=>(showPanel(!panel))}>+</VSCodeButton>
      </div>
      {panel? <Panel/> : null}
    </div>
  )
}