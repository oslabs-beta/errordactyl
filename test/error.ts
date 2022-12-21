import * as path from "https://deno.land/std/path/mod.ts"

console.log(path.dirname(path.fromFileUrl(Deno.mainModule)));

export default function errors(errorMessage: string): [] | string {
  if (!errorMessage) return "...";

      type strobj = {
        message: string,
        request: string,
        response: string,
        location: string,
        lineNo: string,
        colNo: string,
        http: string
      }

      const regex = /(?!:)\d+/g;
      const regex2 = /(?<=file:\/\/)\S*/;  // looking for strings after file://...
      const regex3 = /(?<=\.(j|t)s:)\S*/;  // looking for .js or .ts suffixes
      const regex4 = / (.*): /gi; // looking for object keys in the request and response string object
      const regex5 = /\"(.*)\"/; // looking for a word between quotation marks
      const regex6 = /:(\d+):(\d+)/;

      const arrayErrorStackSplit = (JSON.stringify(errorMessage)).split("\\n\\n");
      const arrayErrorStack: (string)[] = [];
      const arrayOfUsefulErrorInformation = [];

      arrayErrorStackSplit.forEach((stringElement) => {
        stringElement.split('\\n').forEach((element) => arrayErrorStack.push(element.replaceAll('    at ','')))}
      )

      for (let i = 0; i < arrayErrorStack.length; i++) {
        if (arrayErrorStack[i].includes('[uncaught application error]:')) {

          const strobj: strobj = {
            message: arrayErrorStack[i].replaceAll(/\"/g,''),
            request: arrayErrorStack[i+1].replace(/request: /, '').replaceAll(/\\/g, ''),
            response: arrayErrorStack[i+2].replace(/response: /, ''),
            location: decodeURI(arrayErrorStack[i+3].match(regex2)[0]),
            lineNo: decodeURI(arrayErrorStack[i+3].match(regex2)[0]).match(regex3)[0].split(':')[0],
            colNo: decodeURI(arrayErrorStack[i+3].match(regex2)[0]).match(regex3)[0].split(':')[1],
          };

          // Turn the request message into an object in the block below:
          {
            const JSONstringArr: (string)[] = [];
            strobj.request.split(',').forEach((ele) => {
              JSONstringArr.push(ele.match(regex4)[0].replace(' ','"').replace(':','":'))
            })

            JSONstringArr.forEach((ele) => strobj.request = strobj.request.replace(ele.match(regex5)[1], ele.match(regex5)[0]))
            strobj.request = JSON.parse(strobj.request);
          }

          // Turn the response message into an object in the block below:
          {
            const JSONstringArr = [];
            strobj.response = strobj.response.replace('type: undefined', 'type: "undefined"') // JSON.parse does not parse undefined
            strobj.response.split(',').forEach((ele) => {
              JSONstringArr.push(ele.match(regex4)[0].replace(' ','"').replace(':','":'))
            })

            JSONstringArr.forEach((ele) => strobj.response = strobj.response.replace(ele.match(regex5)[1], ele.match(regex5)[0]))
            strobj.response = JSON.parse(strobj.response)

            if (strobj.response.type === 'undefined') strobj.response.type = undefined // turn 'undefined' into undefined
          }

          // Remove the line and column number from the location object:
          {
            strobj.location = strobj.location.replace(strobj.location.match(regex6)[0], '')
          }

          arrayOfUsefulErrorInformation.push(strobj);

        }
      }

      return arrayOfUsefulErrorInformation;

}


// newStrArr.forEach((ele) => {
//   str.replace(ele.match(/ (.*): /gi)[0], ele.replace(/ (.*): /gi, ))
// }