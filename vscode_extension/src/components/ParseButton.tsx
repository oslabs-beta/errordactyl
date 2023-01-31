import { VSCodeButton } from '@vscode/webview-ui-toolkit/react';

interface vscode {
  postMessage(message: any): void;
}

declare const vscode: vscode;

export default function ParseButton() {
  
  const testHandler = () => {
    // const vscode = acquireVsCodeApi();
    vscode.postMessage({action: "read-something-test"});
  }

  return (
    <VSCodeButton appearance="primary" onClick={testHandler}>Parse</VSCodeButton>
  )
}