import { VSCodeButton } from '@vscode/webview-ui-toolkit/react';
import { MdArrowForwardIos, MdDoubleArrow } from 'react-icons/md';

interface RunBtnProps {
  selected: boolean
}

// buttons to run either batch endpoints or selected
export default function RunButtons() {
  return (
    <div>
      <VSCodeButton id="run-button">
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