import React, { Component, useState, useEffect } from "react";
import { GetMatrixDays } from "./CalendarFuncs";
const weekDays = ["Pn", "Wt", "Śr", "Cz", "Pt", "So", "N"];
const CalendarGrid = ({ pDate }) => {
  const DaysMatrix = GetMatrixDays(pDate);
  const content = DaysMatrix.map((week) => {
    const content = week.map((day) => {
      return day + " ";
    });
    return <div>{content}</div>;
  });
  const header = weekDays.map((day) => {
    return day + " ";
  });
  //console.log('content',content)
  return (
    <div>
      {header}
      {content}
    </div>
  );
};

export default CalendarGrid;
