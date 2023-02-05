import { VSCodeButton } from '@vscode/webview-ui-toolkit/react';
import { VSCodeAPI } from '../vsCodeApi';
import { config } from "../../types"

interface ParseButtonProps {
  setConfigInit: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ParseButton({ setConfigInit }: ParseButtonProps) {

  const testHandler = () => {
    // setConfigInit(false);
    VSCodeAPI.postMessage({ action: "parse" });
  }

  return (
    <>
      <VSCodeButton appearance="primary" onClick={testHandler}>Parse</VSCodeButton>
      <VSCodeButton appearance="primary" onClick={() => setConfigInit(false)}>Reset</VSCodeButton>
    </>
  )
}