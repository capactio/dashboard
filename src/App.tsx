import React from "react";
import "./App.css";

import NewAction from "./routes/new-action";
import Actions from "./routes/actions";
import Action from "./routes/action";
import { Navigate, Route, Routes } from "react-router-dom";
import NewInterfaceGroupCatalog from "./routes/hub-interface-groups";
import NewInterfacesCatalog from "./routes/hub-interfaces";
import { Layout } from "antd";
import Menu from "./layout/Menu";
import NotFoundPage from "./layout/NotFound";
import { RequireAuthContainer } from "./auth/RequireAuth.container";
import Header from "./layout/Header";

function App() {
  return (
    <RequireAuthContainer>
      <Layout>
        <Header />
        <Layout>
          <Menu />
          <Routes>
            <Route path="/" element={<Navigate to="/hub/interface-groups" />} />
            <Route path="/hub/interface-groups">
              <Route index element={<NewInterfaceGroupCatalog />} />
              <Route path=":name" element={<NewInterfacesCatalog />} />
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
