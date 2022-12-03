const allErrors = {...Deno.errors, EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError, AggregateError, Error}

// export default function errors(error): [] | void {

//   for (const errorType in allErrors) {
//     if (error instanceof allErrors[errorType]) {

//       const arrayErrorStack = error.stack.split("\n    at ");
//       arrayErrorStack.error = {};
//       const regex = /(?!:)\d+/g;
//       const regex2 = /(?<=file:\/\/)\S*/;

//       [arrayErrorStack.error.message, arrayErrorStack.error.location] = arrayErrorStack;
//       arrayErrorStack.error.location = arrayErrorStack.error.location.match(regex2)[0];
//       [arrayErrorStack.error.lineNo, arrayErrorStack.error.colNo] = arrayErrorStack.error.location.match(regex);

//       // console.log(arrayErrorStack)
//       console.log(arrayErrorStack.error)

//       return arrayErrorStack;
//     }
//   }

//   // throw new Error("Undetected Error Type");
// }

export default function errors(errorMessage): [] | void {

  // console.log(errorMessage)

      const arrayErrorStackSplit = (JSON.stringify(errorMessage)).split("\\n\\n");
      const arrayErrorStack = [];
      // console.log("Array Error Stack Split", arrayErrorStackSplit)

      arrayErrorStackSplit.forEach((stringElement) => {
        stringElement.split('\\n').forEach((element) => arrayErrorStack.push(element.replace('    at ','')))}
      )

      console.log("Array Error Stack", arrayErrorStack)

      const regex = /(?!:)\d+/g;
      const regex2 = /(?<=file:\/\/)\S*/;  // looking for strings after file://...
      const regex3 = /(?<=\.(j|t)s:)\S*/;  // looking for .js or .ts suffixes
      const regex4 = /method: \\"(.*)\\"/

      const arrayOfUsefulErrorInformation = [];

      for (let i = 0; i < arrayErrorStack.length; i++) {
        if (arrayErrorStack[i].includes('[uncaught application error]:')) {
          const strobj = {
            message: 'null',
            request: 'null',
            response: 'null',
            location: 'null',
            lineNo: 'null',
            colNo: 'null',
            http: 'null',
          };

          [strobj.message, strobj.request, strobj.response, strobj.location] = [arrayErrorStack[i], arrayErrorStack[i+1], arrayErrorStack[i+2], arrayErrorStack[i+3]];
          strobj.location = strobj.location.match(regex2)[0];
          [strobj.lineNo, strobj.colNo] = strobj.location.match(regex3)[0].split(':');
          strobj.http = strobj.request.match(regex4)[1];

          arrayOfUsefulErrorInformation.push(strobj);
        }
      }



      return arrayOfUsefulErrorInformation;

}