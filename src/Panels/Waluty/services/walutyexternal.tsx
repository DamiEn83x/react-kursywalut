import { Observable, throwError } from "rxjs";
import fetch from "./fetchmodulewraper";
const CURR_SERVICE_API: string = "https://currencyservice.damiand1.repl.co";

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
          console.log("response", response);
          return response.json();
        })
        .then((res) => {
          console.log("res", res);
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

  GetCurrencyPowerChanges(
    cur: string,
    table: string,
    DayFrom: Date,
    DayTo: Date,
    tabelaWalut: string[]
  ) {
    return new Promise((resolve, reject) => {
      let url = CURR_SERVICE_API;
      let Done = false;
      let Token = Math.round(Math.random() * 10000);
      fetch(url, {
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
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          let tabelaZbiorcza = new Object();

          res.forEach((obj) => {
            tabelaZbiorcza[obj.date] = {
              date: obj.date,
              Wskaznik: obj.Wskaznik
            };
          });

          Done = true;
          resolve({
            datatype: "dataoutput",
            data: tabelaZbiorcza
          });
        }); //(url, {responseType: 'json'});
      /*let http = this.http;

      let CheProgress = function () {
        setTimeout(function () {
          http
            .post<any>(
              url,
              {
                Query: "GetDataProgress",
                Token: Token
              },
              httpOptions
            )
            .subscribe((res) => {
              // console.log('observer.next '+JSON.stringify(res));
              if (res.datatype == "progress") {
                observer.next(res);
              }

              if (!Done) {
                CheProgress();
              }
            });
        }, 300);
      };
      CheProgress();
    }); */
    });
  }
}

export default WalutyExternal;
