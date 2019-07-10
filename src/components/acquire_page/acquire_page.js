import React, { Component } from "react";
import { connect } from "react-redux";

import * as actionCreators from "../../actions/index";

import { ophydSubscription } from "../ophydSubscription/ophyd_subscription";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import CancelIcon from "@material-ui/icons/Cancel";
import classNames from "classnames";
import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";
import red from "@material-ui/core/colors/red";
import deepOrange from "@material-ui/core/colors/deepOrange";
import grey from "@material-ui/core/colors/grey";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import CustomTimeDialog from "../custom_time_dialog/custom_time_dialog";
import LoopTable from "../loop_table/loop_table";
import { Typography } from "@material-ui/core";
import { strikethrough } from "ansi-colors";

function mapDeviceToProps(state) {
  return {
    devices: state.ophyd.devices
  };
}

function Hello(props) {
  return <h1>Hello, {props.devices[props.device]}</h1>;
}

const Blah = connect(
  mapDeviceToProps,
  actionCreators
)(ophydSubscription(Hello));

const styles = theme => ({
  root: {
    display: "flex",
    flexGrow: 1
  },
  button: {
    color: "white",
    margin: "2px",
    "&:hover": {
      color: "white"
    }
  },
  acquire: {
    backgroundColor: green["700"],
    "&:hover": {
      backgroundColor: green["A700"]
    }
  },
  pause: {
    backgroundColor: amber["700"],
    "&:hover": {
      backgroundColor: amber["A700"]
    }
  },
  resume: {
    backgroundColor: amber["700"],
    "&:hover": {
      backgroundColor: amber["A700"]
    }
  },
  finish: {
    backgroundColor: deepOrange["500"],
    "&:hover": {
      backgroundColor: deepOrange["A400"]
    }
  },
  halt: {
    backgroundColor: red["500"],
    "&:hover": {
      backgroundColor: red["A700"]
    }
  },
  chip: {
    margin: "2px"
  },
  status: {
    color: grey["400"]
  },
  small_check: {
    width: "24px",
    height: "24px"
  },
  label: {
    color: grey["400"]
  },
  number: {
    height: "8px"
  }
});

var times = [0.1, 0.5, 1, 2, 5, 10, 20, 30, 60, 120, "Custom"];

class AcquirePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validFilename: true,
      invalidFilenameText: "",
      filename: "",
      expTimes: [1],
      description: "",
      customTimeOpen: false,
      numImages: 1,
      delay: 0,
      finishDemanded: false,
      pauseDemanded: false,
      adinfinitum: false
    };
  }

  handleFilename = event => {
    this.setState({ filename: event.target.value });

    const invalidCharacters = event.target.value.match(/[-!@#$%^&*()+|~=`{}\[\]:";'<>?,. \\\/]/g);
    if (invalidCharacters !== null) {
      this.setState({ validFilename: false });

      invalidCharacters.forEach((character, index) => {
        if (character === " ") {
          invalidCharacters[index] = "<space>";
        }
      });
      this.setState({ invalidFilenameText: "Invalid Characters: " + invalidCharacters.join("") });
    } else {
      this.setState({ validFilename: true, invalidFilenameText: "" });
    }
  };

  handleExpTime = event => {
    if (event.target.value.includes("Custom")) {
      this.setState({ customTimeOpen: true });
    } else {
      this.setState({ expTimes: event.target.value });
    }
  };

  handleNumImages = event => {
    this.setState({ numImages: parseInt(event.target.value) });
  };

  handleDelay = event => {
    this.setState({ delay: parseFloat(event.target.value) });
  };

  handleDescription = event => {
    this.setState({ description: event.target.value });
  };
  handleDeleteTime = value => {
    this.setState({ expTimes: this.state.expTimes.filter(num => num !== value) });
  };

  handleCustomTime = time => {
    this.setState({ customTimeOpen: false });
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

  handleAcquire = () => {
    this.props.subscribeOphyd("simulated.sim_motors.sample_table.x");
    this.setState({ finishDemanded: false, pauseDemanded: false, acquiringFlag: true });
    this.props.acquire(
      this.state.filename,
      this.state.expTimes,
      this.state.adinfinitum ? null : this.state.numImages,
      this.state.delay,
      this.state.description
    );
  };
  handlePause = () => {
    if (this.state.pauseDemanded) {
      this.props.resume();
      this.setState({ pauseDemanded: false });
    } else {
      this.setState({ pauseDemanded: true });
      this.props.pause();
    }
  };

  handleFinish = () => {
    if (this.state.finishDemanded) {
      this.props.halt();
      this.setState({ finishDemanded: false });
    } else {
      this.setState({ finishDemanded: true });
      this.props.stop();
    }
  };
  handleAdInfinitum = () => {
    this.setState({ adinfinitum: !this.state.adinfinitum });
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root} spacing={2}>
        <Blah device={"simulated.sim_motors.sample_table.x"} />
        <Blah device={"simulated.sim_motors.sample_table.y"} />
        <Grid item xs={12}>
          <Grid container justify="left" spacing={10}>
            <Grid item>
              <div>
                <Button
                  variant="contained"
                  size="large"
                  onClick={this.handleAcquire}
                  className={classNames(classes.button, classes.acquire)}
                >
                  Acquire
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  onClick={this.handlePause}
                  className={classNames(
                    classes.button,
                    this.state.pauseDemanded ? classes.resume : classes.pause
                  )}
                >
                  {this.state.pauseDemanded ? "Resume" : "Pause"}
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  onClick={this.handleFinish}
                  className={classNames(
                    classes.button,
                    this.state.finishDemanded ? classes.halt : classes.finish
                  )}
                >
                  {this.state.finishDemanded ? "Halt!!" : "Finish"}
                </Button>
              </div>
              <Typography align="center" variant="h6" className={classes.status}>
                {this.props.status}
              </Typography>
            </Grid>
            <Grid item>
              <InputLabel htmlFor="select-exp-time">Exp. Time</InputLabel>
              <Select
                label={"Exp Time"}
                multiple
                value={this.state.expTimes}
                onChange={this.handleExpTime}
                input={<Input id="select-exp-time" />}
                renderValue={selected => (
                  <div className={classes.chips}>
                    {selected.map(value => (
                      <Chip
                        key={value}
                        label={value}
                        className={classes.chip}
                        onDelete={() => this.handleDeleteTime(value)}
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
                error={!this.state.validFilename}
                label="Filename"
                variant="outlined"
                helperText={this.state.invalidFilenameText}
                onChange={this.handleFilename}
                value={this.state.filename}
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
                  onChange={this.handleNumImages}
                  value={this.state.numImages}
                  disabled={this.state.adinfinitum}
                />
                <Grid item align="center">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.checkedA}
                        onChange={this.handleAdInfinitum}
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
              <TextField
                label="Delay between Acquisitions"
                variant="outlined"
                type="number"
                inputProps={{ min: "0", step: "1" }}
                onChange={this.handleDelay}
                value={this.state.delay}
              />
            </Grid>
          </Grid>
          <Grid item>
            <TextField
              label="Description"
              multiline
              rows="4"
              fullWidth
              defaultValue=""
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={this.handleDescription}
              value={this.state.description}
            />
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Grid item>
            <Button size="large" className={classNames(classes.acquire, classes.button)}>
              Start Scan
            </Button>
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Grid item>
            <LoopTable />
          </Grid>
        </Grid>
        <CustomTimeDialog onClose={this.handleCustomTime} open={this.state.customTimeOpen} />
      </Grid>
    );
  }
}

AcquirePage.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    status: state.acquire.status
  };
}

export default connect(
  mapStateToProps,
  actionCreators
)(withStyles(styles)(AcquirePage));
