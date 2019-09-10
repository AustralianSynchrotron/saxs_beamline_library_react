import React, { Component } from "react";
import { connect } from "react-redux";

import * as actionCreators from "../../actions/index";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import classNames from "classnames";
import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";
import red from "@material-ui/core/colors/red";
import deepOrange from "@material-ui/core/colors/deepOrange";
import grey from "@material-ui/core/colors/grey";
import Grid from "@material-ui/core/Grid";

import VentDialog from "../custom_vac_dialog/custom_vent_dialog";
import PumpDialog from "../custom_vac_dialog/custom_pump_dialog";

import {
  OphydButton,
  OphydToggleButton,
  OphydSlider,
  OphydTextField,
  OphydStatusField
} from "../ophyd_components/ophyd_components";

import { Typography } from "@material-ui/core";

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
  pump: {
    backgroundColor: green["700"],
    "&:hover": {
      backgroundColor: green["A700"]
    },
    "&:disabled": {
      backgroundColor: grey["900"]
    }
  },

  vent: {
    backgroundColor: deepOrange["500"],
    "&:hover": {
      backgroundColor: deepOrange["A400"]
    },
    "&:disabled": {
      backgroundColor: grey["900"]
    }
  },

  ok: {
    color: "green"
  },

  bad: {
    color: "red"
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
  }
});

class VacComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PumpOpen: false,
      VentOpen: false,
      pressure: null,
      status: "Nothing"
    };
  }

  parseID = () => {
    //console.log(this.props.vacstatus)
    switch (this.props.id) {
      case "Nosecone":
        this.setState({ pressure: parseFloat(this.props.pressures.nosecone) });
        this.setState({ status: this.props.vacstatus.nosecone });
        break;
      case "Chamber":
        this.setState({ pressure: parseFloat(this.props.pressures.chamber) });
        this.setState({ status: this.props.vacstatus.chamber });
        //console.log(this.props.vacstatus.chamber)
        break;
      case "Beamline":
        this.setState({ pressure: parseFloat(this.props.pressures.beamline) });
        this.setState({ status: this.props.vacstatus.beamline });
        break;
      case "Vessel":
        this.setState({ pressure: parseFloat(this.props.pressures.vessel) });
        this.setState({ status: this.props.vacstatus.vessel });
        break;
    }
  };

  handleClickVent = event => {
    this.setState({ VentOpen: true });
  };

  handleClickPump = event => {
    this.setState({ PumpOpen: true });
  };

  handlePumpClose = event => {
    this.setState({ PumpOpen: false });
  };

  handleVentClose = event => {
    this.setState({ VentOpen: false });
  };

  handleConsole = event => {
    console.log(this.props);
  };

  componentDidMount() {
    this.parseID();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.pressures !== this.props.pressures ||
      prevProps.vacstatus !== this.props.vacstatus
    ) {
      this.parseID();
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper>
        <Grid
          container
          className={classes.root}
          spacing={2}
          alignItems="baseline"
          justify={"center"}
        >
          <Grid item xs={2}>
            <Typography className={classes.label}>{this.props.id}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Button
              className={classNames(classes.button, classes.pump)}
              onClick={this.handleClickPump}
              disabled={this.props.id === "Vessel" ? !this.props.staff : false}
            >
              pump
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button
              className={classNames(classes.button, classes.vent)}
              onClick={this.handleClickVent}
              disabled={this.props.id === "Vessel" ? !this.props.staff : false}
            >
              vent
            </Button>
          </Grid>
          <Grid item xs={3}>
            <OphydStatusField
              label="Pressure"
              device={this.props.gauge + ".pressure_4"}
              toNumber={true}
              toExp={true}
              suffix="mbar"
            />
          </Grid>
          <Grid item xs={2}>
            <Typography
              className={classNames(this.state.pressure < 0.01 ? classes.ok : classes.bad)}
            >
              {this.state.status}
            </Typography>
          </Grid>
          <PumpDialog
            onClose={this.handlePumpClose}
            open={this.state.PumpOpen}
            title={this.props.id}
            id={this.props.id}
          />
          <VentDialog
            onClose={this.handleVentClose}
            open={this.state.VentOpen}
            title={this.props.id}
            id={this.props.id}
          />
        </Grid>
      </Paper>
    );
  }
}

VacComponent.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  //console.log(state.vacuum)
  return {
    vacstatus: state.vacuum.vac_Status,
    pressures: state.vacuum.pressures
  };
}

export default connect(
  mapStateToProps,
  actionCreators
)(withStyles(styles)(VacComponent));
