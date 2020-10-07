import React, { Component, useState, useEffect } from "react";
import { Button, Popover, PopoverBody } from "reactstrap";
import CalendarGrid from "./CalendarGrid";
import CalendarNavigator from "./CalendarNavigator";

const yyyymmdd = (pDate) => {
  var mm = pDate.getMonth() + 1; // getMonth() is zero-based
  var dd = pDate.getDate();
  return [
    pDate.getFullYear(),
    (mm > 9 ? "" : "0") + mm,
    (dd > 9 ? "" : "0") + dd
  ].join("-");
};

const MyBootstrapDatePicker = ({ pDate, pCallbackChange }) => {
  const [isOpen, setisOpen] = useState(false);
  const InitialDate = pDate == undefined ? new Date() : new Date(pDate);
  const [sDate, setsDate] = useState(InitialDate);
  const [ShowedMonth, setShowedMonth] = useState(InitialDate.getMonth() + 1);
  const [ShowedYear, setShowedYear] = useState(InitialDate.getYear() + 1900);
  const toggle = (ptoogle) => {
    setisOpen(!isOpen);
  };

  const ChangedMonth = (pMonth, pYear) => {
    setShowedMonth(pMonth);
    setShowedYear(pYear);
  };

  return (
    <div>
      {" "}
      <input
        type="text"
        value={yyyymmdd(sDate)}
        className="form-control"
        data-testid="inputCalendar"
        id="trigger_button"
        onClick={() => {
          toggle(true);
        }}
      />
      <Popover
        id="popover_layer"
        placement="bottom"
        isOpen={isOpen}
        target="trigger_button"
        toggle={toggle}
        trigger="legacy"
      >
        <PopoverBody>
          <CalendarNavigator
            StartMonth={sDate.getMonth() + 1}
            StartYear={sDate.getYear() + 1900}
            ChangedMonthCallback={ChangedMonth}
          />
          <CalendarGrid pYear={ShowedYear} pMonth={ShowedMonth} pDate={sDate} />
        </PopoverBody>
      </Popover>
    </div>
  );
};
//<input className="form-control"  data-toggle="popover" data-placement="top"  />

export default MyBootstrapDatePicker;
