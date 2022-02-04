// based on generated Fetcher by `graphql-code-generator`
// source: https://github.com/dotansimha/graphql-code-generator/blob/0d71a60d9ff6cebe07cf7e4f764edd9f3901a2d1/packages/plugins/typescript/react-query/src/fetcher-fetch-hardcoded.ts#L39

import { requestConfigLoader } from "./connection";

export function Fetcher<TData, TVariables>(
  query: string,
  variables?: TVariables
) {
  return async (): Promise<TData> => {
    const cfg = requestConfigLoader.load();
    if (!cfg) {
      throw new Error("Missing request configuration. Log in first");
    }

    const res = await fetch(cfg?.endpoint, {
      method: "POST",
      headers: cfg.headers,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();
    if (json.errors) {
      const { message } = json.errors[0];
      throw new Error(message);
    }

    return json.data;
  };
}
