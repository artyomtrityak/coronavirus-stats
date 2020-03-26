import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import "./styles.css";

function convertToDate(input: number) {
  const year = +String(input).slice(0, 4);
  let month = +String(input).slice(4, 6);
  month--;
  const day = +String(input).slice(6);
  return new Date(year, month, day);
}

export default (props: any) => {
  const { x, y, line, dailyData } = props;
  if (!dailyData) {
    return null;
  }

  return (
    <>
      <path d={line(dailyData)} className="line" />
      {dailyData.map((d: any) => {
        const cx = x(convertToDate(d.date));
        const cy = y(d.totalTestResults);
        return <circle key={d.date} className="line-point" cx={cx} cy={cy} r={4} />;
      })}
    </>
  );
};
