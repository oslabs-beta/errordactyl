import { endpoint, methodType } from '../../../types';
import { workspace, Uri } from 'vscode';

export const detectEndpoints = async (files: Uri[] | undefined) => {
  if (files !== undefined) {
    let routes: endpoint[] = [];
    for (const uri of files) {
      // read file from passed in route
      let temp = await workspace.fs.readFile(uri); // replaced with Node's fs.readFile
      let file = temp.toString();
      // console.log('read file', file);
      // strip comments from file
      file = file.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
      // iterate over methods dictionary and match method in file
      const methods: methodType[] = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

      for (const method of methods) {
        const regex = new RegExp(`\\.${method}\\(('|")(\\S)*('|")`, 'gi');
        const endpoints: RegExpMatchArray|null = file.match(regex);

        if (endpoints) {
          for (const match of endpoints) {
            // format discovered route
            const path: string = match.replace(`.${method.toLowerCase()}(`, '').replace(/"|'/g, '');
            // create endpoint object
            let endpoint: endpoint = {method, path};
            // add body to appropriate route types
            if (method != 'GET' && method != 'DELETE') {
              endpoint = {method, path, body: {}}
            }
            // add endpoint object to routes array
            routes.push(endpoint);
          }
        }
      }
    }
    return routes;
  }
}

// export const detectEndpoints = async (path: Uri, routes: endpoint[]) => {
// 	// read file from passed in route
//   let temp = await workspace.fs.readFile(path); // replaced with Node's fs.readFile
// 	let file = temp.toString();
// 	// console.log('read file', file);
//   // strip comments from file
//   file = file.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
//   // iterate over methods dictionary and match method in file
// 	const methods: methodType[] = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

//   for (const method of methods) {
//     const regex = new RegExp(`\\.${method}\\(('|")(\\S)*('|")`, 'gi');
//     const endpoints: RegExpMatchArray|null = file.match(regex);

//     if (endpoints) {
//       for (const match of endpoints) {
// 				// format discovered route
//         const path: string = match.replace(`.${method.toLowerCase()}(`, '').replace(/"|'/g, '');
//         // create endpoint object
//         let endpoint: endpoint = {method, path};
// 				// add body to appropriate route types
//         if (method != 'GET' && method != 'DELETE') {
//           endpoint = {method, path, body: {}}
//         }
// 				// add endpoint object to routes array
//         routes.push(endpoint);
//       }
//     }
//   }
//   console.log("routes", routes);
// }