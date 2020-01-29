import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckBox from "@material-ui/core/Checkbox"
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";


import Chip from "@material-ui/core/Chip";

import PlayArrow from "@material-ui/icons/PlayArrow";
import Pause from "@material-ui/icons/Pause";
import Stop from "@material-ui/icons/Stop";
import CancelIcon from "@material-ui/icons/Cancel";
import Done from "@material-ui/icons/Done";
import Add from "@material-ui/icons/Add";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import red from "@material-ui/core/colors/red";
import amber from "@material-ui/core/colors/amber";
import green from "@material-ui/core/colors/green";
import blue from "@material-ui/core/colors/blue";
import grey from "@material-ui/core/colors/grey";
import deepOrange from "@material-ui/core/colors/deepOrange";

import CustomTimeDialog from "../custom_time_dialog/custom_time_dialog";
import ChartElement from "../charts/ChartElement";

import { listenGrazing } from "../../actions/index";

import { OphydMotorBundleCompact } from "../ophyd_components/ophyd_components";


const useStyles = makeStyles({
  content: {
    backgroundColor: grey[800]
  },
  inputField: {
    width: "125px"
  },
  inputFieldLabel: {
    width: "125px"
  },
  angleField: {
    width: "100px"
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
    width: "200px"
  },
  start: {
    color: "white",
    backgroundColor: green["700"],
    "&:hover": {
      backgroundColor: green["A700"]
    }
  },
  pause: {
    color: "white",
    backgroundColor: amber["700"],
    "&:hover": {
      backgroundColor: amber["A700"]
    }
  },
  abort: {
    color: "white",
    backgroundColor: red["700"],
    "&:hover": {
      backgroundColor: red["A700"]
    }
  },
  set: {
    color: "white",
    backgroundColor: blue["700"],
    "&:hover": {
      backgroundColor: blue["A700"]
    }
  },
  cancel: {
    color: "black",
    backgroundColor: grey["300"],
    "&:hover": {
      backgroundColor: grey["400"]
    }
  },
  theEyeItBurns: {
    animation: "1s $colorchange infinite"
  },
  "@keyframes colorchange":
  {
    "0%": { color: red[700] },
    "50%": { color: amber["A700"] },
    "100%": { color: red[700] }
  }
})




var times = [0.1, 0.5, 1, 2, 5, 10, 20, 30, 60, 120, "Custom"];

const GrazingPage = props => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const selectRef = React.createRef();

  const [expTimes, setExpTimes] = useState([]);
  const [expTimesOpen, setExpTimesOpen] = useState(false);
  const [customTimeOpen, setCustomTimeOpen] = useState(false);
  const [editable, setEditable] = useState(false)

  const [filename, setFilename] = useState("");
  const [validFilename, setValidFilename] = useState(true);
  const [invalidFilenameText, setInvalidFilenameText] = useState("")
  const [numberPoints, setNumberPoints] = useState(0);
  const [angles, setAngles] = useState([]);
  const [cellRefs, setCellRefs] = useState([]);

  const [chartWidth, setChartWidth] = useState(document.documentElement.clientWidth / 2 - 80)

  const heightScanData = useSelector(state => state.grazing.heightScans);
  const omegaScanData = useSelector(state => state.grazing.omegaScans);
  
  const handleEditableChange = () => {
    setEditable(!editable);
  }

  const handleFilename = event => {
    setFilename(event.target.value);

    const invalidCharacters = event.target.value.match(/[-!@#$%^&*()+|~=`{}\[\]:";'<>?,. \\\/]/g);
    if (invalidCharacters !== null) {
      setValidFilename(false);

      invalidCharacters.forEach((character, index) => {
        if (character === " ") {
          invalidCharacters[index] = "<space>";
        }
      });
      setInvalidFilenameText("Invalid Characters: " + invalidCharacters.join(""));
    } else {
      setValidFilename(true);
      setInvalidFilenameText("");
    }
  };

  const handleKeyDown = event => {
    const index = parseInt(event.currentTarget.dataset.index);
    if (event.key === "Enter") {
      if (index === numberPoints - 1) {
        handleAddPoint();
      }
    }
    if (event.key === "ArrowRight") {
      cellRefs[index + 1].current.focus();
    }
    if (event.key === "ArrowLeft") {
      cellRefs[index - 1].current.focus();
    }
  }

  const handleAddPoint = () => {
    setNumberPoints(numberPoints + 1);
  }

  const handleAngleChange = event => {
    const index = parseInt(event.currentTarget.dataset.index);
    setAngles([...angles.slice(0, index), event.target.value, ...angles.slice(index + 1)])
  }

  const handleRemoveAngle = event => {
    const index = parseInt(event.currentTarget.dataset.index);
    setAngles([...angles.slice(0, index), ...angles.slice(index + 1)])
  }

  const handleDeleteTime = value => {
    setExpTimes(expTimes.filter(num => num !== value));
  };

  const handleExpTime = event => {
    if (event.target.value.includes("Custom")) {
      setCustomTimeOpen(true);
    } else {

      setExpTimes(event.target.value);
      if (!event.ctrlKey) {
        setExpTimesOpen(false);
      }
    }
  };

  const handleExpTimesOpen = () => {
    setExpTimesOpen(true);
  }

  const handleExpTimesClose = () => {
    setExpTimesOpen(false);
  }

  const handleCustomTime = time => {
    setCustomTimeOpen(false);
    if (times.includes(time)) {
      return;
    }
    times.push(time);
    times.sort((a, b) => {
      if (a === "Custom") {
        a = 10000;
      }
      if (b === "Custom") {
        b = 10000;
      }
      return a - b;
    });
  };

  useEffect(() => {
    setCellRefs([...cellRefs, ...Array.apply(null, { length: numberPoints - cellRefs.length }).map(() => React.createRef())]);
    setAngles([...angles, ...Array.apply(null, { length: numberPoints - angles.length }).map(() => 0)]);
  }, [numberPoints])

  useEffect(() => {
    if (numberPoints > 0) {
      cellRefs[cellRefs.length - 1].current.focus();
    }
  }, [cellRefs])

  useEffect(() => {
    dispatch(listenGrazing());
  }, []);

  return (
    <React.Fragment>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h2">One GISAXS to Rule Them All!</Typography>
        </Grid>
        <Grid item>
          <Card>
            <CardHeader title="GISAXS Alignment" />
            <CardContent className={classes.content}>
              <Grid container direction="column">
                <Grid item>
                  <Grid container direction="row" alignItems="center">
                    <Grid item>
                      <IconButton onClick={handleEditableChange}>
                        {editable ? <Visibility className={classes.theEyeItBurns} /> : <VisibilityOff />}
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <Typography>Edit Advanced Alignment Settings (AKA Looking into the Eye of Sauron)</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <div hidden={!editable}>
                  <Typography variant="h5">Alignment Settings</Typography>
                  <Grid container direction="row" spacing={2}>
                    <Grid item>
                      <Grid container direction="column">
                        <Grid item>
                          <Grid container alignItems="center" direction="row" spacing={2}>
                            <Grid item>
                              <Typography className={classes.inputFieldLabel}>Coarse Height</Typography>
                            </Grid>
                            <Grid item>
                              <TextField variant="outlined" label="Range (mm)" margin="dense" disabled={!editable} className={classes.inputField}></TextField>
                            </Grid>
                            <Grid item>
                              <TextField variant="outlined" label="No. Points" margin="dense" disabled={!editable} className={classes.inputField}></TextField>
                            </Grid>
                          </Grid>
                          <Grid container alignItems="center" direction="row" spacing={2}>
                            <Grid item>
                              <Typography className={classes.inputFieldLabel}>Fine Height</Typography>
                            </Grid>
                            <Grid item>
                              <TextField variant="outlined" label="Range (mm)" margin="dense" disabled={!editable} className={classes.inputField}></TextField>
                            </Grid>
                            <Grid item>
                              <TextField variant="outlined" label="No. Points" margin="dense" disabled={!editable} className={classes.inputField}></TextField>
                            </Grid>
                          </Grid>
                          <Grid container alignItems="center" direction="row" spacing={2}>
                            <Grid item>
                              <Typography className={classes.inputFieldLabel}>Coarse Omega</Typography>
                            </Grid>
                            <Grid item>
                              <TextField variant="outlined" label="Range (°)" margin="dense" disabled={!editable} className={classes.inputField}></TextField>
                            </Grid>
                            <Grid item>
                              <TextField variant="outlined" label="No. Points" margin="dense" disabled={!editable} className={classes.inputField}></TextField>
                            </Grid>
                          </Grid>
                          <Grid container alignItems="center" direction="row" spacing={2}>
                            <Grid item>
                              <Typography className={classes.inputFieldLabel}>Fine Omega</Typography>
                            </Grid>
                            <Grid item>
                              <TextField variant="outlined" label="Range (°)" margin="dense" disabled={!editable} className={classes.inputField}></TextField>
                            </Grid>
                            <Grid item>
                              <TextField variant="outlined" label="No. Points" margin="dense" disabled={!editable} className={classes.inputField}></TextField>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid container direction="column">
                        <Grid item>
                          <Grid container alignItems="center" direction="row" spacing={2}>
                            <Grid item>
                              <Typography className={classes.inputFieldLabel}>Transmission</Typography>
                            </Grid>
                            <Grid item>
                              <TextField variant="outlined" label="transmission" margin="dense" disabled={!editable} className={classes.inputField}></TextField>
                            </Grid>
                          </Grid>
                          <Grid container alignItems="center" direction="row" spacing={2}>
                            <Grid item>
                              <Typography className={classes.inputFieldLabel}>Slit Size</Typography>
                            </Grid>
                            <Grid item>
                              <TextField variant="outlined" label="x" margin="dense" disabled={!editable} className={classes.inputField}></TextField>
                            </Grid>
                            <Grid item>
                              <TextField variant="outlined" label="y" margin="dense" disabled={!editable} className={classes.inputField}></TextField>
                            </Grid>
                          </Grid>
                          <Grid container alignItems="center" direction="row" spacing={2}>
                            <Grid item>
                              <Typography className={classes.inputFieldLabel}>Detector Position</Typography>
                            </Grid>
                            <Grid item>
                              <TextField variant="outlined" label="x" margin="dense" disabled={!editable} className={classes.inputField}></TextField>
                            </Grid>
                            <Grid item>
                              <TextField variant="outlined" label="y" margin="dense" disabled={!editable} className={classes.inputField}></TextField>
                            </Grid>
                          </Grid>
                          <Grid container alignItems="center" direction="row" spacing={2}>
                            <Grid item>
                              <Typography className={classes.inputFieldLabel}>Beamstop Position</Typography>
                            </Grid>
                            <Grid item>
                              <TextField variant="outlined" label="x" margin="dense" disabled={!editable} className={classes.inputField}></TextField>
                            </Grid>
                            <Grid item>
                              <TextField variant="outlined" label="y" margin="dense" disabled={!editable} className={classes.inputField}></TextField>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid container direction="column">
                        <Grid item>
                          <Grid container alignItems="center" direction="row" spacing={2}>
                            <Grid item>
                              <Typography className={classes.inputFieldLabel}>Detector Times</Typography>
                            </Grid>
                            <Grid item>
                              <TextField variant="outlined" label="Exposure" margin="dense" disabled={!editable} className={classes.inputField}></TextField>
                            </Grid>
                            <Grid item>
                              <TextField variant="outlined" label="Period" margin="dense" disabled={!editable} className={classes.inputField}></TextField>
                            </Grid>
                          </Grid>
                          <Grid container alignItems="center" direction="row" spacing={2}>
                            <Grid item>
                              <Typography className={classes.inputFieldLabel}>Count Thresholds</Typography>
                            </Grid>
                            <Grid item>
                              <TextField variant="outlined" label="Low" margin="dense" disabled={!editable} className={classes.inputField}></TextField>
                            </Grid>
                            <Grid item>
                              <TextField variant="outlined" label="High" margin="dense" disabled={!editable} className={classes.inputField}></TextField>
                            </Grid>
                          </Grid>
                          <Grid container alignItems="center" direction="row" spacing={2}>
                            <Grid item>
                              <Typography className={classes.inputFieldLabel}>Beamcheck Deadband</Typography>
                            </Grid>
                            <Grid item>
                              <TextField variant="outlined" label="Deadband" margin="dense" disabled={!editable} className={classes.inputField}></TextField>
                            </Grid>
                          </Grid>
                          <Grid container alignItems="center" direction="row" spacing={2}>
                            <Grid item>
                              <Typography className={classes.inputFieldLabel}>Safe Beamstop Position</Typography>
                            </Grid>
                            <Grid item>
                              <TextField variant="outlined" label="x" margin="dense" disabled={!editable} className={classes.inputField}></TextField>
                            </Grid>
                            <Grid item>
                              <TextField variant="outlined" label="y" margin="dense" disabled={!editable} className={classes.inputField}></TextField>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Typography variant="h5">Acquire Settings</Typography>
                  <Grid container direction="row" spacing={2}>
                    <Grid item>
                      <Grid container direction="column">
                        <Grid item>
                          <Grid container alignItems="center" direction="row" spacing={2}>
                            <Grid item>
                              <Typography className={classes.inputFieldLabel}>Transmission</Typography>
                            </Grid>
                            <Grid item>
                              <TextField variant="outlined" label="Transmission" margin="dense" disabled={!editable} className={classes.inputField}></TextField>
                            </Grid>
                          </Grid>
                          <Grid container alignItems="center" direction="row" spacing={2}>
                            <Grid item>
                              <Typography className={classes.inputFieldLabel}>Beamstop Position</Typography>
                            </Grid>
                            <Grid item>
                              <TextField variant="outlined" label="x" margin="dense" disabled={!editable} className={classes.inputField}></TextField>
                            </Grid>
                            <Grid item>
                              <TextField variant="outlined" label="y" margin="dense" disabled={!editable} className={classes.inputField}></TextField>
                            </Grid>
                          </Grid>
                          <Grid container alignItems="center" direction="row" spacing={2}>
                            <Grid item>
                              <Typography className={classes.inputFieldLabel}>Slit Size</Typography>
                            </Grid>
                            <Grid item>
                              <TextField variant="outlined" label="x" margin="dense" disabled={!editable} className={classes.inputField}></TextField>
                            </Grid>
                            <Grid item>
                              <TextField variant="outlined" label="y" margin="dense" disabled={!editable} className={classes.inputField}></TextField>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container direction="row" spacing={2}>
                      <Grid item>
                        <Button variant="contained" startIcon={<Done />} className={classNames(classes.Button, classes.set)}>Apply Settings</Button>
                      </Grid>
                      <Grid item>
                        <Button variant="contained" startIcon={<CancelIcon />} className={classNames(classes.Button, classes.cancel)}>Cancel</Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
                <FormControlLabel control={<CheckBox />} label="Trigger Scan On Successful Alignment" />
              </Grid>
            </CardContent>
            <CardActions>
              <Button variant="contained" startIcon={<PlayArrow />} className={classNames(classes.Button, classes.start)}>Start Alignment</Button>
              <Button variant="contained" startIcon={<Stop />} className={classNames(classes.Button, classes.abort)}>Abort Alignment</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item>
          <Card>
            <CardHeader title="GISAXS Scan" />
            <CardContent className={classes.content}>
              <Grid container direction="column">
                <Grid container direction="row" spacing={2}>
                  <Grid item>
                    <InputLabel htmlFor="select-exp-time">Exp. Time</InputLabel>
                    <Select
                      ref={selectRef}
                      label={"Exp Time"}
                      multiple
                      value={expTimes}
                      onChange={handleExpTime}
                      onOpen={handleExpTimesOpen}
                      open={expTimesOpen}
                      onClose={handleExpTimesClose}
                      input={<Input id="select-exp-time" />}
                      renderValue={selected => (
                        <div className={classes.chips}>
                          {selected.map(value => (
                            <Chip
                              key={value}
                              label={value}
                              className={classes.chip}
                              onDelete={() => handleDeleteTime(value)}
                              deleteIcon={<CancelIcon />}
                            />
                          ))}
                        </div>
                      )}
                    >
                      {times.map(name => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item>
                    <TextField
                      error={!validFilename}
                      label="Filename"
                      variant="outlined"
                      helperText={invalidFilenameText}
                      onChange={handleFilename}
                      value={filename}
                      margin="dense"
                    />
                  </Grid>
                  <Grid item>
                    <TextField variant="outlined" label="X Step Size" margin="dense" className={classes.inputField}></TextField>
                  </Grid>
                </Grid>
                <Grid container alignItems="center" direction="row" spacing={1}>
                  <Grid item>
                    <Typography>Angles (°)</Typography>
                  </Grid>
                  {angles.map((angle, index) => (
                    <Grid item key={index}>
                      <TextField
                        variant="outlined"
                        value={angle}
                        onChange={handleAngleChange}
                        inputProps={{ "data-index": index, onKeyDown: handleKeyDown }}
                        inputRef={cellRefs[index]}
                        margin="dense"
                        data-index={index}
                        InputProps={{
                          endAdornment:
                            <InputAdornment position="end">
                              <IconButton size="small" onClick={handleRemoveAngle} data-index={index}>
                                <CancelIcon size="small" />
                              </IconButton>
                            </InputAdornment>
                        }}
                        className={classes.angleField}
                      />
                    </Grid>
                  ))}
                  <Grid item>
                    <Fab onClick={handleAddPoint} size="small" className={classes.start}>
                      <Add />
                    </Fab>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button variant="contained" startIcon={<PlayArrow />} className={classNames(classes.Button, classes.start)}>Start Scan</Button>
              <Button variant="contained" startIcon={<Pause />} className={classNames(classes.Button, classes.pause)}>Pause Scan</Button>
              <Button variant="contained" startIcon={<Stop />} className={classNames(classes.Button, classes.abort)}>Abort Scan</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item>
          <Grid container direction="row" spacing={2} justify="space-around">
            <Grid item>
              <ChartElement numplots={4} data={heightScanData} width={chartWidth} height={750} xTitle="Height" yTitle="Counts" type="Scatter" />
            </Grid>
            <Grid item>
              <ChartElement numplots={4} data={omegaScanData} width={chartWidth} height={750} xTitle="Omega" yTitle="Counts" type="Scatter" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <CustomTimeDialog onClose={handleCustomTime} open={customTimeOpen} />
    </React.Fragment>
  )
};

export default GrazingPage;
