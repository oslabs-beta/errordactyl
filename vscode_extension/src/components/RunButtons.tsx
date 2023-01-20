import { VSCodeButton } from '@vscode/webview-ui-toolkit/react';

interface RunBtnProps {
  selected: boolean
}

// buttons to run either batch endpoints or selected
export default function RunButtons() {
  return (
    <div>
      <VSCodeButton appearance="secondary">Run All</VSCodeButton>
      <VSCodeButton appearance="secondary">Run Selected</VSCodeButton>
    </div>
    
  )
}