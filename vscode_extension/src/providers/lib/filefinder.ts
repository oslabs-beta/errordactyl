import { workspace, WorkspaceFolder, Uri, RelativePattern } from 'vscode';
const path = require('path');

// convert path for server folder into uri

export default async function fileFinder(folder: WorkspaceFolder, routesPath: string) {
	// create pattern
  const pattern: RelativePattern = new RelativePattern(folder, routesPath + '/*.{js,ts}');
	console.log('relativePattern', pattern);
  
 	const foundFiles = await workspace.findFiles(pattern, '**/node_modules/**', 10);
	console.log('foundFiles', foundFiles);

	const relativePaths: Uri[] = [];
	
	foundFiles.forEach((uri: Uri) => {             
      relativePaths.push(uri);
    })

	// return array of file paths
	console.log('relativePaths', relativePaths)
	return relativePaths;
}