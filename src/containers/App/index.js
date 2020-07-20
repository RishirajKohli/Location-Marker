import React, { memo } from "react";
import Layout from "../Layout";
import MapView from "../MapView";
import TableArea from "../TableArea";
import "./app.scss";
function App() {
  return (
    <Layout>
      <MapView></MapView>
      <TableArea></TableArea>
    </Layout>
  );
}

export default memo(App);
