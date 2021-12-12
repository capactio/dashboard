import { Col, Divider, Radio, Row, Typography } from "antd";
import React, { useState } from "react";
import CenteredSpinner from "../../layout/CenteredSpinner";
import "./SelectActionImpl.css";
import { Implementation } from "./SelectActionImpl.container";
import ErrorAlert from "../../layout/ErrorAlert";
import { ResourceReference } from "../ResourceRef";
import ImplAdditionalInputSectionContainer from "./ImplAdditionalInput.container";

const { Text } = Typography;

interface ClusterProvisioningProps {
  isLoading: boolean;
  error?: Error;
  setActionImplAdditionalInput: (name: string, data: any) => void;
  setActionImplPath: (actionImplPath: string) => void;
  implementation: Implementation[];
}

function SelectActionImpl({
  isLoading,
  error,
  implementation,
  setActionImplPath,
  setActionImplAdditionalInput,
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
      <Radio.Button
        style={{ margin: 5 }}
        className="huge-radio"
        key={implRef.key()}
        value={implRef.key()}
        onClick={() => {
          setActionImplPath(implRef.path);
          setAdditionalInputTypes(typeRef);
        }}
      >
        <strong>{displayName}</strong>
        <p>{implRef.key()}</p>
      </Radio.Button>
    );
  });

  const implInputSection = additionalInputTypes.map((typeRef) => {
    return (
      <ImplAdditionalInputSectionContainer
        key={typeRef.path}
        name={typeRef.name}
        typeRef={typeRef}
        setImplAdditionalInput={setActionImplAdditionalInput}
      />
    );
  });

  return (
    <Row>
      <Col span={24}>
        <Text>Optionally, select Implementation:</Text>
      </Col>
      <Col span={24} className="huge-radio-group">
        <Radio.Group size="large" buttonStyle="solid">
          {radioBtns}
        </Radio.Group>
      </Col>
      {implInputSection.length > 0 && (
        <AdvancedModeSection>{implInputSection}</AdvancedModeSection>
      )}
    </Row>
  );
}

function AdvancedModeSection(props: any) {
  return (
    <>
      <Col span={24}>
        <Divider orientation="center">Optional Customization</Divider>
        <Text>
          You can change implementation specific parameters for the selected
          provisioning method.
        </Text>
      </Col>
      <Col span={24} style={{ marginTop: "24px" }}>
        {props.children}
      </Col>
    </>
  );
}

export default SelectActionImpl;
