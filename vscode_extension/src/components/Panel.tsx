import { useState } from 'react';
import { VSCodePanels, VSCodePanelTab, VSCodePanelView } from "@vscode/webview-ui-toolkit/react";
import Request from './Request';
import Response from './Response';


export default function Panel() {


	return(
		<VSCodePanels className="panel">
			<VSCodePanelTab id="tab-1">Request</VSCodePanelTab>
			<VSCodePanelTab id="tab-2">Response</VSCodePanelTab>
			<VSCodePanelView id="view-1"><Request path="" /></VSCodePanelView>
			<VSCodePanelView id="view-2"><Response /></VSCodePanelView>
		</VSCodePanels>
	)
}