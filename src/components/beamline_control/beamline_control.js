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
import {
  Energy,
  Flux,
  SampleLights,
  CameraControls,
  WindowControls
} from "./beamline_control_components";

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
          justify="center"
        >
          <Grid item xs={4}>
            <Typography variant="h5">Beamline Status</Typography>
            <OphydStatusField
              printVal={false}
              label="Status of IOCs"
              device="EPICS_status_devices.epics_status.ioc_status"
              good_status={1}
              badStatusText="IOC error"
              goodStatusText="IOC's ok"
            />
            <OphydStatusField
              printVal={false}
              label="Shutter Enable"
              device="EPICS_status_devices.epics_status.master_shutter_enable"
              good_status={1}
              badStatusText="Shutter disabled"
              goodStatusText="Shutter enabled"
            />
            <OphydStatusField
              label="White Beam"
              device="EPICS_status_devices.epics_status.white_beam"
              printVal={false}
              good_status={1}
              badStatusText="Closed"
              goodStatusText="Open"
            />
            <OphydStatusField
              label="Mono Beam"
              device="EPICS_status_devices.epics_status.mono_beam"
              printVal={false}
              good_status={1}
              badStatusText="Closed"
              goodStatusText="Open"
            />
            <OphydStatusField
              printVal={false}
              label="Sample Shutter"
              device="EPICS_status_devices.epics_status.sample_shutter"
              good_status={1}
              badStatusText="Closed"
              goodStatusText="Open"
            />
            <OphydStatusField
              printVal={false}
              label="Beam on Sample?"
              device="EPICS_status_devices.epics_status.beam_on_sample"
              good_status={0}
              badStatusText="Yes"
              goodStatusText="No"
            />
            <OphydStatusField
              printVal={false}
              label="Beam on Feedback?"
              device="EPICS_status_devices.epics_status.beam_on_fdbk"
              good_status={1}
              badStatusText="No"
              goodStatusText="Yes"
            />
            <OphydStatusField
              printVal={false}
              label="Beam position Status"
              device="EPICS_status_devices.epics_status.beam_position"
              good_status={1}
              badStatusText="Out of position"
              goodStatusText="In Position"
            />

            <OphydStatusField
              printVal={false}
              label="Feedback Status"
              device="EPICS_status_devices.epics_status.feedback"
              good_status={1}
              badStatusText="Off"
              goodStatusText="On"
            />

            <OphydStatusField
              printVal={false}
              label="HFM FB in range?"
              device="EPICS_status_devices.epics_status.HFM_feedback"
              good_status={0}
              badStatusText="No"
              goodStatusText="Yes"
            />

            <OphydStatusField
              printVal={false}
              label="VFM FB in range?"
              device="EPICS_status_devices.epics_status.VFM_feedback"
              good_status={0}
              badStatusText="No"
              goodStatusText="Yes"
            />
            <OphydStatusField
              printVal={false}
              label="Attenuators"
              device="EPICS_status_devices.epics_status.attenuators"
              good_status={1}
              badStatusText="Attenuators IN!!!"
              goodStatusText="Attenuators out"
            />
            <OphydStatusField
              printVal={false}
              label="Undulator Gap"
              device="EPICS_status_devices.epics_status.undulator_gap_status"
              good_status={0}
              badStatusText="Gap Bad!!!"
              goodStatusText="Gap Ok"
            />

            <OphydStatusField
              printVal={false}
              label="Undulator Taper"
              device="EPICS_status_devices.epics_status.undulator_taper_status"
              good_status={0}
              badStatusText="Taper Bad!!!"
              goodStatusText="Taper Ok"
            />
          </Grid>

          <Grid item xs={4}>
            <Typography variant="h5">Beamline Detectors and Diagnostics</Typography>
            <OphydStatusField
              label="Beamstop Counts"
              device="saxs_scaler.saxs_scaler.beamstop"
              toNumber={true}
              precision={6}
            />

            <OphydStatusField
              label="Transmission Counts"
              device="saxs_scaler.saxs_scaler.transmission"
              toNumber={true}
              precision={6}
            />

            <OphydStatusField
              label="I0 (QBPM2)"
              device="saxs_scaler.saxs_scaler.io"
              toNumber={true}
              precision={6}
            />

            <OphydStatusField
              label="Alt I0 (QBPM3)"
              device="saxs_scaler.saxs_scaler.alt_io"
              toNumber={true}
              precision={6}
            />

            <OphydStatusField
              label="DCM (QBPM1)"
              device="saxs_optics.dcm.dcm_qbpm"
              toNumber={true}
              suffix="uA"
              precision={6}
            />

            <OphydStatusField
              label="Time (s)"
              device="saxs_scaler.saxs_scaler.transmission"
              toNumber={true}
              precision={6}
            />
            <OphydStatusField
              label="Gap"
              device="EPICS_status_devices.epics_status.undulator_gap"
              toNumber={true}
              precision={2}
            />
            <OphydStatusField
              label="Taper"
              device="EPICS_status_devices.epics_status.undulator_taper"
              toNumber={true}
              precision={2}
            />
          </Grid>
          <Grid item xs={2} />
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
          <Grid item xs={12}>
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
          <Grid item xs={12}>
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
          <Grid item xs={12}>
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
          <Grid item xs={12}>
            <CameraControls />
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
          <Grid item xs={7}>
            <WindowControls />
          </Grid>
          <Grid item xs={3} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default BeamlineControl;
