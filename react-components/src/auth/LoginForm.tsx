import React from "react";
import { Form, Input, Button, Card, Alert } from "antd";
import { LoginDetails } from "../http";
import styled from "styled-components";

export interface LoginFormProps {
  error?: Error;
  loading: boolean;
  defaultLoginDetails?: LoginDetails;
  onLoginFormSubmit: (values: LoginDetails) => void;
}

const LoginFormWrapper = styled.div`
  padding: 20px;

  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

const FixedWidthCard = styled(Card)`
  width: 500px;
`;

const AlertWithMargin = styled(Alert)`
  margin-bottom: 24px;
`;

export function LoginForm({
  loading,
  error,
  defaultLoginDetails = {
    endpoint: "",
    password: "",
    username: "",
  },
  onLoginFormSubmit,
}: LoginFormProps) {
  return (
    <LoginFormWrapper>
      <FixedWidthCard title="Capact Dashboard Login" bordered={false}>
        {error && (
          <AlertWithMargin
            message={`Error`}
            description={error.message}
            type="error"
            showIcon
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
      </FixedWidthCard>
    </LoginFormWrapper>
  );
}
