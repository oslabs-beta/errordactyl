import { VSCodeButton } from '@vscode/webview-ui-toolkit/react';

interface RunBtnProps {
  selected: boolean
}

// buttons to run either batch endpoints or selected
export default function RunButtons() {
  return (
    <div>
      <VSCodeButton>Run All</VSCodeButton>
      <VSCodeButton>Run Selected</VSCodeButton>
    </div>
    
  )
}