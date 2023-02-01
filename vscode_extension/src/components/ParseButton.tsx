import { VSCodeButton } from '@vscode/webview-ui-toolkit/react';
import { VSCodeAPI } from '../vscodeapi';

export default function ParseButton() {
  
  const testHandler = () => {
    // const vscode = acquireVsCodeApi();
    VSCodeAPI.postMessage({action: "read-something-test"});
  }

  return (
    <VSCodeButton appearance="primary" onClick={testHandler}>Parse</VSCodeButton>
  )
}