import React, { Component } from "react";

import WalutyPanelContainer from "../Panels/Waluty/WalutyPanelContainer";

const BodyApp = () => {
  return (
    <div>
      <WalutyPanelContainer />;
      <WalutyPanelContainer />
    </div>
  );
};

export default BodyApp;
