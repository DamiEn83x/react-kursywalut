import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { WalutyKursy } from "../reducers/MainReducer";
import Chart from "./Chart";

const KursyViewer = () => {
  const Kursy = useSelector(WalutyKursy);
  const ContentArray = Object.values(Kursy.walutyKursy);
  const content =
    Kursy.status == "idle" ? null : Kursy.status == "loading" ? (
      <div>
        <div className="d-flex justify-content-center">
          <div
            className="spinner-border text-primary m-5"
            style={{ width: "6rem", height: "6rem" }}
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
        <div className="progress">
          <div
            class="progress-bar"
            role="progressbar"
            style={{ width: Kursy.progress + "%" }}
            aria-valuenow={Kursy.progress}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </div>
    ) : (
      <Chart
        data={ContentArray.map((item) => {
          return Math.round(item.Wskaznik * 1000) / 1000;
        })}
        labels={ContentArray.map((item) => {
          return item.date;
        })}
      />
    );

  return (
    <div className="card">
      <div className="card-header bg-primary text-white">Waluty view</div>
      <div className="card-body">{content}</div>
    </div>
  );
};

export default KursyViewer;
