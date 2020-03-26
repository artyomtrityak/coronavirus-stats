import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import Loader from "../loader";
import "./styles.css";
import Line from "./line";
import { convertToDate } from "./utils";

function useData() {
  const [loading, setLoading] = useState(true);
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        let data = await fetch(`https://covidtracking.com/api/us/daily`);
        data = await data.json();
        setDailyData(data as any); // TODO: put correct type
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    })();
  }, []);

  return { loading, dailyData };
}

function useD3(dailyData: any, svgContainerRef: any) {
  const [ d3Params, setD3Params ] = useState() as any;

  useEffect(() => {
    if (!dailyData || !dailyData[0] || !svgContainerRef) {
      return;
    }
    
    console.log(dailyData);

    const minDate = convertToDate(dailyData[dailyData.length - 1].date);
    const maxDate = convertToDate(dailyData[0].date);
    const maxCases = dailyData.reduce((result: number, d: any) => {
      return Math.max(result, d.totalTestResults);
    }, 0);

    console.log(maxCases);

    const elementSize = svgContainerRef.current.getBoundingClientRect();
    const x = d3.scaleTime()
      .domain([minDate, maxDate])
      .range([0, elementSize.width - 100]);

    const y = d3.scaleLinear()
      .domain([0, maxCases])
      .range([elementSize.height - 100, 0]);

    const line = d3.line()
      .x(function(d: any) { return x(convertToDate(d.date)); })
      .y(function(d: any) { return y(d.totalTestResults); });

    console.log();

    setD3Params({ x, y, line });

  }, [dailyData, svgContainerRef]);

  return d3Params;
}

// U.S. daily https://covidtracking.com/api/us/daily | https://covidtracking.com/api/us
export default () => {
  const svgContainerRef = useRef<any>();
  const { loading, dailyData } = useData();
  const d3Params = useD3(dailyData, svgContainerRef);

  return (
    <div className="row">
      <div className="col chart-container">
        {loading ? <Loader /> : null}
        <svg className="chart-svg" ref={svgContainerRef}>
          {d3Params ? <g style={{"transform": "translate(50px, 50px)"}}>
            <Line {...d3Params} dailyData={dailyData} />
          </g> : null}
        </svg>
      </div>
    </div>
  );
};
