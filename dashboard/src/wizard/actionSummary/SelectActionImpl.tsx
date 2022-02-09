import React, { useState } from "react";
import { Button, Col, Radio, Row, Space, Tooltip, Typography } from "antd";
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
  setActionImplAdditionalInput: (name: string, data: unknown) => void;
  setActionImplPath: (actionImplPath: string) => void;
  resetActionImplPath: () => void;
  resetActionImplAdditionalInput: (name: string) => void;
  implementation: Implementation[];
  currentImplPath: string | undefined;
}

interface ImplementationExtended extends Implementation {
  disabled: boolean;
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

  const implsExtended: ImplementationExtended[] = implementation.map((impl) => {
    // currently we cannot pick Implementation by path and revision, we automatically select latest revision
    let disabled = false;

    const implsWithEqualPaths = implementation.filter(
      ({ implRef: itemImplRef }) => impl.implRef.path === itemImplRef.path
    );
    if (implsWithEqualPaths.length > 1) {
      const isFound = implsWithEqualPaths.some(
        ({ implRef: itemImplRef }) =>
          itemImplRef.revision > impl.implRef.revision
      );
      disabled = isFound;
    }

    return {
      ...impl,
      disabled,
    };
  });

  const radioBtns = implsExtended
    .sort((a: ImplementationExtended, b: ImplementationExtended) => {
      return Number(a.disabled) - Number(b.disabled);
    })
    .map(({ displayName, implRef, typeRef, disabled }) => {
      // avoid selecting all Implementations with the same path at once
      const value = disabled ? implRef.key() : implRef.path;

      const radioBtn = (
        <Radio
          key={implRef.key()}
          value={value}
          onClick={() => {
            setActionImplPath(implRef.path);
            setAdditionalInputTypes(typeRef);
          }}
          disabled={disabled}
        >
          <strong>{displayName}</strong>
          <p>{implRef.key()}</p>
        </Radio>
      );

      if (disabled) {
        return (
          <Tooltip
            key={implRef.key()}
            placement="topLeft"
            overlayStyle={{ maxWidth: "420px" }}
            title={
              "Not implemented: Because of the current Capact Engine limitation, you can select only the latest revision for a given Implementation path."
            }
            arrowPointAtCenter
          >
            {radioBtn}
          </Tooltip>
        );
      }

      return radioBtn;
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
