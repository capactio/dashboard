import React from "react";
import "./LoginForm.css";
import { Form, Input, Button, Card, Alert } from "antd";
import { LoginDetails } from "../http/connection";

interface LoginFormProps {
  error?: Error;
  loading: boolean;
  defaultLoginDetails: LoginDetails;
  onLoginFormSubmit: (values: LoginDetails) => void;
}

function LoginForm({
  loading,
  error,
  defaultLoginDetails,
  onLoginFormSubmit,
}: LoginFormProps) {
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

export default LoginForm;
