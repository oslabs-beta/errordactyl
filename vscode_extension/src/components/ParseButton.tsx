import { Dispatch, SetStateAction } from 'react';
import { VSCodeButton } from '@vscode/webview-ui-toolkit/react';
import { VSCodeAPI } from '../utils/vsCodeApi';
import { endpoint } from '../../types';
import { VscSearch } from 'react-icons/vsc';
import { RxReset } from 'react-icons/rx';

interface ParseButtonProps {
  setConfigInit: Dispatch<SetStateAction<boolean>>,
  setRoutes: Dispatch<SetStateAction<Array<endpoint>>>
}

export default function ParseButton({ setConfigInit, setRoutes }: ParseButtonProps) {

  const testHandler = () => {
    VSCodeAPI.postMessage({ action: "parse" });
  }

  const resetHandler = () => {
    setConfigInit(false);
    setRoutes([]);
    VSCodeAPI.postMessage({action: "reset"});
  }

  return (
    <div>
      <VSCodeButton id="parse-button" onClick={testHandler}>
        <VscSearch/>
        <span id="parse-tooltip">Search for routes</span>
      </VSCodeButton>
      <VSCodeButton id="parse-button" onClick={resetHandler}>
        <RxReset/>
        <span id="parse-tooltip">Reset Extension</span>
        </VSCodeButton>
    </div>
  )
}