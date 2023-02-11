import { VSCodeButton } from '@vscode/webview-ui-toolkit/react';
import { MdArrowForwardIos, MdDoubleArrow } from 'react-icons/md';
import { endpoint } from '../../types';
import { VSCodeAPI } from '../utils/vsCodeApi';

interface RunBtnProps {
  selectedRoutes: endpoint[]
}

// buttons to run either batch endpoints or selected
export default function RunButtons({selectedRoutes}:RunBtnProps) {

  const handleSelectClick = () => {
    console.log("selected Routes", selectedRoutes);
  }

  const handleRunAllClick = () => {
    VSCodeAPI.postMessage({action: 'test-routes'});
  }
  
  return (
    <div id="run-btn-wrapper">
      <VSCodeButton id="run-button" onClick={() => handleSelectClick()}>
        <MdArrowForwardIos/>
        <span id="tooltip">Test selected routes</span>
      </VSCodeButton>
      <VSCodeButton id="run-button" onClick={() => handleRunAllClick()}>
        <MdDoubleArrow/>
        <span id="tooltip">Test all routes</span>  
      </VSCodeButton>
    </div>
    
  )
}