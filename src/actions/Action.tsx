import React, { useState } from "react";

import { Button, Col, Descriptions, message, Row, Typography } from "antd";
import ActionStatus from "./ActionStatus";
import "./Action.css";
import { CheckCircleOutlined } from "@ant-design/icons";

const { Text, Paragraph } = Typography;

const sampleRenderedAction = `[
    {
      "_id": "61a61615c9266e1e532cc29c",
      "index": 0,
      "guid": "c1223d18-d568-48ee-a4ce-077159f91076",
      "isActive": false,
      "balance": "$3,499.32",
      "picture": "http://placehold.it/32x32",
      "age": 38,
      "eyeColor": "brown",
      "name": "Weber Vasquez",
      "gender": "male",
      "company": "ENTROFLEX",
      "email": "webervasquez@entroflex.com",
      "phone": "+1 (808) 451-3116",
      "address": "438 Albemarle Terrace, Marne, Pennsylvania, 4385",
      "about": "Consectetur ipsum consequat eiusmod magna mollit irure qui ex voluptate cillum velit. Eiusmod voluptate ea magna consectetur eiusmod cupidatat anim cillum elit culpa irure pariatur sit sit. Sit aute ipsum veniam exercitation. Nisi irure esse aliquip excepteur pariatur ex.\r\n",
      "registered": "2016-08-22T02:56:21 -02:00",
      "latitude": -63.040193,
      "longitude": 154.71701,
      "tags": [
        "nulla",
        "elit",
        "sit",
        "quis",
        "excepteur",
        "ullamco",
        "velit"
      ],
      "friends": [
        {
          "id": 0,
          "name": "Golden Weiss"
        },
        {
          "id": 1,
          "name": "Lucille Osborn"
        },
        {
          "id": 2,
          "name": "Kelly Gray"
        }
      ],
      "greeting": "Hello, Weber Vasquez! You have 10 unread messages.",
      "favoriteFruit": "apple"
    },
    
    {
      "_id": "61a61615cd6e5709516f93a1",
      "index": 5,
      "guid": "9e2544f3-26ca-4736-a0de-a29daccfb565",
      "isActive": true,
      "balance": "$3,859.15",
      "picture": "http://placehold.it/32x32",
      "age": 25,
      "eyeColor": "blue",
      "name": "Emerson Mullen",
      "gender": "male",
      "company": "ANARCO",
      "email": "emersonmullen@anarco.com",
      "phone": "+1 (875) 499-2000",
      "address": "728 Micieli Place, Grazierville, American Samoa, 6542",
      "about": "Esse cupidatat dolor officia qui Lorem culpa aliquip nisi cupidatat labore. Reprehenderit reprehenderit Lorem qui et non adipisicing consectetur laborum ex nostrud commodo. Consequat excepteur dolore deserunt eu mollit pariatur mollit. Cillum anim deserunt sit commodo fugiat incididunt dolor quis incididunt eiusmod. Laboris in nulla consectetur nisi do veniam laboris cillum proident dolor aliqua.\r\n",
      "registered": "2021-01-05T12:28:45 -01:00",
      "latitude": -75.39312,
      "longitude": 152.588258,
      "tags": [
        "cillum",
        "duis",
        "quis",
        "dolore",
        "ea",
        "laboris",
        "irure"
      ],
      "friends": [
        {
          "id": 0,
          "name": "Patrica Jacobs"
        },
        {
          "id": 1,
          "name": "Brandy Ferrell"
        },
        {
          "id": 2,
          "name": "Lena Barlow"
        }
      ],
      "greeting": "Hello, Emerson Mullen! You have 5 unread messages.",
      "favoriteFruit": "apple"
    }
  ]`;

interface ActionProps {}

function Action(props: ActionProps) {
  const actionName = "sample";

  const [isRun, setRun] = useState(false); // TODO: Use actual property on Action and mutation to set it's state
  const [isBeingRun, setBeingRun] = React.useState(false); // TODO: To remove as we will use `isLoading` from mutation

  const runAction = async () => {
    setBeingRun(true);
    // TODO: Run Action create mutation
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRun(true);
    message.success(`Action '${actionName}' run successfully`);
  };

  const runActionBtn = (
    <Button
      type="primary"
      onClick={() => runAction()}
      disabled={isRun}
      loading={isBeingRun && !isRun}
      icon={isRun ? <CheckCircleOutlined /> : null}
    >
      Run Action
    </Button>
  );

  return (
    <Row>
      <Col span={24}>
        <Descriptions
          column={1}
          bordered
          title="Basic info"
          extra={runActionBtn}
        >
          <Descriptions.Item label="Name">Action name</Descriptions.Item>
          <Descriptions.Item label="Created at">
            <Text>{new Date().toUTCString()}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            <ActionStatus phase="RUNNING" />
          </Descriptions.Item>
          <Descriptions.Item label="Interface">
            <Text code>cap.interface.database.postgresql.install:latest</Text>
          </Descriptions.Item>
        </Descriptions>
        <Descriptions
          column={1}
          layout="vertical"
          bordered
          title="Rendered workflow"
          style={{ marginTop: "24px" }}
        >
          <Descriptions.Item label="Runner Interface">
            <Text code>cap.interface.runner.argo.run</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Runner Arguments">
            <Paragraph>
              <pre className="rendered-action">{sampleRenderedAction}</pre>
            </Paragraph>
          </Descriptions.Item>
        </Descriptions>
      </Col>
    </Row>
  );
}

export default Action;
