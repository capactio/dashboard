import React from "react";
import "./Auth.css";

import {
  defaultLoginDetails,
  LoginDetails,
  requestConfigLoader,
} from "./http/connection";
import { Form, Input, Button, Card, Alert } from "antd";
import { useTestConnectionQuery } from "./generated/graphql";
import ErrorAlert from "./layout/ErrorAlert";
import { useQueryClient } from "react-query";

interface RequireAuthProps {
  children?: React.ReactNode;
}

export interface AuthContextType {
  logout: () => void;
}

export const AuthContext = React.createContext<AuthContextType>({
  logout: () => undefined,
});

export function RequireAuth({ children }: RequireAuthProps) {
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
    return (
      <LoginForm
        loading={query.isLoading}
        error={query.error as Error | undefined}
        onLoginFormSubmit={onLoginFormSubmit}
      />
    );
  }

  return (
    <AuthContext.Provider value={{ logout }}>{children}</AuthContext.Provider>
  );
}

interface LoginFormProps {
  error?: Error;
  loading: boolean;
  onLoginFormSubmit: (values: LoginDetails) => void;
}

function LoginForm({ loading, error, onLoginFormSubmit }: LoginFormProps) {
  return (
    <div className="login-form">
      <Card
        title="Capact Dashboard Login"
        bordered={false}
        style={{ width: 500 }}
      >
        {error && (
          <Alert
            message={`Error`}
            description={error.message}
            type="error"
            showIcon
            style={{ marginBottom: "24px" }}
          />
        )}
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ ...defaultLoginDetails }}
          onFinish={onLoginFormSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Endpoint"
            name="endpoint"
            rules={[
              {
                required: true,
                message: "Provide the Capact Gateway endpoint.",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Provide the username." }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Provide the user password." }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button loading={loading} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
