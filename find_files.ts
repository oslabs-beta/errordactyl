// read config file and store any user overrides
// const ROUTES = config.routes || './routes'

// default behavior of app, traverse routes folder looking for endpoints
// Deno.readDir
// need to check each DirEntry to see if it is itself a directory
// error handling for this step: check if provided path is a STRING => is a folder or a file in the directory (Deno.errors.NotFound) => does the folder contain routes

const findFiles = async (path: string) => {
  try {
    // check if path is a folder
    const fileInfo = await Deno.stat(path);
    if (fileInfo.isDirectory) {
<<<<<<< HEAD
      console.log('this is a directory');
=======
      // console.log('this is a directory');
>>>>>>> e0824929f5a7b48a360c9d9290bf3d42a907c6e6
    } else {
      console.log('must provide a valid directory');
      return;
    }

    const files: string[] = [];
    
    const readDirs = async (folder: string) => {
        for await (const dirEntry of Deno.readDir(folder)) {
            const entryPath = `${folder}/${dirEntry.name}`;
            // if we get to a directory call readDirs on it
            if (dirEntry.isDirectory) {
                await readDirs(entryPath);
            
            } else {
                files.push(entryPath);
            }
        }
        return;
    }
    
    await readDirs(path);
<<<<<<< HEAD
    console.log('findFiles', files)
=======
    // console.log('findFiles', files)
>>>>>>> e0824929f5a7b48a360c9d9290bf3d42a907c6e6
    return files;
    
  } catch (e) {
    // handle different errors here
    if (e instanceof Deno.errors.NotFound) console.log('threw NotFound');
  }
};


export default findFiles;
