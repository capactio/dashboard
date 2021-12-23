interface RequestConfig {
  endpoint: string;
  headers: { [key: string]: string };
  validated: boolean;
}

export interface LoginDetails {
  endpoint: string;
  username: string;
  password: string;
}

export const defaultLoginDetails: LoginDetails = {
  endpoint: "https://gateway.capact.local/graphql",
  username: "graphql",
  password: "t0p_s3cr3t",
};

class RequestConfigLoader {
  private static LS_KEY = "capact-gateway";

  public save({ endpoint, username, password }: LoginDetails) {
    const encodedCredentials = btoa(`${username}:${password}`);
    const reqConfig: RequestConfig = {
      endpoint,
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
      },
      validated: false,
    };
    this.saveRequestConfig(reqConfig);
  }

  public existsAndValid(): boolean {
    const cfg = this.load();
    return cfg !== undefined && cfg?.validated;
  }

  public setValid() {
    const cfg = this.load();
    if (cfg === undefined) {
      throw new Error("Missing request configuration");
    }

    cfg.validated = true;
    this.saveRequestConfig(cfg);
  }

  public load(): RequestConfig | undefined {
    const res = localStorage.getItem(RequestConfigLoader.LS_KEY);
    if (!res) {
      return;
    }

    try {
      const requestConfig = JSON.parse(res);
      return requestConfig as RequestConfig;
    } catch (e) {
      // invalid data
      this.reset();
      return;
    }
  }

  public reset() {
    localStorage.removeItem(RequestConfigLoader.LS_KEY);
  }

  private saveRequestConfig(config: RequestConfig) {
    const reqConfigStr = JSON.stringify(config);
    localStorage.setItem(RequestConfigLoader.LS_KEY, reqConfigStr);
  }
}

export const requestConfigLoader = new RequestConfigLoader();
