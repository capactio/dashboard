import React from "react";

import {
  loadDefaultLoginDetails,
  LoginDetails,
  requestConfigLoader,
} from "../http/connection";

import { useTestConnectionQuery } from "../generated/graphql";

import { useQueryClient } from "react-query";
import ErrorAlert from "../layout/ErrorAlert";
import LoginForm from "./LoginForm";
import { AuthContext } from "./AuthContext";

interface RequireAuthContainerProps {
  children?: React.ReactNode;
}

export function RequireAuthContainer({ children }: RequireAuthContainerProps) {
  const [authenticated, setAuthenticated] = React.useState(false);
  const queryClient = useQueryClient();

  if (!authenticated && requestConfigLoader.existsAndValid()) {
    setAuthenticated(true);
  }

  const query = useTestConnectionQuery(
    {},
    {
      enabled: false,
      retry: false,
      keepPreviousData: false,
    }
  );

  const logout = () => {
    requestConfigLoader.reset();
    queryClient.clear();
    setAuthenticated(false);
  };

  const onLoginFormSubmit = (values: LoginDetails) => {
    requestConfigLoader.save(values);
    query.refetch();
  };

  if (!authenticated && !query.isError && query.data !== undefined) {
    try {
      requestConfigLoader.setValid();
      setAuthenticated(true);
    } catch (err) {
      return <ErrorAlert error={err as Error | undefined} />;
    }
  }

  if (!authenticated) {
    const defaultLoginDetails = loadDefaultLoginDetails();
    return (
      <LoginForm
        loading={query.isLoading}
        error={query.error as Error | undefined}
        onLoginFormSubmit={onLoginFormSubmit}
        defaultLoginDetails={defaultLoginDetails}
      />
    );
  }

  return (
    <AuthContext.Provider value={{ logout }}>{children}</AuthContext.Provider>
  );
}
