const fs = require('fs/promises');
import { window, Uri, WorkspaceFolder } from "vscode";

import fileFinder from './filefinder';
import { detectEndpoints } from './detect_endpoints';
import { endpoint, config } from '../../../types';

export async function parse(config: config, folder: WorkspaceFolder) {
  
  console.log("config", config);
	// pull down any file paths from config object retrieved from state
  let files: Uri[] | undefined = await fileFinder(folder, config.routesPath);
	// console.log("files", files);

	if (files) config.filePaths = files;

  // new approach
  const routes: endpoint[] | undefined = await detectEndpoints(files)

	// const routes: endpoint[] = [];
  // use filePaths array to grab routes
  // iterate over config.filePaths
  // files?.forEach((file: Uri) => {
    // adds to array of endpoints as each file is read
    // detectEndpoints(file, routes);
  // })
	// TODO: need to iterate over files array and execute detect SYNCHRONOUSLY

  window.showInformationMessage('Successfully detected server routes\nPlease input request data for applicable endpoints'); // fs.writeFile

	return routes;
  // could ask user to either manually enter in config file, or enter in command line?
}