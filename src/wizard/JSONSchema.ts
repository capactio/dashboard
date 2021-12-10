import { JSONSchema7 } from "json-schema";

export function ParseToJSONSchema7(input: string): {
  error?: any;
  schema: JSONSchema7;
} {
  try {
    return {
      schema: JSON.parse(input),
    };
  } catch (e) {
    return {
      schema: {} as JSONSchema7,
      error: e,
    };
  }
}

export function ErrorOrUndefined(
  msgs: (string | undefined)[]
): Error | undefined {
  const errMsgs: string | undefined = msgs.filter((x) => !!x).join(",");
  return errMsgs ? new Error(errMsgs) : undefined;
}
