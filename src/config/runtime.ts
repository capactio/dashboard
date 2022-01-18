interface ExtendedWindow extends Window {
  RuntimeConfig?: RuntimeConfig;
}

declare const window: ExtendedWindow;

export interface RuntimeConfig {
  defaultGatewayEndpoint: string;
}

export function loadRuntimeConfig(): RuntimeConfig {
  if (!window.RuntimeConfig) {
    return {
      defaultGatewayEndpoint: "https://gateway.capact.local/graphql",
    };
  }

  return window.RuntimeConfig;
}
