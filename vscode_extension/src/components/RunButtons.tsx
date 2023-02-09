import { VSCodeButton } from '@vscode/webview-ui-toolkit/react';
import { MdArrowForwardIos, MdDoubleArrow } from 'react-icons/md';
import { endpoint } from '../../types';

interface RunBtnProps {
  selectedRoutes: endpoint[]
}

// buttons to run either batch endpoints or selected
export default function RunButtons({selectedRoutes}:RunBtnProps) {

  const handleClick = () => {
    console.log("selected Routes", selectedRoutes);
  }
  return (
    <div id="run-btn-wrapper">
      <VSCodeButton id="run-button" onClick={() => handleClick()}>
        <MdArrowForwardIos/>
        <span id="tooltip">Test selected routes</span>
      </VSCodeButton>
      <VSCodeButton id="run-button">
        <MdDoubleArrow/>
        <span id="tooltip">Test all routes</span>  
      </VSCodeButton>
    </div>
    
  )
}