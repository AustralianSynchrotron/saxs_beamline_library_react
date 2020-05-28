import Button from "@material-ui/core/Button";
import grey from "@material-ui/core/colors/grey";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles, mergeClasses } from "@material-ui/styles";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCameraLength, noseCone, listNoseCones, changeNoseCone } from "../../actions";
import {
  OphydStatusField,
  OphydMotorCompact,
  OphydToggleButton,
} from "../ophyd_components/ophyd_components";

const useStyles = makeStyles({
  hidden: { display: "None" },
  showButton: { marginTop: 0 },
  slider: { flexDirection: "row" },
  cssOutlinedInput: {
    "&:not(hover):not($disabled):not($cssFocused):not($error) $notchedOutline": {
      borderColor: "red", //default
    },
  },

  notchedOutline: {},
  error: {},
  disabled: {},
  change: {
    display: "flex",
    flexDirection: "column",
    width: "400px",
    alignItems: "center",
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
});

const QRangeChange = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [cameraLength, setCameraLength] = useState();

  const message = useSelector((state) => state.cameraLength.progressMessage) || null;
  const currentNoseCone = useSelector((state) => state.cameraLength.noseCone) || null;
  const noseCones = useSelector((state) => state.cameraLength.noseCones) || null;
  const beamstopX = useSelector((state) => state.cameraLength.data.beamstop_stages_x) || null;
  const beamstopY = useSelector((state) => state.cameraLength.data.beamstop_stages_y) || null;
  const beamstop = useSelector((state) => state.cameraLength.data.beamstop) || null;

  const handleCameraLengthChange = (event) => {
    let value = parseFloat(event.target.value);
    if (isNaN(value)) {
      value = 0;
    }
    setCameraLength(value);
  };

  const handleStartCameraLengthChange = () => {
    dispatch(changeCameraLength(cameraLength));
  };

  const handleNoseCone = (event) => {
    dispatch(changeNoseCone(event.target.value));
  };

  useEffect(() => {
    dispatch(listNoseCones());
    dispatch(noseCone());
  }, []);

  return (
    <React.Fragment>
      <Grid container className={classes.root} spacing={5} direction="row">
        <Grid
          container
          className={classes.root}
          spacing={5}
          direction="row"
          alignItems="baseline"
          justify="center"
        >
          <Grid item xs={1}>
            <div className={classes.change}>
              <OphydStatusField label="Detector Z Position" device="saxs_motors.saxs_det.z" />
              <OphydStatusField
                label="Detector Cover Position"
                device="saxs_motors.beamstop.large_x"
              />
              <TextField value={currentNoseCone.name} />
              <TextField value={currentNoseCone.length} />

              <Select label={"Nose Cone"} value={currentNoseCone} onChange={handleNoseCone}>
                {Object.entries(noseCones).map((nc) => (
                  <MenuItem key={nc[0]} value={nc[0]}>
                    {nc[0]}
                    {nc[1]}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                variant="outlined"
                label="Camera Length"
                size="small"
                value={cameraLength}
                onChange={handleCameraLengthChange}
              />
              <Button onClick={handleStartCameraLengthChange}>Change</Button>
              <TextField multiline rows={10} fullWidth value={message} />
              <Typography>Beamstop Counts</Typography>
              <TextField value={beamstop} />
              <Typography>Beamstop X</Typography>
              <TextField value={beamstopX} />
              <Typography>Beamstop Y</Typography>
              <TextField value={beamstopY} />
              <OphydMotorCompact device={"saxs_motors.saxs_det.x"} />
              <OphydMotorCompact device={"saxs_motors.saxs_det.y"} />
              <OphydStatusField label="Beamstop Counts" device={"saxs_scaler.beamstop"} />
              <OphydToggleButton
                label="Check Beamstop Counts"
                labelPosition="left"
                labelFirst="Check"
                labelSecond="Finish"
                valueFirst={0}
                valueSecond={1}
                readFirst={0}
                readSecond={1}
                device={"saxs_slits.flux.flux_level"}
                toggleClasses={classes}
              />
            </div>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default QRangeChange;
