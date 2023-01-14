import { VSCodeButton } from '@vscode/webview-ui-toolkit/react';
import { EXTENSION_CONSTANT } from '../constant';

export default function ParseButton() {
  return (
    <VSCodeButton id={EXTENSION_CONSTANT.ELEMENT_IDS.PARSE_BUTTON}>Parse</VSCodeButton>
  )
}