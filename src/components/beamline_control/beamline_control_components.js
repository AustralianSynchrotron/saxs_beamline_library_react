import { useDispatch, useSelector } from "react-redux";
import green from "@material-ui/core/colors/green";
import grey from "@material-ui/core/colors/grey";
import red from "@material-ui/core/colors/red";
import yellow from "@material-ui/core/colors/yellow";
import blue from "@material-ui/core/colors/blue";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import BrightnessHigh from "@material-ui/icons/BrightnessHigh";
import BrightnessLow from "@material-ui/icons/BrightnessLow";
import PlayArrow from "@material-ui/icons/PlayArrow";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";
import Stop from "@material-ui/icons/Stop";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import React, { useState } from "react";
import {
  OphydButton,
  OphydDropdown,
  OphydSlider,
  OphydStateIcon,
  OphydStatusField,
  OphydTextField,
  OphydToggleButton
} from "../ophyd_components/ophyd_components";

import { clearFeedbackLog, doFeedback, stopFeedback, feedbackIn, feedbackOut } from "../../actions/index";

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
    padding: "1px"
  },

  horizontal: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "left",
    alignItems: "center",
    padding: "10px"
  },
  button: {
    color: "white",
    margin: "2px",
    "&:hover": {
      color: "white"
    }
  },
  feedbackButtonBase: {
    width: "196px"
  },
  feedbackButton: {
    backgroundColor: blue["700"],
    "&:hover": {
      backgroundColor: blue["A700"]
    }
  },
  stopFeedbackButton: {
    backgroundColor: yellow["700"],
    "&:hover": {
      backgroundColor: yellow["A700"]
    }
  },
  feedbackInOutButton: {
    backgroundColor: grey["500"],
    "&:hover": {
      backgroundColor: grey["A500"]
    }
  },
  feedbackActive: {
    color: red["700"]
  },
  feedbackInActive: {
    marginLeft: "15px",
    color: green["700"]
  },
  messageField: {
    backgroundColor: grey["700"],
    maxWidth: "400px"
  },
  control: {
    padding: "10px"
  }
});

export const Energy = props => {
  const classes = useStyles(props);
  return (
    <React.Fragment>
      <Paper>
        <div className={classes.padding}>
          <Typography variant="h5">Energy</Typography>
          <div className={clsx(classes.horizontal, classes.padding)}>
            <OphydTextField device="saxs_optics.dcm.set_energy" label="Set Energy" />
            <OphydStatusField
              device="saxs_optics.dcm.energy"
              label="Energy"
              toNumber={true}
              precision={3}
              suffix="keV"
            />
            <OphydStatusField
              device="saxs_optics.dcm.wavelength"
              label="Wavelength"
              toNumber={true}
              precision={3}
              suffix="nm"
            />
            <OphydStateIcon
              device="saxs_optics.dcm.echange_ivu_dcm_complete"
              label=" DCM moved?"
              good_value={1}
            />
            <OphydStateIcon
              device="saxs_optics.dcm.dcm_fine_scan_state"
              good_value={0}
              label="Scan Done?"
            />
            <OphydStatusField
              device="saxs_optics.dcm.scan_pt"
              label="DCM Tune pt"
              toNumber={true}
              precision={3}
              undef_val={0}
            />
            <OphydStatusField
              device="saxs_optics.dcm.scan_pts"
              label="of"
              toNumber={true}
              precision={3}
              undef_val={0}
            />
            <OphydStateIcon
              device="saxs_optics.dcm.echange_fb_image_tune"
              good_value={1}
              label="Feedback?"
            />
            <OphydStatusField
              device="ophyd_status_devices.ophyd_status.energy_change_message"
              label="Energy Change Status"
              printVal={true}
            />
          </div>
        </div>
      </Paper>
    </React.Fragment>
  );
};

export const Flux = props => {
  const classes = useStyles(props);
  return (
    <React.Fragment>
      <Paper>
        <div className={classes.padding}>
          <Typography variant="h5">Flux</Typography>
          <div className={classes.horizontal}>
            <OphydToggleButton
              label="Flux Scale"
              labelPosition="left"
              labelFirst="High Flux"
              labelSecond="Medium/Protein"
              valueFirst={0}
              valueSecond={1}
              readFirst={0}
              readSecond={1}
              device={"saxs_slits.flux.flux_level"}
              toggleClasses={classes}
            />
            <OphydTextField device="saxs_slits.flux.percent_flux" precision={3} />
            <OphydSlider
              device="saxs_slits.flux.percent_flux"
              step={0.1}
              min={0}
              max={10}
              label="% Flux"
              leftIcon={<BrightnessLow />}
              rightIcon={<BrightnessHigh />}
            />
            <OphydButton label="Ludicrous Flux" device="saxs_slits.flux.ludicrous" value={1} />
          </div>
        </div>
      </Paper>
    </React.Fragment>
  );
};

export const SampleLights = props => {
  const classes = useStyles(props);
  return (
    <React.Fragment>
      <Paper>
        <div className={classes.padding}>
          <Typography variant="h5">Sample Lights</Typography>
        </div>
        <div>
          <OphydSlider
            device="saxs_IO.rio0.ao_0"
            step={0.1}
            min={0}
            max={10}
            label="Light One"
            leftIcon={<BrightnessLow />}
            rightIcon={<BrightnessHigh />}
          />
          <OphydSlider
            device="saxs_IO.rio0.ao_1"
            step={0.1}
            min={0}
            max={10}
            label="Light Two"
            leftIcon={<BrightnessLow />}
            rightIcon={<BrightnessHigh />}
          />
        </div>
      </Paper>
    </React.Fragment>
  );
};

export const CameraControls = props => {
  const classes = useStyles(props);
  return (
    <React.Fragment>
      <Paper>
        <div className={classes.padding}>
          <Typography variant="h5">Camera Exposure and Gain</Typography>
        </div>
        <OphydSlider
          device="saxs_video.video_cameras.video_camera_1.cam.acquire_time"
          step={0.01}
          min={0}
          max={2}
          label="Sample Exp Time"
          leftIcon={<BrightnessLow />}
          rightIcon={<BrightnessHigh />}
        />
        <OphydSlider
          device="saxs_video.video_cameras.video_camera_1.cam.gain"
          step={0.1}
          min={0}
          max={40}
          label="Sample Gain"
          leftIcon={<BrightnessLow />}
          rightIcon={<BrightnessHigh />}
        />
        <OphydSlider
          device="saxs_video.video_cameras.video_camera_6.cam.acquire_time"
          step={0.01}
          min={0}
          max={2}
          label="Wide Exp Time"
          leftIcon={<BrightnessLow />}
          rightIcon={<BrightnessHigh />}
        />
        <OphydSlider
          device="saxs_video.video_cameras.video_camera_6.cam.gain"
          step={0.1}
          min={0}
          max={40}
          label="Wide Gain"
          leftIcon={<BrightnessLow />}
          rightIcon={<BrightnessHigh />}
        />
      </Paper>
    </React.Fragment>
  );
};

export const WindowControls = props => {
  const classes = useStyles(props);
  const [TweakYValue, setTweakYValue] = useState("0.1");
  const handleChangeY = event => {
    setTweakYValue(event.target.value);
  };
  const [TweakXValue, setTweakXValue] = useState("0.1");
  const handleChangeX = event => {
    setTweakXValue(event.target.value);
  };
  return (
    <React.Fragment>
      <Paper>
        <div className={classes.padding}>
          <Typography variant="h5">Move Window</Typography>
          <Typography variant="body1">Only moves relative by the tweak value</Typography>
        </div>
        <div className={classes.horizontal}>
          <div className={classes.horizontal}>
            <OphydButton label="Move Window UP" device="move_window.wy.move" value={TweakYValue} />

            <TextField
              label="Tweak Value"
              variant="outlined"
              value={TweakYValue}
              onChange={handleChangeY}
            />
            <OphydButton
              label="Move Window Down"
              device="move_window.wy.move"
              value={-1 * TweakYValue}
            />
          </div>
          <div className={classes.horizontal}>
            <OphydButton
              label="Move Window outboard"
              device="move_window.wx.move"
              value={TweakXValue}
            />
            <TextField
              label="Tweak Value"
              variant="outlined"
              value={TweakXValue}
              onChange={handleChangeX}
            />
            <OphydButton
              label="Move Window inboard"
              device="move_window.wx.move"
              value={-1 * TweakXValue}
            />
          </div>
        </div>
      </Paper>
    </React.Fragment>
  );
};

export const FeedbackControls = props => {
  const dispatch = useDispatch();
  const classes = useStyles(props);

  const message = useSelector(state => state.feedback.message);
  const feedbackStatus = useSelector(state => state.flags.flags.flag_doing_feedback)

  const handleDoFeedback = () => {
    dispatch(clearFeedbackLog());
    dispatch(doFeedback());
  };
  const handleStopFeedback = () => {
    dispatch(stopFeedback());
  };
  const handleFeedbackIn = () => {
    dispatch(feedbackIn());
  };
  const handleFeedbackOut = () => {
    dispatch(feedbackOut());
  };

  return (
    <React.Fragment>
      <Paper>
        <Grid container direction="column" className={classes.control}>
          <Grid container direction="row">
            <Grid item>
              <Typography variant="h5">Feedback</Typography>
            </Grid>
            <Grid item>
              {feedbackStatus ? (
                <Typography variant="h5" className={classes.feedbackActive}>Active</Typography>
              ) : (
                <Typography variant="h5" className={classes.feedbackInActive}>Inactive</Typography>
              )}
            </Grid>
          </Grid>
          <Grid item direction="row">
            <Button
              variant="contained"
              endIcon={<PlayArrow />}
              onClick={handleDoFeedback}
              className={clsx(classes.button, classes.feedbackButtonBase, classes.feedbackButton)}
            >
              Start Feedback
            </Button>
            <Button
              variant="contained"
              endIcon={<Stop />}
              onClick={handleStopFeedback}
              className={clsx(
                classes.button,
                classes.feedbackButtonBase,
                classes.stopFeedbackButton
              )}
            >
              Stop Feedback
            </Button>
          </Grid>
          <Grid item direction="row">
            <Button
              variant="contained"
              endIcon={<ExpandMore />}
              onClick={handleFeedbackIn}
              className={clsx(
                classes.button,
                classes.feedbackButtonBase,
                classes.feedbackInOutButton
              )}
            >
              Feedback In
            </Button>
            <Button
              variant="contained"
              endIcon={<ExpandLess />}
              onClick={handleFeedbackOut}
              className={clsx(
                classes.button,
                classes.feedbackButtonBase,
                classes.feedbackInOutButton
              )}
            >
              Feedback Out
            </Button>
          </Grid>
          <Grid container direction="row" className={classes.messageField}>
            <Grid item>
              <Typography variant="caption" className={classes.padding}>
                Message:{" "}
              </Typography>
            </Grid>
            <Grid item>
              <Typography>{message}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
};
