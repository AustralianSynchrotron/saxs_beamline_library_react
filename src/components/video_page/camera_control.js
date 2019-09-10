import React from "react";
import { makeStyles } from "@material-ui/styles";
import BrightnessLow from "@material-ui/icons/BrightnessLow";
import BrightnessHigh from "@material-ui/icons/BrightnessHigh";
import ShutterSpeed from "@material-ui/icons/ShutterSpeed";
import ShutterSpeedTwoTone from "@material-ui/icons/ShutterSpeedTwoTone";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import {
  OphydButton,
  OphydToggleButton,
  OphydSlider,
  OphydTextField,
  OphydStatusField
} from "../ophyd_components/ophyd_components";

const useStyles = makeStyles({
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
  camera: {
    display: "flex",
    flexDirection: "row",
    width: "1000px",
    justifyContent: "space-between"
  },
  sliders: {
    display: "flex",
    flexDirection: "column",
    width: "200px"
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
    width: "200px"
  }
});

const CameraControl = props => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div>
        <h1>{props.label.replace(/_/g, " ")}</h1>
        <div className={classes.camera}>
          <div className={classes.buttons}>
            <OphydToggleButton
              labelFirst="Stop"
              labelSecond="Start"
              valueFirst={0}
              valueSecond={1}
              noShowLabel={true}
              device={props.cam + ".cam.acquire"}
              classes={classes}
            />
          </div>
          <div className={classes.sliders}>
            <OphydSlider
              device={props.cam + ".cam.gain"}
              step={0.1}
              min={0}
              max={18}
              leftIcon={<BrightnessLow />}
              rightIcon={<BrightnessHigh />}
            />
            <OphydSlider
              device={props.cam + ".cam.acquire_time"}
              step={0.0001}
              min={0}
              max={0.057}
              leftIcon={<ShutterSpeed />}
              rightIcon={<ShutterSpeedTwoTone />}
            />
            <OphydSlider
              device={props.cam + ".cam.black_level"}
              step={0.0001}
              min={0}
              max={25}
              label="Black Level"
              setTimeout={1}
            />
          </div>
          <OphydTextField label="Start X" device={props.cam + ".cam.min_x"} />
          <OphydTextField label="X Size" device={props.cam + ".cam.size.size_x"} />
          <OphydTextField label="Start Y" device={props.cam + ".cam.min_y"} />
          <OphydTextField label="Y Size" device={props.cam + ".cam.size.size_y"} />
          <OphydTextField label="JPEG Path" device={props.cam + ".jpeg_plugin.file_path"} />
          <OphydTextField label="JPEG Name" device={props.cam + ".jpeg_plugin.file_name"} />
          <OphydButton label="Save JPEG" value={1} device={props.cam + ".jpeg_plugin.write_file"} />
          {/* <OphydButton label="Restart Server" /> */}
          {/* <OphydStatusField label="Server Status" /> */}
        </div>
      </div>
    </React.Fragment>
  );
};
export default CameraControl;
