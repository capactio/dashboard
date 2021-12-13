import React from "react";
import "./App.css";

import { Layout } from "antd";

import NewAction from "./routes/new-action";
import Actions from "./routes/actions";
import Action from "./routes/action";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
const { Content } = Layout;

function App() {
  return (
    <Layout>
      <Header />
      <Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: 64 }}
      >
        <Routes>
          <Route path="/" element={<Navigate to="/actions" />} />
          <Route path="actions">
            <Route index element={<Actions />} />
            <Route path="new" element={<NewAction />} />
            <Route path=":name" element={<Action />} />
          </Route>
          <Route path="*" element={<p>Route not found</p>} />
        </Routes>
      </Content>
      <Footer />
    </Layout>
  );
}

export default App;
