import { VSCodeButton } from '@vscode/webview-ui-toolkit/react';
import { VSCodeAPI } from '../vsCodeApi';
import { VscSearch } from 'react-icons/vsc';
import { RxReset } from 'react-icons/rx';

interface ParseButtonProps {
  setConfigInit: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ParseButton({ setConfigInit }: ParseButtonProps) {

  const testHandler = () => {
    VSCodeAPI.postMessage({ action: "parse" });
  }

  const resetHandler = () => {
    setConfigInit(false);
    VSCodeAPI.postMessage({action: "reset"});
  }

  return (
    <div>
      <VSCodeButton id="parse-button" onClick={testHandler}>
        <VscSearch/>
        <span id="parse-tooltip">Search for routes</span>
      </VSCodeButton>
      <VSCodeButton id="parse-button" onClick={resetHandler}><RxReset/></VSCodeButton>
    </div>
  )
}