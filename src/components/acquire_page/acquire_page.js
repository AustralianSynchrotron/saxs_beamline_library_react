import { IconButton, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import amber from "@material-ui/core/colors/amber";
import deepOrange from "@material-ui/core/colors/deepOrange";
import green from "@material-ui/core/colors/green";
import grey from "@material-ui/core/colors/grey";
import red from "@material-ui/core/colors/red";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/styles";
import classNames from "classnames";
import DeathStar from "mdi-material-ui/DeathStar";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { abort, acquire, halt, pause, resume } from "../../actions";
import { pew } from "../../media/sounds";
import CustomTimeDialog from "../custom_time_dialog/custom_time_dialog";
import GenericScan from "../generic_scan/generic_scan";
import { OphydToggleButton, OphydCheckBox } from "../ophyd_components/ophyd_components";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexGrow: 1,
  },
  button: {
    color: "white",
    margin: "2px",
    "&:hover": {
      color: "white",
    },
  },
  acquire: {
    backgroundColor: green["700"],
    "&:hover": {
      backgroundColor: green["A700"],
    },
  },
  pause: {
    backgroundColor: amber["700"],
    "&:hover": {
      backgroundColor: amber["A700"],
    },
  },
  resume: {
    backgroundColor: amber["700"],
    "&:hover": {
      backgroundColor: amber["A700"],
    },
  },
  finish: {
    backgroundColor: deepOrange["500"],
    "&:hover": {
      backgroundColor: deepOrange["A400"],
    },
  },
  halt: {
    backgroundColor: red["500"],
    "&:hover": {
      backgroundColor: red["A700"],
    },
  },
  chip: {
    margin: "2px",
    zIndex: 100,
  },
  delete: {
    color: grey["700"],
    "&:hover": {
      color: red["700"],
      backgroundColor: grey["A700"],
    },
  },
  time: {
    minWidth: "100px",
  },
  status: {
    color: grey["400"],
  },
  small_check: {
    width: "24px",
    height: "24px",
  },
  label: {
    color: grey["400"],
  },
  number: {
    height: "8px",
  },
  first: {
    background: green[500],
    color: "white",
    height: 48,
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  second: {
    background: red[500],
    color: "white",
    height: 48,
    "&:hover": {
      backgroundColor: red["A700"],
    },
  },
});

const storeItemBrowser = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

const getItemBrowser = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const defaultTimes = [0.1, 0.5, 1, 2, 5, 10, 20, 30, 60, 120, "Calib", "Custom", "Reset"];

const AcquirePage = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [times, _setTimes] = useState(getItemBrowser("times") || defaultTimes);
  const setTimes = (_times) => {
    _setTimes(_times);
    storeItemBrowser("times", _times);
  };

  const [validFilename, setValidFilename] = useState(true);
  const [invalidFilenameText, setInvalidFilenameText] = useState("");

  const [filename, _setFilename] = useState(getItemBrowser("filename") || "");
  const setFilename = (_filename) => {
    _setFilename(_filename);
    storeItemBrowser("filename", _filename);
  };

  const [expTimes, _setExpTimes] = useState(getItemBrowser("expTimes") || [1]);
  const setExpTimes = (_expTimes) => {
    _setExpTimes(_expTimes);
    storeItemBrowser("expTimes", _expTimes);
  };
  const [description, _setDescription] = useState(getItemBrowser("description") || "");
  const setDescription = (_description) => {
    _setDescription(_description);
    storeItemBrowser("description", _description);
  };

  const [customTimeOpen, setCustomTimeOpen] = useState(false);

  const [numImages, _setNumImages] = useState(getItemBrowser("numImages") || 1);
  const setNumImages = (_numImages) => {
    _setNumImages(_numImages);
    storeItemBrowser("numImages", _numImages);
  };
  const [delay, _setDelay] = useState(getItemBrowser("delay") || 0);
  const setDelay = (_delay) => {
    _setDelay(_delay);
    storeItemBrowser("delay", _delay);
  };
  const [finishDemanded, setFinishDemanded] = useState(false);
  const [pauseDemanded, setPauseDemanded] = useState(false);
  const [adinfinitum, _setAdinfinitum] = useState(getItemBrowser("adinfinitum") || false);
  const setAdinfinitum = (_adinfinitum) => {
    _setAdinfinitum(_adinfinitum);
    storeItemBrowser("adinfinitum", _adinfinitum);
  };
  const [useShutter, _setUseShutter] = useState(getItemBrowser("useShutter") || false);
  const setUseShutter = (_useShutter) => {
    _setUseShutter(_useShutter);
    storeItemBrowser("useShutter", _useShutter);
  };

  const status = useSelector((state) => state.acquire.status) || null;
  const gamePad = useSelector((state) => state.gamePad.buttons) || null;

  const handleFilename = (event) => {
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

  const handleExpTime = (event, value) => {
    if (value.includes("Custom")) {
      setCustomTimeOpen(true);
    } else if (value.includes("Calib")) {
      setExpTimes([1, 2, 5, 10]);
    } else if (value.includes("Reset")) {
      setTimes(defaultTimes);
    } else {
      setExpTimes(value);
    }
  };

  const handleNumImages = (event) => {
    setNumImages(parseInt(event.target.value));
  };

  const handleDelay = (event) => {
    setDelay(parseFloat(event.target.value));
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleCustomTime = (time) => {
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
    storeItemBrowser("times", times);
  };

  const handleDeleteTime = (time) => {
    var tempTimes = [...times];
    var index = tempTimes.indexOf(time);
    if (index > -1) {
      tempTimes.splice(index, 1);
      setTimes(tempTimes);
    }
  };

  const handleAcquire = () => {
    setFinishDemanded(false);
    setPauseDemanded(false);
    dispatch(acquire(filename, expTimes, adinfinitum ? null : numImages, delay, useShutter, description));
    pew.play();
  };

  const handlePause = () => {
    if (pauseDemanded) {
      dispatch(resume());
      setPauseDemanded(false);
    } else {
      setPauseDemanded(true);
      dispatch(pause());
    }
  };

  const handleFinish = () => {
    if (setFinishDemanded) {
      dispatch(halt());
      setFinishDemanded(false);
    } else {
      setFinishDemanded(true);
      dispatch(abort());
    }
  };
  const handleAdInfinitum = () => {
    setAdinfinitum(!adinfinitum);
  };
  const handleUseShutter = () => {
    setUseShutter(!useShutter);
  };

  useEffect(() => {
    var toDelete = [];
    expTimes.forEach((t, i) => {
      var index = times.indexOf(t);
      if (index < 0) {
        toDelete.unshift(i);
      }
    });

    if (toDelete.length > 0) {
      var tempExpTimes = [...expTimes];
      toDelete.forEach((index) => {
        tempExpTimes.splice(index, 1);
      });
      setExpTimes(tempExpTimes);
    }
  }, [expTimes]);

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="flex-start" spacing={10}>
          <Grid item>
            <div>
              <h1>{gamePad[0]}</h1>
              <Tooltip title="That's no moon..." placement="top" arrow>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<DeathStar />}
                  onClick={handleAcquire}
                  className={classNames(classes.button, classes.acquire)}
                >
                  Pew Pew!!!
                </Button>
              </Tooltip>
              <Button
                variant="contained"
                size="large"
                onClick={handlePause}
                className={classNames(
                  classes.button,
                  pauseDemanded ? classes.resume : classes.pause
                )}
              >
                {pauseDemanded ? "Resume" : "Pause"}
              </Button>
              <Button
                variant="contained"
                size="large"
                onClick={handleFinish}
                className={classNames(
                  classes.button,
                  finishDemanded ? classes.halt : classes.finish
                )}
              >
                {finishDemanded ? "Halt!!" : "Finish"}
              </Button>
            </div>
            <Typography align="center" variant="h6" className={classes.status}>
              {status}
            </Typography>
          </Grid>
          <Grid item>
            <Autocomplete
              multiple
              id="tags-standard"
              options={times}
              value={expTimes}
              onChange={handleExpTime}
              defaultValue={[times[2]]}
              renderInput={(params) => (
                <TextField {...params} variant="standard" style={{ minWidth: 150 }} />
              )}
              renderOption={(option, { selected }) => (
                <React.Fragment>
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    key={option}
                    className={classes.time}
                  >
                    {option}
                    {["Custom", "Calib", "Reset"].indexOf(option) < 0 && (
                      <IconButton
                        edge="end"
                        size="small"
                        onClick={(event) => handleDeleteTime(option, event)}
                        className={classes.delete}
                      >
                        <DeleteForeverOutlinedIcon />
                      </IconButton>
                    )}
                  </Box>
                </React.Fragment>
              )}
            />
          </Grid>
          <Grid item>
            <TextField
              error={!validFilename}
              label="Filename"
              variant="outlined"
              helperText={invalidFilenameText}
              onChange={handleFilename}
              value={filename}
            />
          </Grid>
          <Grid item>
            <Grid container direction="column">
              <TextField
                label="Number of Acquisitions"
                variant="outlined"
                type="number"
                inputProps={{ min: "1", step: "1" }}
                InputProps={{ classes: { input: classes.number } }}
                onChange={handleNumImages}
                value={numImages}
                disabled={adinfinitum}
              />
              <Grid item align="center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={adinfinitum}
                      onChange={handleAdInfinitum}
                      value="adinfintum"
                      className={classes.small_check}
                    />
                  }
                  label="Ad Infinitum"
                  className={classes.label}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="column">
              <TextField
                label="Delay between Acquisitions"
                variant="outlined"
                type="number"
                inputProps={{ min: "0", step: "1" }}
                InputProps={{ classes: { input: classes.number } }}
                onChange={handleDelay}
                value={delay}
                disabled={!(numImages > 1 || adinfinitum)}
              />
              <Grid item align="center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={useShutter}
                      onChange={handleUseShutter}
                      value="useShutter"
                      className={classes.small_check}
                    />
                  }
                  label="Use Shutter"
                  className={classes.label}
                  disabled={!(delay > 0)}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item align="center">
            <Grid container direction="column">
              <OphydToggleButton
                label=""
                labelPosition="left"
                labelFirst="Feedback On"
                labelSecond="Feedback Off"
                valueFirst={false}
                valueSecond={true}
                readFirst={false}
                readSecond={true}
                device={"saxs_kv_conf.use_feedback"}
                toggleClasses={classes}
              />
              <OphydToggleButton
                label=""
                labelPosition="left"
                labelFirst="Save Video Image On"
                labelSecond="Save Video Image Off"
                valueFirst={false}
                valueSecond={true}
                readFirst={false}
                readSecond={true}
                device={"saxs_kv_conf.save_video_image"}
                toggleClasses={classes}
              />
              {/* <OphydCheckbox
              label="flag_testing_123"
              device={""} */}
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <TextField
            label="Description"
            multiline
            rows="4"
            fullWidth
            className={classes.textField}
            margin="normal"
            variant="outlined"
            onChange={handleDescription}
            value={description}
          />
        </Grid>
      </Grid>
      <Grid container justify="center">
        <Grid item>
          <GenericScan />
        </Grid>
      </Grid>
      <CustomTimeDialog onClose={handleCustomTime} open={customTimeOpen} />
    </Grid>
  );
};

AcquirePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default AcquirePage;
