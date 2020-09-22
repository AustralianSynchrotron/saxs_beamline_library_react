import React, { Component, useState } from "react";
import { connect } from "react-redux";

import * as actionCreators from "../../actions/index";

import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { makeStyles } from "@material-ui/styles";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import green from "@material-ui/core/colors/green";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";
import grey from "@material-ui/core/colors/grey";

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
  button: {
    color: "white",
    height: 48,
    "&:hover": {
      backgroundColor: blue["A700"],
    },
  },

  formControl: {
    margin: 25,
    minWidth: 200,
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

  item: {
    margin: "10px",
  },
});

const MailInPage = (props) => {
  const classes = useStyles();
  const [measurementtype, setType] = React.useState("plates");
  const handleTypeChange = (event) => {
    setType(event.target.value);
    //actionCreators.getMailinEpns(type);
    setEpns([Math.floor(Math.random()*15000), Math.floor(Math.random()*15000), Math.floor(Math.random()*15000), Math.floor(Math.random()*15000), Math.floor(Math.random()*15000)])
  };

  const [epns, setEpns]  =  React.useState([]); // these should be in redux when we couple the reducers in.

  const [plates, setPlates] = React.useState([]); // these should be in redux when we couple the reducers in.

  const [epn, setEPN] = React.useState("");
  
  const handleEpnChange = (event) => {
    setEPN(event.target.value);
    //actionCreators.getMailinPlates(type, epn);
    setPlates([1, 1 + Math.floor(Math.random()*2), 2 + Math.floor(Math.random()*2), 3 + Math.floor(Math.random()*2)]);
  };

  const [plate, setPlate] = React.useState("");
  const handlePlateChange = (event) => {
    setPlate(event.target.value);
  };
  return (
    <React.Fragment>
      <Grid container alignItems='center'>
        <Grid></Grid>
        <Grid>
          <FormControl className={classes.formControl}>
            <InputLabel id="mailin-type">Measurement type</InputLabel>
            <Select
              labelId="mailin-type-select-label"
              id="mailin-type-select"
              value={measurementtype}
              onChange={handleTypeChange}
            >
              <MenuItem value="plates">Plates</MenuItem>
              <MenuItem value="wellplates">Well Plates</MenuItem>
              <MenuItem value="capillaries">Capillaries</MenuItem>
              <MenuItem value="autoloader">Autoloader</MenuItem>
              <MenuItem value="HPLC">HPLC</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid>
          {/* <Button id="update-epns" className={classes.button}>
            Update EPNs
          </Button> */}
        </Grid>
        <Grid>
          <FormControl className={classes.formControl}>
            <InputLabel id="epn">EPN</InputLabel>
            <Select
              labelId="epn-select-label"
              id="epn-select"
              value={epn}
              onChange={handleEpnChange}
            >
              {epns.map((val) => (
                <MenuItem value={val}> {val} </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid>
          {/* <Button id="update-sample-holders" className={classes.button}>
            Update Sample Holder
          </Button> */}
        </Grid>
        <Grid>
          <FormControl className={classes.formControl}>
            <InputLabel id="sample-holder">Sample Holder</InputLabel>
            <Select
              labelId="sample-holder-select-label"
              id="sample-holder-select"
              value={plate}
              onChange={handlePlateChange}
            >
              {plates.map((val) => (
                <MenuItem value={val}> {val} </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid>
            <Button id="run-mail-in" className={classes.button}>GO!</Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default MailInPage;
