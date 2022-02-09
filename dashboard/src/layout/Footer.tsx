import React from "react";

import { Layout } from "antd";
const { Footer: AntFooter } = Layout;

function Footer() {
  return (
    <AntFooter style={{ textAlign: "center", userSelect: "none" }}>
      &copy; 2021 Capact
    </AntFooter>
  );
}

export default Footer;
