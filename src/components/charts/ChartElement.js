import React, { Component } from "react";
import { makeStyles, getThemeProps } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  ValeScale,
  SplineSeries,
  LineSeries,
  ScatterSeries,
  BarSeries
} from "@devexpress/dx-react-chart-material-ui";
import { ArgumentScale, Stack } from "@devexpress/dx-react-chart";
import { scaleBand } from "@devexpress/dx-chart-core";
import { strict } from "assert";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    width: "350px",
    justifyContent: "center",
    alignItems: "center",
    padding: "1px"
  }
});

class ChartElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customTimeOpen: false,
      staff: false,
      password: ""
    };
  }

  renderLineSeries = () => {
    return [...Array(this.props.numplots).keys()].map(el => {
      return <LineSeries valueField={"y" + el} argumentField={"x" + el} />;
    });
  };
  renderScatterSeries = () => {
    return [...Array(this.props.numplots).keys()].map(el => {
      return <ScatterSeries valueField={"y" + el} argumentField={"x" + el} />;
    });
  };
  renderBarSeries = () => {
    return [...Array(this.props.numplots).keys()].map(el => {
      return <BarSeries valueField={"y" + el} argumentField={"x" + el} />;
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper>
          <Chart
            data={this.props.data}
            width={this.props.width !== undefined ? this.props.width : 300}
            height={this.props.height !== undefined ? this.props.height : 500}
          >
            {this.props.type === "Bar" ? <ArgumentScale factory={scaleBand} /> : null}
            <ArgumentAxis />
            <ArgumentAxis.Label text="Y Axis" />

            <ValueAxis />
            {this.props.type === "Scatter"
              ? this.renderScatterSeries(10)
              : this.props.type === "Line"
              ? this.renderLineSeries(10)
              : this.props.type === "Bar"
              ? this.renderBarSeries(10)
              : this.renderScatterSeries(10)}
          </Chart>
        </Paper>
      </div>
    );
  }
}

export default ChartElement;
