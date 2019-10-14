import React, { Component } from "react";
import { makeStyles, getThemeProps } from "@material-ui/styles";
import BrightnessLow from "@material-ui/icons/BrightnessLow";
import BrightnessHigh from "@material-ui/icons/BrightnessHigh";
import {
  OphydMotorCompact,
  OphydSlider,
  OphydMotorBundleCompact,
  OphydStatusField
} from "../ophyd_components/ophyd_components";
import Grid from "@material-ui/core/Grid";
import { Energy, Flux, SampleLights, CameraControls } from "./beamline_control_components";

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

const BeamlineControl = props => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid container className={classes.root} spacing={5} direction="column">
        <Grid item />
        <Grid
          container
          className={classes.root}
          spacing={5}
          direction="row"
          alignItems="baseline"
          justify="left"
        >
          <Grid item xs={4}>
            <Typography variant="h5">Beamline Status</Typography>
            <OphydStatusField
              printVal={true}
              label="Status of IOCs"
              device="EPICS_status_devices.epics_status.ioc_status"
            />
            <OphydStatusField
              printVal={true}
              label="Shutter Enable"
              device="EPICS_status_devices.epics_status.master_shutter_enable"
            />
            <OphydStatusField
              label="White Beam"
              device="EPICS_status_devices.epics_status.white_beam"
              printVal={true}
            />
            <OphydStatusField
              label="Mono Beam"
              device="EPICS_status_devices.epics_status.mono_beam"
              printVal={true}
            />
            <OphydStatusField
              printVal={true}
              label="Sample Shutter"
              device="EPICS_status_devices.epics_status.sample_shutter"
            />
            <OphydStatusField
              printVal={true}
              label="Beam on Sample?"
              device="EPICS_status_devices.epics_status.beam_on_sample"
            />
            <OphydStatusField
              printVal={true}
              label="Beam on Feedback?"
              device="EPICS_status_devices.epics_status.beam_on_fdbk"
            />

            <OphydStatusField
              printVal={true}
              label="Feedback Status"
              device="EPICS_status_devices.epics_status.feedback"
            />

            <OphydStatusField
              printVal={true}
              label="HFM FB in range?"
              device="EPICS_status_devices.epics_status.HFM_feedback"
            />

            <OphydStatusField
              printVal={true}
              label="VFM FB in range?"
              device="EPICS_status_devices.epics_status.VFM_feedback"
            />
            <OphydStatusField
              printVal={true}
              label="Attenuators"
              device="EPICS_status_devices.epics_status.attenuators"
            />

            <OphydStatusField
              printVal={true}
              label="Undulator Gap"
              device="EPICS_status_devices.epics_status.undulator_gap"
            />

            <OphydStatusField
              printVal={true}
              label="Undulator Taper"
              device="EPICS_status_devices.epics_status.undulator_taper"
            />
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={4}>
            <Typography variant="h5">Beamline Detectors and Diagnostics</Typography>
            <OphydStatusField
              label="Beamstop Counts"
              device="saxs_scaler.saxs_scaler.beamstop"
              toNumber={true}
            />

            <OphydStatusField
              label="Transmission Counts"
              device="saxs_scaler.saxs_scaler.transmission"
              toNumber={true}
            />

            <OphydStatusField
              label="I0 (QBPM2)"
              device="saxs_scaler.saxs_scaler.io"
              toNumber={true}
            />

            <OphydStatusField
              label="Alt I0 (QBPM3)"
              device="saxs_scaler.saxs_scaler.alt_io"
              toNumber={true}
            />

            <OphydStatusField
              label="DCM (QBPM1)"
              device="saxs_optics.dcm.dcm_qbpm"
              toNumber={true}
              suffix="uA"
            />

            <OphydStatusField
              label="Time (s)"
              device="saxs_scaler.saxs_scaler.transmission"
              toNumber={true}
            />
          </Grid>
        </Grid>
        <Grid item />
        <Grid
          container
          className={classes.root}
          spacing={5}
          direction="row"
          alignItems="baseline"
          justify="center"
        >
          <Grid item xs={10}>
            <Energy />
          </Grid>
        </Grid>
        <Grid item />
        <Grid
          container
          className={classes.root}
          spacing={2}
          direction="row"
          alignItems="baseline"
          justify="center"
          xs={12}
        >
          <Grid item xs={10}>
            <Flux />
          </Grid>
        </Grid>
        <Grid item />
        <Grid
          container
          className={classes.root}
          spacing={5}
          direction="row"
          alignItems="baseline"
          justify="center"
        >
          <Grid item xs={10}>
            <SampleLights />
          </Grid>
        </Grid>
        <Grid item />
        <Grid
          container
          className={classes.root}
          spacing={5}
          direction="row"
          alignItems="baseline"
          justify="center"
        >
          <Grid item xs={10}>
            <CameraControls />
          </Grid>
        </Grid>

        <OphydMotorBundleCompact bundle="saxs_motors.sample_table" />
        <OphydMotorBundleCompact bundle="saxs_motors.in_vac" />
        <OphydMotorCompact device="saxs_motors.mc7.syringe_pump1" label="Syringe 1" />
        <OphydMotorCompact device="saxs_motors.mc7.syringe_pump2" label="Syringe 2" />
      </Grid>
    </React.Fragment>
  );
};
export default BeamlineControl;
