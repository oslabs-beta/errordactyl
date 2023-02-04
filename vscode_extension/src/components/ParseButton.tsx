import { VSCodeButton } from '@vscode/webview-ui-toolkit/react';
import { VSCodeAPI } from '../vsCodeApi';
import {config} from "../../types"

export default function ParseButton({setConfig}) {
  
  const testHandler = () => {
    setConfig(false);
    VSCodeAPI.postMessage({action: "reset"});
  }

  return (
    <VSCodeButton appearance="primary" onClick={testHandler}>Parse</VSCodeButton>
  )
}