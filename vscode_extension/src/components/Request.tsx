import { VSCodeDropdown, VSCodeOption } from "@vscode/webview-ui-toolkit/react"
import { useState } from "react";
import { Body, Parameters } from "./RequestComponents";

export default function Request() {

	const [current, setCurrent] = useState("Body")

	const handleSelect = (event:any) => {
		console.log(event.target.value)
		setCurrent(event.target.value)
	}

	const renderCurrent = (current:string) => {
		switch (current) {
			case 'Body':
				return <Body path=""/>
			case 'Parameters':
				return <Parameters />
				break;
		}
	}

	return (
		<div>
			<VSCodeDropdown onChange={(event:any) => handleSelect(event)}>
				<VSCodeOption>Body</VSCodeOption>
				<VSCodeOption>Parameters</VSCodeOption>
				<VSCodeOption>Authentication</VSCodeOption>
				<VSCodeOption>Headers</VSCodeOption>
			</VSCodeDropdown>
			{renderCurrent(current)}
		</div>
	)
}