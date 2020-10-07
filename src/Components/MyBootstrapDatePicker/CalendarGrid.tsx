import React, { Component, useState, useEffect } from "react";
import { GetMatrixDays } from "./CalendarFuncs";
const weekDays = ["Pn", "Wt", "Śr", "Cz", "Pt", "So", "N"];
const CalendarGrid = ({ pDate, pMonth, pYear }) => {
  const DaysMatrix = GetMatrixDays(pMonth, pYear);
  const header = (
    <tr>
      {weekDays.map((day) => {
        return <td>{day}</td>;
      })}
    </tr>
  );
  const content = (
    <table>
      {header}
      {DaysMatrix.map((week) => {
        const content = week.map((day) => {
          return (
            <td>
              {day != undefined ? (
                <button
                  type="button"
                  className="btn btn-light btn-sm btn-block"
                >
                  {day}
                </button>
              ) : (
                ""
              )}
            </td>
          );
        });
        return <tr>{content}</tr>;
      })}
    </table>
  );

  //console.log('content',content)
  return <div>{content}</div>;
};

export default CalendarGrid;
