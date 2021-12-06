export const QUERY_REFETCH_INTERVAL_MS = Number(
  process.env.REACT_APP_REFETCH_INTERVAL_MS ?? 1000
);

export const ARGO_WORKFLOWS_UI_BASE_URL =
  process.env.ARGO_WORKFLOWS_UI_BASE_URL ?? "http://localhost:2746";
