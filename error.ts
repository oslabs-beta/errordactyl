
const allErrors = {...Deno.errors, EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError, AggregateError, Error}

export default function errors(error) {
  for (let errorType in allErrors) {
    if (error instanceof allErrors[errorType]) {
      console.log(typeof error)
      console.log(error)
      return error;
    }
  }

  throw new Error("Undetected Error Type");
}

