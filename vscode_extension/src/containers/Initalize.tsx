import { useState } from "react";
import { VSCodeTextField, VSCodeButton } from "@vscode/webview-ui-toolkit/react";
import { VSCodeAPI } from "../utils/vsCodeApi";
import { EXTENSION_CONSTANT } from "../utils/constant";
import { config } from "../../types";

export default function Initalize() {
	const [serverPath, setServerPath] = useState(EXTENSION_CONSTANT.DEFAULT_PATHS.SERVER);
	const [routesPath, setRoutesPath] = useState(EXTENSION_CONSTANT.DEFAULT_PATHS.ROUTES);
	const [port, setPort] = useState(EXTENSION_CONSTANT.DEFAULT_PATHS.PORT)


	const initialize = (): void => {
		let config: config = {
			serverPath: serverPath,
			routesPath: routesPath,
			PORT: port
		}

		VSCodeAPI.postMessage({action: 'set-config', data: config})
	}

	return (
		<div className="setup">
			<VSCodeTextField value={serverPath} onInput={(e:any) => setServerPath(e.target.value)}>Server File Path:</VSCodeTextField>
			<VSCodeTextField value={routesPath} onInput={(e:any) => setRoutesPath(e.target.value)}>Routes Directory Path:</VSCodeTextField>
			<VSCodeTextField value={port} onInput={(e:any) => setPort(e.target.value)}>Port:</VSCodeTextField>
			<VSCodeButton onClick={() => initialize()}>Initialize Workspace</VSCodeButton>
		</div>
	)
};