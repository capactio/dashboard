import React from "react";

export interface AuthContextType {
  logout: () => void;
}

export const AuthContext = React.createContext<AuthContextType>({
  logout: () => undefined,
});
