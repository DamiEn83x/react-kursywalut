import { Observable, throwError } from "rxjs";
import fetch from "./fetchmodulewraper";
//const CURR_SERVICE_API: string = "https://currencyservice.damiand1.repl.co";
export const CURR_SERVICE_API: string = "https://walutynode.herokuapp.com/";

class WalutyExternal {
  constructor() {}

  GettabelaWalutA() {
    return new Promise((resolve, reject) => {
      let url = CURR_SERVICE_API + "/?query=GettabelaWalutA";
      // console.log(url);
      fetch(url, {
        method: "get",
        headers: new Headers({})
      })
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          let out = res[0]["rates"].map((rate) => {
            return {
              table: "A",
              code: rate.code,
              name: rate.currency
            };
          });
          resolve({ data: out });
        })
        .catch((err) => {
          if (typeof err.text === "function") {
            err.text().then((errorMessage) => {
              reject(errorMessage);
              return errorMessage;
            });
          } else {
            reject(err);
            return err;
          }
        });
    });
  }
  GettabelaWalutAB() {
    return new Promise((resolve, reject) => {
      let url = CURR_SERVICE_API + "/?query=GettabelaWalutAB";
      // DoFakeFetch =true;
      //EnableMockFetch(true,[''])
      fetch(url, {
        method: "get",
        headers: new Headers({})
      })
        .then((response) => {
          //console.log("response", response);
          return response.json();
        })
        .then((res) => {
          let outA = res[0]["rates"].map((rate) => {
            return {
              table: "A",
              code: rate.code,
              name: rate.currency
            };
          });
          let outB = res[1]["rates"].map((rate) => {
            return {
              table: "B",
              code: rate.code,
              name: rate.currency
            };
          });
          // console.log(out);
          resolve({ data: { WalutyA: outA, WalutyB: outB } });
        })
        .catch((err) => {
          if (typeof err.text === "function") {
            err.text().then((errorMessage) => {
              reject(errorMessage);
              return errorMessage;
            });
          } else {
            reject(err);
            return err;
          }
        });
    });
  }
  GetProgressPowerChanges(Token) {
    return new Promise((resolve, reject) => {
      let url = CURR_SERVICE_API;

      fetch(url, {
        credentials: "include",
        method: "post",
        body: JSON.stringify({
          Query: "GetDataProgress",
          Token: Token
        }),
        headers: { "Content-Type": "application/json" }
      })
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          console.log("res", res);
          resolve({
            datatype: "dataoutput",
            data: res.data
          });
        });
    });
  }

  GetCurrencyPowerChanges(
    cur: string,
    table: string,
    DayFrom: Date,
    DayTo: Date,
    tabelaWalut: string[],
    Token
  ) {
    return new Promise((resolve, reject) => {
      let url = CURR_SERVICE_API;
      fetch(url, {
        credentials: "include",
        method: "post",
        body: JSON.stringify({
          Query: "GetCurrencyPowerChanges",
          DayFrom: DayFrom,
          DayTo: DayTo,
          tabelaWalut: JSON.stringify(tabelaWalut),
          Curr: cur,
          Token: Token,
          Table: table
        }),
        headers: { "Content-Type": "application/json" }
      })
        .catch((error) => {
          reject(error);
        })
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          // console.log("res", res);
          let tabelaZbiorcza = new Object();

          res.forEach((obj) => {
            tabelaZbiorcza[obj.date] = {
              date: obj.date,
              Wskaznik: obj.Wskaznik
            };
          });

          //Done = true;
          resolve({
            datatype: "dataoutput",
            data: tabelaZbiorcza
          });
        });
    });
  }
}

export default WalutyExternal;
