// store user input for config file
let path: string | null = './server/routes';
let files: string[] | undefined = [];

const useDefaultRouteLocation = confirm('Do you want to use the default route location of ./server/routes?');
// if y then continue to next questions

// else ask user to input routes
if (!useDefaultRouteLocation) {
  path = prompt('Please enter the directory path where your routes are stored:');
  // const confirmation = confirm('Route directory path: ' + path);
  // if (!confirmation)
}

const testAllFiles = confirm('Do you want to test all routes found in this directory?');

if (!testAllFiles) {
    const userInput = prompt('Please enter all relative file paths that you would like to test (separated by spaces):');
    files = userInput?.split(' ');
}

const config = {
  routesPath: path,
  filePaths: files,
}

await Deno.writeTextFile('./errordactyl.json', JSON.stringify(config));