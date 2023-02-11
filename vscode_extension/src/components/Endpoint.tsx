// component containing information and config for a specific endpoint
import { endpoint } from '../../types';
import { VSCodeButton, VSCodeCheckbox } from '@vscode/webview-ui-toolkit/react';
import { Dispatch, SetStateAction, useState } from 'react';
import Panel from '../containers/ConfigPanel';

interface EndpointProps {
  setSelected: Dispatch<SetStateAction<Array<endpoint>>>,
  selectedRoutes: endpoint[],
  endpoint: endpoint
};

export default function Endpoint({ setSelected, selectedRoutes, endpoint }: EndpointProps) {
  const [panel, showPanel] = useState(false);

  //handle checked endpoints
  const handleChange = (event:any) => {
    //if checked, add to selected array
    if (event.target.checked) {
      setSelected(state => [...state, endpoint]);
    } 
    //if unchecked, remove endpoint from selected array
    else {
      selectedRoutes.forEach((route, i) => {
        if (route === endpoint) {
          const firstHalf = selectedRoutes.slice(0,i+1);
          const secondHalf = selectedRoutes.slice(i+1);
          firstHalf.pop();
          const newSelected = firstHalf.concat(secondHalf);
          setSelected(newSelected);
        }
      });
    }
  };

  return (
    <div>
      <div className='endpoint-label'>
        <VSCodeCheckbox onChange={(event:any) => handleChange(event)}>{endpoint.method}: {endpoint.path}</VSCodeCheckbox>
        <VSCodeButton id="show-panel-button" onClick={()=>(showPanel(!panel))}>+</VSCodeButton>
      </div>
      {panel? <Panel endpoint={endpoint}/> : null}
    </div>
  );
}