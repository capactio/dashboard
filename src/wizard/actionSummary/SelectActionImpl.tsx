import React, { useState } from "react";
import { Button, Col, Radio, Row, Space, Typography } from "antd";
import CenteredSpinner from "../../layout/CenteredSpinner";
import "./SelectActionImpl.css";
import { Implementation } from "./SelectActionImpl.container";
import ErrorAlert from "../../layout/ErrorAlert";
import { ResourceReference } from "../ResourceRef";
import ImplAdditionalInputSectionContainer from "./SelectImplAdditionalInput.container";
import Title from "antd/lib/typography/Title";

const { Text } = Typography;

interface ClusterProvisioningProps {
  isLoading: boolean;
  error?: Error;
  setActionImplAdditionalInput: (name: string, data: any) => void;
  setActionImplPath: (actionImplPath: string) => void;
  resetActionImplPath: () => void;
  resetActionImplAdditionalInput: (name: string) => void;
  implementation: Implementation[];
  currentImplPath: string | undefined;
}

function SelectActionImpl({
  isLoading,
  error,
  implementation,
  setActionImplPath,
  resetActionImplPath,
  currentImplPath,
  setActionImplAdditionalInput,
  resetActionImplAdditionalInput,
}: ClusterProvisioningProps) {
  const [additionalInputTypes, setAdditionalInputTypes] = useState<
    ResourceReference[]
  >([]);

  if (isLoading) {
    return <CenteredSpinner />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  const radioBtns = implementation.map(({ displayName, implRef, typeRef }) => {
    return (
      <Radio
        key={implRef.key()}
        value={implRef.path}
        onClick={() => {
          setActionImplPath(implRef.path);
          setAdditionalInputTypes(typeRef);
        }}
      >
        <strong>{displayName}</strong>
        <p>{implRef.key()}</p>
      </Radio>
    );
  });

  return (
    <Row>
      <Col span={24}>
        <Title level={3}>Select specific Implementation</Title>
        <Text>
          Select a specific Implementation, instead of having it resolved by
          Engine for you.
        </Text>
        <Button
          style={{ display: "block", marginTop: "16px" }}
          disabled={!currentImplPath}
          type="default"
          danger
          onClick={() => resetActionImplPath()}
        >
          Reset
        </Button>
      </Col>
      <Col span={24}>
        <Radio.Group style={{ margin: "24px 0" }} value={currentImplPath}>
          <Space direction="vertical">{radioBtns}</Space>
        </Radio.Group>
      </Col>
      {currentImplPath && additionalInputTypes.length > 0 && (
        <>
          <Col span={24}>
            <Title level={3}>
              Provide additional input for the Implementation
            </Title>
            <Text>
              You can provide additional input for the selected Implementation.
            </Text>
          </Col>
          <Col span={24} style={{ marginTop: "24px" }}>
            {additionalInputTypes.map((typeRef) => {
              const name = typeRef.name;
              if (!name) {
                return (
                  <ErrorAlert errorMessage="name for Additional Input cannot be undefined" />
                );
              }

              return (
                <ImplAdditionalInputSectionContainer
                  name={name}
                  key={typeRef.path}
                  typeRef={typeRef}
                  setImplAdditionalInput={setActionImplAdditionalInput}
                  resetImplAdditionalInput={resetActionImplAdditionalInput}
                />
              );
            })}
          </Col>
        </>
      )}
    </Row>
  );
}

export default SelectActionImpl;
