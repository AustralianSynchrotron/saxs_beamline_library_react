import green from "@material-ui/core/colors/green";
import grey from "@material-ui/core/colors/grey";
import red from "@material-ui/core/colors/red";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { klaxon } from "../../media/sounds";
import { OphydStatusField } from "../ophyd_components/ophyd_components";
import {
  CameraControls,
  Flux,
  SampleLights,
  WindowControls,
  FeedbackControls,
} from "./beamline_control_components";
import FilterBank from "../filter/filter";

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

const BeamlineControl = (props) => {
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
            {/* <OphydStatusField
              label="Status of IOCs"
              device="ophyd_status_devices.ophyd_status.detector_status"
              good_status={1}
              badStatusText="IOC error"
              goodStatusText="IOC's ok"
            /> */}
            <OphydStatusField
              label="Shutter Enable"
              device="ophyd_status_devices.ophyd_status.master_shutter_enable"
              good_status={1}
              badStatusText="Shutter disabled"
              goodStatusText="Shutter enabled"
            />
            <OphydStatusField
              label="White Beam"
              device="ophyd_status_devices.ophyd_status.white_beam"
              good_status={1}
              badStatusText="Closed"
              goodStatusText="Open"
            />
            <OphydStatusField
              label="Mono Beam"
              device="ophyd_status_devices.ophyd_status.mono_beam"
              good_status={1}
              badStatusText="Closed"
              goodStatusText="Open"
            />
            <OphydStatusField
              label="Sample Shutter"
              device="ophyd_status_devices.ophyd_status.sample_shutter"
              good_status={1}
              badStatusText="Closed"
              goodStatusText="Open"
            />
            <OphydStatusField
              label="Beam on Sample?"
              device="ophyd_status_devices.ophyd_status.beam_on_sample"
              good_status={0}
              badStatusText="Yes"
              goodStatusText="No"
            />
            <OphydStatusField
              label="Beam on Feedback?"
              device="ophyd_status_devices.ophyd_status.beam_on_fdbk"
              good_status={1}
              badStatusText="No"
              goodStatusText="Yes"
            />
            <OphydStatusField
              label="Beam position Status"
              device="ophyd_status_devices.ophyd_status.beam_position"
              good_status={1}
              badStatusText="Out of position"
              goodStatusText="In Position"
            />

            <OphydStatusField
              label="Feedback Status"
              device="ophyd_status_devices.ophyd_status.feedback"
              good_status={1}
              badStatusText="Off"
              goodStatusText="On"
            />

            <OphydStatusField
              label="HFM FB in range?"
              device="ophyd_status_devices.ophyd_status.HFM_feedback"
              good_status={0}
              badStatusText="No"
              goodStatusText="Yes"
            />

            <OphydStatusField
              label="VFM FB in range?"
              device="ophyd_status_devices.ophyd_status.VFM_feedback"
              good_status={0}
              badStatusText="No"
              goodStatusText="Yes"
            />
            <OphydStatusField
              label="Attenuators"
              device="ophyd_status_devices.ophyd_status.attenuators"
              good_status={1}
              badStatusText="Attenuators IN!!!"
              goodStatusText="Attenuators out"
            />
            <OphydStatusField
              label="Undulator Gap"
              device="ophyd_status_devices.ophyd_status.undulator_gap_status"
              good_status={0}
              badStatusText="Gap Bad!!!"
              goodStatusText="Gap Ok"
            />

            <OphydStatusField
              label="Undulator Taper"
              device="ophyd_status_devices.ophyd_status.undulator_taper_status"
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
              device="ophyd_status_devices.ophyd_status.undulator_gap"
              toNumber={true}
              precision={2}
            />
            <OphydStatusField
              label="Taper"
              device="ophyd_status_devices.ophyd_status.undulator_taper"
              toNumber={true}
              precision={2}
            />
          </Grid>
          <Grid item xs={2} />
        </Grid>
        <Grid item />
        <Grid container direction="row" xs={12}>
          <Grid container direction="column" xs={6}>
            <Grid
              container
              className={classes.root}
              spacing={2}
              direction="row"
              alignItems="baseline"
              justify="center"
            >
              <Grid item xs={12} className={classes.item}>
                <FeedbackControls />
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
            >
              <Grid item xs={12} className={classes.item}>
                <Paper className={classes.padding}>
                  <Typography variant="h5" className={classes.padding}>Attenuators</Typography>
                  <FilterBank size={8} />
                </Paper>
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
            >
              <Grid item xs={12} className={classes.item}>
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
              <Grid item xs={12} className={classes.item}>
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
              <Grid item xs={12} className={classes.item}>
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
              <Grid item xs={12} className={classes.item}>
                <WindowControls />
              </Grid>
              <Grid item xs={3} />
            </Grid>
          </Grid>
          <Grid container direction="column" xs={6}></Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default BeamlineControl;
