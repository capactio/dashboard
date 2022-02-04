import { JSONSchema7 } from "json-schema";

export function parseToJSONSchema7(input: string): {
  error?: Error;
  schema: JSONSchema7;
} {
  try {
    return {
      schema: JSON.parse(input),
    };
  } catch (e) {
    const err = e as Error;
    return {
      schema: {} as JSONSchema7,
      error: err,
    };
  }
}

export function errorOrUndefined(
  msgs: (string | Error | undefined)[]
): Error | undefined {
  const errMsgs: string | undefined = msgs.filter((x) => !!x).join(",");
  return errMsgs ? new Error(errMsgs) : undefined;
}
