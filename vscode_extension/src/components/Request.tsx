// import React from 'react';
import { VSCodeTextArea, VSCodeTextField, VSCodeButton } from '@vscode/webview-ui-toolkit/react'

interface ConfigProps {
  path: string,
	body?: Record<string, unknown>
}

// config box for endpoint components
export default function Request({ path, body }: ConfigProps ) {
  // editable text box for options: body, endpoint url
  // pass data back to parent Endpoint component via props

	// format body
	let bodyData = '';
	for (const key in body) {
		bodyData += `${key}: ${body[key]}\n`;
	}

  return (
    <div>
      <VSCodeTextField placeholder={path}>Endpoint URL</VSCodeTextField>
      <VSCodeTextArea placeholder={bodyData}>Request Body</VSCodeTextArea>
      <VSCodeButton appearance="primary">Save</VSCodeButton>
    </div>
  )
}