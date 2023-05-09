import React from "react";
import storeCreator from "./Store/store";
import { Provider } from "react-redux";
import WalutyPanel from "./CurrencyPowerPanel"; 
const WalutyPanelContainer = () => {
  return (
    <Provider store={storeCreator()}>
      <WalutyPanel/>
    </Provider>
  );
};

export default WalutyPanelContainer;
