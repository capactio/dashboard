import React from "react";
import "./App.css";

import NewAction from "./routes/new-action";
import Actions from "./routes/actions";
import Action from "./routes/action";
import { Navigate, Route, Routes } from "react-router-dom";
import InterfaceGroupCatalog from "./routes/hub-interface-groups";
import InterfacesCatalog from "./routes/hub-interfaces";
import { Layout } from "antd";
import Menu from "./layout/Menu";
import NotFoundPage from "./layout/NotFound";
import { RequireAuthContainer, LoginDetails } from "@capactio/react-components";
import Header from "./layout/Header";
import { loadRuntimeConfig } from "./config/runtime";

function App() {

  const { defaultGatewayEndpoint } = loadRuntimeConfig();
  const defaultLoginDetails: LoginDetails = {
    endpoint: defaultGatewayEndpoint,
    username: "",
    password: "",
  }

  return (
    <RequireAuthContainer defaultLoginDetails={defaultLoginDetails}>
      <Layout>
        <Header />
        <Layout>
          <Menu />
          <Routes>
            <Route path="/" element={<Navigate to="/hub/interface-groups" />} />
            <Route path="/hub/interface-groups">
              <Route index element={<InterfaceGroupCatalog />} />
              <Route path=":name" element={<InterfacesCatalog />} />
            </Route>
            <Route path="actions">
              <Route index element={<Actions />} />
              <Route path="new/:path/:revision" element={<NewAction />} />
              <Route path=":name" element={<Action />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </Layout>
    </RequireAuthContainer>
  );
}

export default App;
