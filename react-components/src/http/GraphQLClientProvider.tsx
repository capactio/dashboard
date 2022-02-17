import React from "react";
import {
  QueryClient,
  QueryClientProvider as OriginalQueryClientProvider,
} from "react-query";

export interface GraphQLClientProviderProps {
  children: React.ReactNode;
  queryClient?: QueryClient;
}

export function GraphQLClientProvider({
  children,
  queryClient = new QueryClient(),
}: GraphQLClientProviderProps) {
  return (
    <OriginalQueryClientProvider client={queryClient}>
      {children}
    </OriginalQueryClientProvider>
  );
}
