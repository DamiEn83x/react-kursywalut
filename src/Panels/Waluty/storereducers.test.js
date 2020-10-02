import React from "react";
import store from "./store";
import {
  WalutaChanged,
  walutyRefChanged,
  DateRangeChanged,
  SelectetAvaibleCurrencies,
  SelectetRefCurrencies,
  SelectetCurrency,
  SelectedDateFrom,
  SelectedDateTo
} from "./reducers/Filter/FilterReducers";
describe("Test Reducers,actions nad states in ReduxStore", () => {
  it("Test correct states", () => {
    let WalutyRef = ["USD", "EUR", "GBP", "THB"];

    store.dispatch(walutyRefChanged(WalutyRef));

    store.dispatch(WalutaChanged({ code: "PLN", table: "A" }));
    store.dispatch(
      DateRangeChanged({ DateFrom: "2020-01-01", DateTo: "2020-06-01" })
    );

    // grab current state
    const state = store.getState();

    expect([...SelectetRefCurrencies(state)].sort()).toEqual(
      ["USD", "EUR", "GBP", "THB"].sort()
    );
    expect(SelectetCurrency(state)).toEqual({ code: "PLN", table: "A" });

    expect(SelectedDateFrom(state)).toEqual("2020-01-01");

    expect(SelectedDateTo(state)).toEqual("2020-06-01");
  });
});
