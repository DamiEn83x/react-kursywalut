import React, { useEffect, useState } from "react";
import WalutyReferencyjne from "./WalutyReferencyjne/WalutyReferencyjne";
import LookupSelector from "../../Components/LookupSelector/LookupSelector";
import DateFilter from "./DateFilter/DateFilter";

import FilterDebuger from "./reducers/Filter/FilterDebuger";
import { WalutaChanged } from "./reducers/Filter/FilterReducers";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWaluty,
  CurrencyItemsAllLookup,
  CurrencyItemsAllChecks,
  fetchWalutyKursy,
  GetProgressfetchWaluty,
  WalutyKursy
} from "./reducers/MainReducer";
import ErrorViewer from "./ErrorViewer";
import KursyViewer from "./KursyViewer/KursyViewer";
import {
  SelectetRefCurrencies,
  SelectetCurrency,
  SelectedDateFrom,
  SelectedDateTo
} from "./reducers/Filter/FilterReducers";

const SearchButton = () => {
  const dispatch = useDispatch();
  const currency = useSelector(SelectetCurrency);
  const DateFrom = useSelector(SelectedDateFrom);
  const DateTo = useSelector(SelectedDateTo);
  const WalutyRef = useSelector(SelectetRefCurrencies);
  const WalutyFetchStatus = useSelector(WalutyKursy).status;
  const Progress = useSelector(WalutyKursy).progress;
  const Token = useSelector(WalutyKursy).Token;
  const [MonitorTrigger, SetMonitorTrigger] = useState(0);
  const MonitorProgress = (pToken) => {
    if (WalutyFetchStatus == "loading") {
    }
  };
  useEffect(() => {
    setTimeout(() => {
      if (WalutyFetchStatus == "loading")
        dispatch(GetProgressfetchWaluty({ Token: Token }));
      SetMonitorTrigger(MonitorTrigger + 1);
    }, 1000);
  }, [MonitorTrigger, WalutyFetchStatus]);

  const GetCurrencyData = () => {
    let lToken = Math.round(Math.random() * 10000000);
    dispatch(
      fetchWalutyKursy({ currency, DateFrom, DateTo, WalutyRef, Token: lToken })
    );
  };
  return (
    <button className="btn btn-primary" onClick={GetCurrencyData}>
      Pobierz dane
    </button>
  );
};

const WalutyLookup = ({ items }) => {
  const dispatch = useDispatch();
  const OnChangeWaluta = (waluta) => {
    const table = items.filter((item) => {
      return item.code == waluta;
    })[0].table;
    dispatch(WalutaChanged({ code: waluta, table: table }));
  };
  return <LookupSelector Items={items} pOnChangeSelect={OnChangeWaluta} />;
};

const WalutyPanel = () => {
  const dispatch = useDispatch();

  const FechtWalutyStatus = useSelector(
    (state) => state.Main.stateWalutyAll.status
  );

  useEffect(() => {
    if (FechtWalutyStatus === "idle") {
      dispatch(fetchWaluty());
    }
  }, [FechtWalutyStatus, dispatch]);

  const arrCurrencyItemsAllChecks = useSelector(CurrencyItemsAllChecks);
  const arrCurrencyItemsAllLookup = useSelector(CurrencyItemsAllLookup);
  return (
    <div className="container">
      <br />
      <WalutyReferencyjne items={arrCurrencyItemsAllChecks} />
      <br />
      <WalutyLookup items={arrCurrencyItemsAllLookup} />
      <br />
      <DateFilter />
      <br />
      <SearchButton />
      <br />

      <br />
      <KursyViewer />
      <br />
      <ErrorViewer />
      <br />
      <FilterDebuger />
    </div>
  );
};

export default WalutyPanel;
