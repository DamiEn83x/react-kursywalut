import React, { Component, useState, useEffect } from "react";
import { Button, Popover, PopoverBody } from "reactstrap";

const MyBootstrapDatePicker = () => {
  const [isOpen, setisOpen] = useState(false);
  const [tekst, settekst] = useState(0);
  const toggle = () => {
    setisOpen(!isOpen);
  };
  return (
    <div>
      {" "}
      <input
        type="text"
        value={tekst}
        className="form-control"
        id="trigger_button"
        onClick={toggle}
      />
      <Popover
        id="popover_layer"
        placement="bottom"
        isOpen={isOpen}
        target="trigger_button"
        toggle={toggle}
      >
        <PopoverBody>
          <h1
            onClick={() => {
              settekst(tekst + 1);
              toggle();
            }}
          >
            Calendar
          </h1>
        </PopoverBody>
      </Popover>
    </div>
  );
};
//<input className="form-control"  data-toggle="popover" data-placement="top"  />

export default MyBootstrapDatePicker;
