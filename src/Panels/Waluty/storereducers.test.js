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
import {
  fetchWaluty,
  CurrencyItemsAllChecks,
  CurrencyItemsAllLookup
} from "./reducers/MainReducer";
import {
  EnableMockFetch,
  DisableMockFetch
} from "./services/fetchmodulewraper";
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

  it("test load proper  ref currencies", () => {
    const MockedFetchFuncion = jest.fn().mockReturnValue(
      new Promise((resolve, reject) => {
        resolve(
          JSON.stringify([
            {
              table: "A",
              no: "193/A/NBP/2020",
              effectiveDate: "2020-10-02",
              rates: [
                { currency: "bat (Tajlandia)", code: "THB", mid: 0.1213 },
                { currency: "dolar amerykański", code: "USD", mid: 3.8366 },
                { currency: "dolar australijski", code: "AUD", mid: 2.7425 }
              ]
            },
            {
              table: "B",
              no: "039/B/NBP/2020",
              effectiveDate: "2020-09-30",
              rates: [
                { currency: "afgani (Afganistan)", code: "AFN", mid: 0.050061 },
                { currency: "ariary (Madagaskar)", code: "MGA", mid: 0.000991 },
                { currency: "balboa (Panama)", code: "PAB", mid: 3.8658 }
              ]
            }
          ])
        );
      })
    );
    EnableMockFetch(MockedFetchFuncion);
    store.dispatch(fetchWaluty());
    DisableMockFetch();

    expect(MockedFetchFuncion.mock.calls.length).toBe(1);
    const state = store.getState();
    expect(CurrencyItemsAllChecks(state)).toEqual({ code: "PLN", table: "A" });
    expect(CurrencyItemsAllLookup(state)).toEqual({ code: "PLN", table: "A" });
  });

  it("test states to api parameters", () => {
    let WalutyRef = ["USD", "EUR", "GBP", "THB"];

    store.dispatch(walutyRefChanged(WalutyRef));

    store.dispatch(WalutaChanged({ code: "PLN", table: "A" }));
    store.dispatch(
      DateRangeChanged({ DateFrom: "2020-01-01", DateTo: "2020-06-01" })
    );
  });
});
