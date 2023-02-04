const fs = require('fs/promises');
import { workspace, window } from "vscode";

import findFiles from './find_files';
import { detectEndpoints } from './detect_endpoints';
import { endpoint, config } from '../../../types';

export async function parse(config: config) {
  
	// pull down any file paths from config object retrieved from state
  let files: string[] | undefined = config.filePaths;
	const path = config.routesPath;
	files = await findFiles(path);

	if (files) config.filePaths = files;
	await fs.writeFile('./_errordactyl/config.json', JSON.stringify(config)); //use fs.writeFile (double check)

	const routes: endpoint[] = [];
  // use filePaths array to grab routes
  // iterate over config.filePaths
  files?.map((file: string) => {
    // adds to array of endpoints as each file is read
    detectEndpoints(file, routes);
  })

  // save methods to config
  config.endpoints = routes;
  window.showInformationMessage('Successfully detected server routes\nPlease input request data for applicable endpoints'); // fs.writeFile

  // could ask user to either manually enter in config file, or enter in command line?
}