import { VSCodeTextArea, VSCodeTextField, VSCodeButton } from '@vscode/webview-ui-toolkit/react'

interface ConfigProps {
  path: string
}

// config box for endpoint components
export default function Config({ path }: ConfigProps ) {
  // editable text box for options: body, endpoint url
  // pass data back to parent Endpoint component via props
  return (
    <div>
      <VSCodeTextField placeholder={path}>Endpoint URL</VSCodeTextField>
      <VSCodeTextArea>Request Body</VSCodeTextArea>
      <VSCodeButton appearance="primary">Save</VSCodeButton>
    </div>
  )
}