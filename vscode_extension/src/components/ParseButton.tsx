import { VSCodeButton } from '@vscode/webview-ui-toolkit/react';
import { VSCodeAPI } from '../vsCodeApi';
import {config} from "../../types"

export default function ParseButton({setConfigInit}) {
  
  const testHandler = () => {
    // setConfigInit(false);
    VSCodeAPI.postMessage({action: "parse"});
  }

  return (
    <VSCodeButton appearance="primary" onClick={testHandler}>Parse</VSCodeButton>
  )
}