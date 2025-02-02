import { scaleBand } from "@devexpress/dx-chart-core";
import { ArgumentScale } from "@devexpress/dx-react-chart";
import {
  ArgumentAxis,
  BarSeries,
  Chart,
  LineSeries,
  ScatterSeries,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    width: "350px",
    justifyContent: "center",
    alignItems: "center",
    padding: "1px",
  },
});

const ChartElement = (props) => {
  const classes = useStyles();

  const renderLineSeries = () =>
    [...Array(props.numplots).keys()].map((el) => (
      <LineSeries valueField={"y" + el} argumentField={"x" + el} />
    ));
  const renderScatterSeries = () =>
    [...Array(props.numplots).keys()].map((el) => (
      <ScatterSeries valueField={"y" + el} argumentField={"x" + el} />
    ));
  const renderBarSeries = () =>
    [...Array(props.numplots).keys()].map((el) => (
      <BarSeries valueField={"y" + el} argumentField={"x" + el} />
    ));

  const AxisLabel = () => (
    <ValueAxis.Label text={props.xTitle !== undefined ? props.xTitle : "X Axis"} />
  );
  const YAxisLabel = () => (
    <ArgumentAxis.Label text={props.yTitle !== undefined ? props.yTitle : "Y Axis"} />
  );

  return (
    <div>
      <Paper>
        <Chart
          data={props.data}
          width={props.width !== undefined ? props.width : 300}
          height={props.height !== undefined ? props.height : 500}
        >
          {props.type === "Bar" ? <ArgumentScale factory={scaleBand} /> : null}
          <ArgumentAxis labelComponent={AxisLabel} />
          <ValueAxis labelComponent={YAxisLabel} />

          {props.type === "Scatter"
            ? renderScatterSeries()
            : props.type === "Line"
            ? renderLineSeries()
            : props.type === "Bar"
            ? renderBarSeries()
            : renderScatterSeries()}
        </Chart>
      </Paper>
    </div>
  );
};

export default ChartElement;
