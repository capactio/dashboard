interface ExtendedWindow extends Window {
  RuntimeConfig?: RuntimeConfig;
}

declare const window: ExtendedWindow;

export interface RuntimeConfig {
  defaultGatewayEndpoint: string;
  argoWorkflowsUIBaseURL: string;
  queryRefetchIntervalMS: number;
}

const defaultRuntimeConfig: RuntimeConfig = {
  defaultGatewayEndpoint: "https://gateway.capact.local/graphql",
  queryRefetchIntervalMS: 1000,
  argoWorkflowsUIBaseURL: "http://localhost:2746",
};

export function loadRuntimeConfig(): RuntimeConfig {
  if (!window.RuntimeConfig) {
    return defaultRuntimeConfig;
  }

  return {
    ...defaultRuntimeConfig,
    ...window.RuntimeConfig,
  };
}
