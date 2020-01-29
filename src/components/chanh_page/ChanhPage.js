import React, { Component } from "react";
import { makeStyles, getThemeProps } from "@material-ui/styles";
import {
  OphydMotorCompact,
  OphydSlider,
  OphydMotorBundleCompact,
  OphydStatusField,
  OphydTextField
} from "../ophyd_components/ophyd_components";
import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";

import green from "@material-ui/core/colors/green";
import grey from "@material-ui/core/colors/grey";
import red from "@material-ui/core/colors/red";

const useStyles = makeStyles({
  hidden: { display: "None" },
  showButton: { marginTop: 0 },
  slider: { flexDirection: "row" },
  cssOutlinedInput: {
    "&:not(hover):not($disabled):not($cssFocused):not($error) $notchedOutline": {
      borderColor: "red" //default
    }
  },
  second: {
    background: green[500],
    color: "white",
    height: 48,
    "&:hover": {
      backgroundColor: green[700]
    }
  },
  first: {
    background: red[500],
    color: "white",
    height: 48,
    "&:hover": {
      backgroundColor: red["A700"]
    }
  },

  notchedOutline: {},
  error: {},
  disabled: {},
  horizontal: {
    display: "flex",
    flexDireciton: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  vertical: {
    display: "flex",
    flexDireciton: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  statusfield: {
    padding: "2px",
    background: grey["900"]
  },

  padding: {
    padding: "3px"
  },

  horizontal: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "left",
    alignItems: "center",
    padding: "10px"
  }
});

const ChanhPage = props => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid container className={classes.root} spacing={5} direction="column">
        <Grid item />
        <Grid container direction="row">
          <Grid item>
            <OphydMotorCompact label="Pin Hole X" device="saxs_motors.mc8.c" />
          </Grid>
          <Grid item>
            <OphydMotorCompact label="Pin Hole Y" device="saxs_motors.mc8.d" />
          </Grid>
        </Grid>
        <Grid container direction="row">
          <Grid item>
            <OphydMotorCompact label="Sample X" device="saxs_motors.mc8.e" />
          </Grid>
          <Grid item>
            <OphydMotorCompact label="Sample Y" device="saxs_motors.mc8.f" />
          </Grid>
        </Grid>
        <Grid container direction="row">
          <Grid item>
            <OphydMotorCompact label="Andor X" device="saxs_motors.sample_table.z" />
          </Grid>
          <Grid item>
            <OphydMotorCompact label="Andor Y" device="saxs_motors.sample_table.y" />
          </Grid>
        </Grid>
        <Grid container direction="row">
          <Grid item>
            <OphydMotorCompact label="Andor Z Top" device="saxs_motors.mc8.g" />
          </Grid>
          <Grid item>
            <OphydMotorCompact label="Andor Z Bottom" device="saxs_motors.sample_table.x" />
          </Grid>
        </Grid>
        {/* <Grid container direction="row">
          <Grid item>
            <OphydTextField label="Slit 1 Width" device="saxs_slits.slit1.x_width" />
          </Grid>
          <Grid item>
            <OphydTextField label="Slit 1 Height" device="saxs_slits.slit1.y_width" />
          </Grid>
        </Grid>
        <Grid container direction="row">
          <Grid item>
            <OphydTextField label="Slit 3a Width" device="saxs_slits.slit_3A.x_width" />
          </Grid>
          <Grid item>
            <OphydTextField label="Slit 3a Height" device="saxs_slits.slit_3A.y_width" />
          </Grid>
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
};
export default ChanhPage;
