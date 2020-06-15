import Button from "@material-ui/core/Button";
import blue from "@material-ui/core/colors/blue";
import yellow from "@material-ui/core/colors/yellow";
import grey from "@material-ui/core/colors/grey";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Send from "@material-ui/icons/Send";
import { makeStyles, mergeClasses } from "@material-ui/styles";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCameraLength,
  noseCone,
  listNoseCones,
  changeNoseCone,
  changeEnergy,
  clearProgressLog,
} from "../../actions";
import {
  OphydStatusField,
  OphydMotorCompact,
  OphydButton,
} from "../ophyd_components/ophyd_components";

import clsx from "clsx";

const useStyles = makeStyles({
  hidden: { display: "None" },
  button: {
    color: "white",
    margin: "2px",
    "&:hover": {
      color: "white",
    },
  },
  changeButton: {
    backgroundColor: blue["700"],
    "&:hover": {
      backgroundColor: blue["A700"],
    },
  },
  checkButton: {
    backgroundColor: yellow["700"],
    "&:hover": {
      backgroundColor: yellow["A700"],
    },
  },
  showButton: { marginTop: 0 },
  slider: { flexDirection: "row" },
  cssOutlinedInput: {
    "&:not(hover):not($disabled):not($cssFocused):not($error) $notchedOutline": {
      borderColor: "red", //default
    },
  },
  log: {
    backgroundColor: grey["700"],
  },
  notchedOutline: {},
  error: {},
  disabled: {},
  change: {
    display: "flex",
    flexDirection: "column",
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
  const [energy, setEnergy] = useState();

  const cameraMessage = useSelector((state) => state.cameraLength.progressLog) || null;
  const energyMessage = useSelector((state) => state.energy.progressLog) || null;
  const currentNoseCone = useSelector((state) => state.cameraLength.noseCone) || null;
  const noseCones = useSelector((state) => state.cameraLength.noseCones) || null;
  const beamstopX = useSelector((state) => state.cameraLength.data.beamstop_stages_x) || null;
  const beamstopY = useSelector((state) => state.cameraLength.data.beamstop_stages_y) || null;
  const beamstop = useSelector((state) => state.cameraLength.data.beamstop) || null;

  const handleEnergyChange = (event) => {
    let value = parseFloat(event.target.value);
    if (isNaN(value)) {
      value = 0;
    }
    setEnergy(value);
  };

  const handleStartEnergyChange = () => {
    dispatch(clearProgressLog);
    dispatch(changeEnergy(energy));
  };

  const handleCameraLengthChange = (event) => {
    let value = parseFloat(event.target.value);
    if (isNaN(value)) {
      value = 0;
    }
    setCameraLength(value);
  };

  const handleStartCameraLengthChange = () => {
    dispatch(clearProgressLog);
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
      <Grid container className={classes.root} spacing={5} direction="row" xs={12}>
        <Grid
          container
          className={classes.root}
          spacing={5}
          direction="row"
          alignItems="baseline"
          justify="center"
          xs={12}
        >
          <Grid item xs={6}>
            <div className={classes.change}>
              <OphydStatusField
                device="saxs_optics.dcm.energy"
                label="Energy"
                toNumber={true}
                precision={3}
                suffix="keV"
              />
              <span>
                <TextField
                  variant="outlined"
                  label="Energy (kV)"
                  size="small"
                  value={energy}
                  onChange={handleEnergyChange}
                />
                <Button
                  variant="contained"
                  endIcon={<Send />}
                  onClick={handleStartEnergyChange}
                  className={clsx(classes.button, classes.changeButton)}
                >
                  Change Energy
                </Button>
              </span>
              <span>
                <OphydStatusField label="Detector Z Position" device="saxs_motors.saxs_det.z" />
                <OphydStatusField
                  label="Detector Cover Position"
                  device="saxs_motors.beamstop.large_x"
                />
              </span>
              <InputLabel id="nose-cone-select-label">Nose Cone</InputLabel>
              <Select
                labelId="nose-cone-select-label"
                value={currentNoseCone.name}
                onChange={handleNoseCone}
              >
                {Object.entries(noseCones).map((nc) => (
                  <MenuItem key={nc[0]} value={nc[0]}>
                    {nc[0]} {nc[1]}
                  </MenuItem>
                ))}
              </Select>
              <span>
                <TextField
                  variant="outlined"
                  label="Camera Length (mm)"
                  size="small"
                  value={cameraLength}
                  onChange={handleCameraLengthChange}
                />
                <Button
                  variant="contained"
                  endIcon={<Send />}
                  onClick={handleStartCameraLengthChange}
                  className={clsx(classes.button, classes.changeButton)}
                >
                  Change Camera Length
                </Button>
              </span>

              <span>
                <Typography variant="h6">Scan Reedback</Typography>
                <TextField label="Beamstop Counts" value={beamstop} />
                <TextField label="Beamstop X" value={beamstopX} />
                <TextField label="Beamstop Y" value={beamstopY} />
              </span>
              <span>
                <Typography variant="h6" style={{paddingBottom: "24px"}}>SAXS Detector Position</Typography>
                <OphydMotorCompact device={"saxs_motors.saxs_det.x"} />
                <OphydMotorCompact device={"saxs_motors.saxs_det.y"} />
              </span>
              <OphydStatusField
                label="Beamstop Counts"
                device={"saxs_scaler.saxs_scaler.beamstop"}
                toNumber={true}
                precision={6}
              />

              <OphydButton
                label="Check Beamstop Counts"
                value={1}
                device={"saxs_scaler.saxs_scaler.autocount_mode"}
                buttonClasses={clsx(classes.button, classes.checkButton)}
              />
            </div>
          </Grid>
          <Grid item xs={6}>
            <TextField
              multiline
              rows={50}
              fullWidth
              value={String(cameraMessage) + String(energyMessage)}
              className={classes.log}
              inputProps={{
                style: {
                  padding: 25,
                },
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default QRangeChange;
