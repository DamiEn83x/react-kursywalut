import React from "react";

import MyBootstrapDatePicker from "../MyBootstrapDatePicker";
import { render, fireEvent } from "@testing-library/react";
import { GetMatrixDays } from "../CalendarFuncs";

describe("CheckBoxList component tests", () => {
  it("renders without crashing", () => {
    const renderer = render(<MyBootstrapDatePicker />);
  });
  it("Callback without change value", () => {
    const MockedCallback = jest.fn();
    render(<MyBootstrapDatePicker pCallbackChange={MockedCallback} />);
    expect(MockedCallback.mock.calls.length).toBe(0);

    render(
      <MyBootstrapDatePicker
        pDate="2020-01-01"
        pCallbackChange={MockedCallback}
      />
    );
    expect(MockedCallback.mock.calls.length).toBe(0);
  });
  it("text displayed with the default value", () => {
    const yyyymmdd = (pDate) => {
      var mm = pDate.getMonth() + 1; // getMonth() is zero-based
      var dd = pDate.getDate();
      return [
        pDate.getFullYear(),
        (mm > 9 ? "" : "0") + mm,
        (dd > 9 ? "" : "0") + dd
      ].join("-");
    };
    expect(yyyymmdd(new Date("2020-02-01"))).toBe("2020-02-01");

    const renderer = render(<MyBootstrapDatePicker pDate="2020-02-01" />);
    expect(renderer.getByTestId("inputCalendar").value).toBe("2020-02-01");

    /* let CurrDate = new Date();
    renderer = render(<MyBootstrapDatePicker />);
    expect(renderer.getByTestId("inputCalendar").value).toBe(
      yyyymmdd(CurrDate)*/
  });

  it("text displayed without  default value", () => {
    const yyyymmdd = (pDate) => {
      var mm = pDate.getMonth() + 1; // getMonth() is zero-based
      var dd = pDate.getDate();
      return [
        pDate.getFullYear(),
        (mm > 9 ? "" : "0") + mm,
        (dd > 9 ? "" : "0") + dd
      ].join("-");
    };
    expect(yyyymmdd(new Date("2020-02-01"))).toBe("2020-02-01");

    let CurrDate = new Date();
    const renderer = render(<MyBootstrapDatePicker />);
    expect(renderer.getByTestId("inputCalendar").value).toBe(
      yyyymmdd(CurrDate)
    );
  });
  it("GetMatrixDays", () => {
    const DaysMatrix = [
      [undefined, undefined, undefined, 1, 2, 3, 4],
      [5, 6, 7, 8, 9, 10, 11],
      [12, 13, 14, 15, 16, 17, 18],
      [19, 20, 21, 22, 23, 24, 25],
      [26, 27, 28, 29, 30, 31, undefined]
    ];
    //console.log(GetMatrixDays(new Date("2020-10-10")));
    expect(GetMatrixDays(new Date("2020-10-10"))).toEqual(DaysMatrix);

    const DaysMatrix2 = [
      [undefined, undefined, undefined, undefined, undefined, undefined, 1],
      [2, 3, 4, 5, 6, 7, 8],
      [9, 10, 11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20, 21, 22],
      [23, 24, 25, 26, 27, 28, 29],
      [30, undefined, undefined, undefined, undefined, undefined, undefined]
    ];
    //console.log(GetMatrixDays(new Date("2020-11-10")));
    expect(GetMatrixDays(new Date("2020-11-10"))).toEqual(DaysMatrix2);
  });
});
