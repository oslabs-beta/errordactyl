const allErrors = {...Deno.errors, EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError, AggregateError, Error}

export default function errors(error) {
  for (let errorType in allErrors) {
    if (error instanceof allErrors[errorType]) {
      console.log(error.stack)
      console.log(JSON.stringify(error.stack))
      console.log(error.stack.split("\n    at "))
      return;
    }
  }

  // throw new Error("Undetected Error Type");
}