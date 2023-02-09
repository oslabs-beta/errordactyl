import { useState } from 'react';
import { VSCodePanels, VSCodePanelTab, VSCodePanelView } from "@vscode/webview-ui-toolkit/react";
import Request from '../components/Request';
import Response from '../components/Response';
import { endpoint } from '../../types';

interface PanelProps {
  endpoint: endpoint
}

export default function Panel({ endpoint }: PanelProps) {


	return(
		<VSCodePanels className="panel">
			<VSCodePanelTab id="tab-1">Request</VSCodePanelTab>
			<VSCodePanelTab id="tab-2">Response</VSCodePanelTab>
			<VSCodePanelView id="view-1"><Request /></VSCodePanelView>
			<VSCodePanelView id="view-2"><Response response={endpoint.response}/></VSCodePanelView>
		</VSCodePanels>
	)
}