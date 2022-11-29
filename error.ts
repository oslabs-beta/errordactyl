const allErrors = {...Deno.errors, EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError, AggregateError, Error}

export default function errors(error): [] | void {

  for (const errorType in allErrors) {
    if (error instanceof allErrors[errorType]) {

      const arrayErrorStack = error.stack.split("\n    at ");
      arrayErrorStack.error = {};
      const regex = /(?!:)\d+/g;
      const regex2 = /(?<=file:\/\/)\S*/;

      [arrayErrorStack.error.message, arrayErrorStack.error.location] = arrayErrorStack;
      arrayErrorStack.error.location = arrayErrorStack.error.location.match(regex2)[0];
      [arrayErrorStack.error.lineNo, arrayErrorStack.error.colNo] = arrayErrorStack.error.location.match(regex);

      // console.log(arrayErrorStack)
      console.log(arrayErrorStack.error)

      return arrayErrorStack;
    }
  }

  // throw new Error("Undetected Error Type");
}