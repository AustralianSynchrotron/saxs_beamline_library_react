import React, { Component } from "react";
import { connect } from "react-redux";

import * as actionCreators from "../../actions/index";

import green from "@material-ui/core/colors/green";

import { makeStyles } from "@material-ui/styles";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import classNames from "classnames";
import red from "@material-ui/core/colors/red";
import grey from "@material-ui/core/colors/grey";
import Grid from "@material-ui/core/Grid";

import VacComponent from "../vac_component/vacComponent";
import ManualPumpControl from "../vac_component/ManualPumpControl";
import ManualBackingPumpControl from "../vac_component/ManualBackingPumpControl";
import ManualValveControl from "../vac_component/ManualValveControl";
import Canvas from '../vac_component/VacDiagram'
import { Typography } from "@material-ui/core";


const useStyles = makeStyles({
  hidden: { display: "None" },
  showButton: { marginTop: 0 },
  slider: { flexDirection: "row" },
  cssOutlinedInput: {
    "&:not(hover):not($disabled):not($cssFocused):not($error) $notchedOutline": {
      borderColor: "red", //default
    },
  },
  second: {
    background: green[500],
    color: "white",
    height: 48,
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  first: {
    background: red[500],
    color: "white",
    height: 48,
    "&:hover": {
      backgroundColor: red["A700"],
    },
  },

  notchedOutline: {},
  error: {},
  disabled: {},
  horizontal: {
    display: "flex",
    flexDireciton: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  vertical: {
    display: "flex",
    flexDireciton: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  statusfield: {
    padding: "2px",
    background: grey["900"],
  },

  padding: {
    padding: "3px",
  },

  horizontal: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "left",
    alignItems: "center",
    padding: "10px",
  },

  item: {
    margin: "10px",
  },
});


const VacuumPage = (props) => {
  const classes = useStyles();
  return (
    <React.Fragment>

    <div>
      <h1>this is a test</h1>
      <Canvas />
    </div>
    </React.Fragment>
   );
  };
export default VacuumPage;
