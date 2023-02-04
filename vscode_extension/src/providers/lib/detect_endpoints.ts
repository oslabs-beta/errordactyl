import { endpoint, methodType } from '../../../types';
const fs = require('fs/promises');

export const detectEndpoints = async (path: string, routes: endpoint[]) => {
	// read file from passed in route
  let file = await fs.readFile(path); // replaced with Node's fs.readFile

  // strip comments from file
  file = file.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
  // iterate over methods dictionary and match method in file
	const methods: methodType[] = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

  for (const method of methods) {
    const regex = new RegExp(`\\.${method}\\("(\\S)*"`, 'gi');
    const endpoints: RegExpMatchArray|null = file.match(regex);

    if (endpoints) {
      for (const match of endpoints) {
				// format discovered route
        const path: string = match.replace(`.${method.toLowerCase()}(`, '').replace(/"/, '');
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