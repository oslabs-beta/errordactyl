import { VSCodeButton } from '@vscode/webview-ui-toolkit/react';
import { VSCodeAPI } from '../vsCodeApi';

export default function ParseButton() {
  
  const testHandler = () => {
    // const vscode = acquireVsCodeApi();
    VSCodeAPI.postMessage({action: "parse"});
  }

  return (
    <VSCodeButton appearance="primary" onClick={testHandler}>Parse</VSCodeButton>
  )
}