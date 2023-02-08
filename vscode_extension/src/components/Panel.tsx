import { useState } from 'react';
import { VSCodePanels, VSCodePanelTab, VSCodePanelView } from "@vscode/webview-ui-toolkit/react";
import Config from './Config';
import Response from './Response';


export default function Panel() {


	return(
		<VSCodePanels>
			<VSCodePanelTab id="tab-1">Request</VSCodePanelTab>
			<VSCodePanelTab id="tab-2">Response</VSCodePanelTab>
			<VSCodePanelView id="view-1"><Config path="" /></VSCodePanelView>
			<VSCodePanelView id="view-2"><Response /></VSCodePanelView>
		</VSCodePanels>
	)
}