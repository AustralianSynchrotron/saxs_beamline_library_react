import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../actions/index";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import grey from "@material-ui/core/colors/grey";
import ChartElement from "./ChartElement";

const styles = theme => ({
  root: {
    display: "flex",
    flexGrow: 1
  },

  button: {
    color: "white",
    margin: "2px",
    "&:hover": {
      color: "white"
    }
  },

  chip: {
    margin: "2px"
  },

  status: {
    color: grey["400"]
  },

  small_check: {
    width: "24px",
    height: "24px"
  },

  label: {
    color: grey["400"]
  },

  number: {
    height: "8px"
  }
});

var data = [
  { x0: 1, y0: 10 },
  { x0: 2, y0: 20 },
  { x0: 3, y0: 30 },
  { x1: 3, y1: 10 },
  { x1: 4, y1: 20 },
  { x1: 5, y1: 30 },
  { x2: 6, y2: 10 },
  { x2: 7, y2: 20 },
  { x2: 8, y2: 30 }
];

const ChartPage = props => {
  return (
    <React.Fragment>
      <div>
        <ChartElement numplots={10} data={data} type="Bar" />
      </div>
    </React.Fragment>
  );
};

export default ChartPage;
