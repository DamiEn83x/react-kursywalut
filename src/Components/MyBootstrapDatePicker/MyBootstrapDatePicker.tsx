import React, { Component, useState, useEffect } from "react";
import { Button, Popover, PopoverBody } from "reactstrap";
import CalendarGrid from "./CalendarGrid";

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

  const toggle = (ptoogle) => {
    setisOpen(!isOpen);
  };

  const InitialDate = pDate == undefined ? new Date() : new Date(pDate);
  const [sDate, setsDate] = useState(InitialDate);
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
          <h1>{yyyymmdd(sDate)}</h1>
          <CalendarGrid pDate={sDate} />
        </PopoverBody>
      </Popover>
    </div>
  );
};
//<input className="form-control"  data-toggle="popover" data-placement="top"  />

export default MyBootstrapDatePicker;
