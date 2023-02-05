import { workspace, WorkspaceFolder, Uri, RelativePattern } from 'vscode';
const path = require('path');

// convert path for server folder into uri

export default async function fileFinder(folder: WorkspaceFolder, serverPath: string) {
	// convert folder uri into path
	console.log('folderPath', folder);

	// create pattern
  const relativePattern: RelativePattern = new RelativePattern(folder, serverPath + '/**/*.js');

	console.log('relativePattern', relativePattern);

	const foundFiles = await workspace.findFiles(relativePattern, '**/node_modules/**', 10);
	console.log('foundFiles', foundFiles);

	const relativePaths: Uri[] = [];
	foundFiles.forEach((uri: Uri) => {             
      relativePaths.push(uri);
    })

	// return array of file paths
	console.log('relativePaths', relativePaths)
	return relativePaths;
}