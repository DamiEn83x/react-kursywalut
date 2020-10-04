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
  WalutyKursy,
  fetchWaluty,
  fetchWalutyKursy,
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

  it("test load proper  ref currencies", (done) => {
    const MockedFetchFuncion = jest.fn().mockReturnValue(
      new Promise((resolve, reject) => {
        resolve(
          new Response(
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
                  {
                    currency: "afgani (Afganistan)",
                    code: "AFN",
                    mid: 0.050061
                  },
                  {
                    currency: "ariary (Madagaskar)",
                    code: "MGA",
                    mid: 0.000991
                  },
                  { currency: "balboa (Panama)", code: "PAB", mid: 3.8658 }
                ]
              }
            ])
          )
        );
      })
    );
    EnableMockFetch(MockedFetchFuncion);
    store.dispatch(fetchWaluty());
    DisableMockFetch();

    expect(MockedFetchFuncion.mock.calls.length).toBe(1);

    setTimeout(() => {
      try {
        const state = store.getState();
        expect(CurrencyItemsAllChecks(state)).toEqual([
          { code: "PLN", name: "Polski złoty", table: "A" },
          { code: "THB", name: "bat (Tajlandia)", table: "A" },
          { code: "USD", name: "dolar amerykański", table: "A" },
          { code: "AUD", name: "dolar australijski", table: "A" }
        ]);
        expect(CurrencyItemsAllLookup(state)).toEqual([
          { code: "PLN", name: "Polski złoty", table: "A" },
          { code: "THB", name: "bat (Tajlandia)", table: "A" },
          { code: "USD", name: "dolar amerykański", table: "A" },
          { code: "AUD", name: "dolar australijski", table: "A" },
          { code: "AFN", name: "afgani (Afganistan)", table: "B" },
          { code: "MGA", name: "ariary (Madagaskar)", table: "B" },
          { code: "PAB", name: "balboa (Panama)", table: "B" }
        ]);
        done();
      } catch (error) {
        done(error);
      }
    }, 300);
  });

  it("test states to api parameters", (done) => {
    const MockedFetchFuncion = jest.fn().mockReturnValue(
      new Promise((resolve, reject) => {
        resolve(
          new Response(
            JSON.stringify([
              {
                date: "2020-04-07",
                CenaIlosciBazowej: 35,
                Wskaznik: 1
              },
              {
                date: "2020-04-08",
                CenaIlosciBazowej: 34.98840081521338,
                Wskaznik: 1.000331515145487
              }
            ])
          )
        );
      })
    );
    EnableMockFetch(MockedFetchFuncion);
    store.dispatch(
      fetchWalutyKursy({
        currency: "PLN",
        DateFrom: "2020-01-01",
        DateTo: "2020-06-01",
        WalutyRef: ["USD", "EUR", "GBP", "THB"]
      })
    );
    DisableMockFetch();
    expect(MockedFetchFuncion.mock.calls[0][0]).toEqual(
      "https://currencyservice.damiand1.repl.co"
    );
    expect(JSON.parse(MockedFetchFuncion.mock.calls[0][1].body).Query).toEqual(
      "GetCurrencyPowerChanges"
    );
    expect(
      JSON.parse(MockedFetchFuncion.mock.calls[0][1].body).DayFrom
    ).toEqual("2020-01-01");
    expect(JSON.parse(MockedFetchFuncion.mock.calls[0][1].body).DayTo).toEqual(
      "2020-06-01"
    );
    expect(
      JSON.parse(
        JSON.parse(MockedFetchFuncion.mock.calls[0][1].body).tabelaWalut
      )
    ).toEqual(["USD", "EUR", "GBP", "THB"]);

    setTimeout(() => {
      try {
        const state = store.getState();
        expect(WalutyKursy(state)).toEqual({
          error: "",
          status: "succeeded",
          walutyKursy: {
            "2020-04-07": { Wskaznik: 1, date: "2020-04-07" },
            "2020-04-08": { Wskaznik: 1.000331515145487, date: "2020-04-08" }
          }
        });
        done();
      } catch (error) {
        done(error);
      }
    }, 300);
  });
});
