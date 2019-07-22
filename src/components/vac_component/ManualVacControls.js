import React, { Component } from "react";
import { connect } from "react-redux";

import * as actionCreators from "../../actions/index";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import classNames from "classnames";
import green from "@material-ui/core/colors/green";
import deepOrange from "@material-ui/core/colors/deepOrange";
import grey from "@material-ui/core/colors/grey";
import Grid from "@material-ui/core/Grid";
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

  buttonDisabled: {
    color: theme.palette.grey[900]
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

class ManualVacComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valve_status: "",
      pump_status: "",
      isOpen: true,
      isRunning: true
    };
  }

  parseID = () => {
    switch (this.props.id) {
      case "Valve07":
        this.setState({ valve_status: this.props.valves_status.vlv07 });
        break;
      case "Valve10":
        this.setState({ valve_status: this.props.valves_status.vlv10 });
        break;
      case "Valve11":
        this.setState({ valve_status: this.props.valves_status.vlv11 });
        break;
      case "Valve12":
        this.setState({ valve_status: this.props.valves_status.vlv12 });
        break;
      case "IGV06":
        this.setState({ valve_status: this.props.valves_status.igv06 });
        break;
      case "IGV08":
        this.setState({ valve_status: this.props.valves_status.igv08 });
        break;
      case "IGV09":
        this.setState({ valve_status: this.props.valves_status.igv09 });
        break;
      case "Ebarra":
        this.setState({ pump_status: this.props.pumps_status.ebarra });
        break;
      case "Turbo1":
        this.setState({ pump_status: this.props.pumps_status.turbo1 });
        break;
      case "Turbo2":
        this.setState({ pump_status: this.props.pumps_status.turbo2 });
        break;
      case "Backing1":
        this.setState({ pump_status: this.props.pumps_status.backing1 });
        break;
      case "Backing2":
        this.setState({ pump_status: this.props.pumps_status.backing2 });
        break;
      default: {
      }
    }
  };

  handleClick1 = event => {
    if (this.props.valve === true) {
      this.props.manual_valve(this.props.id, "open");
    } else {
      this.props.manual_pump(this.props.id, "start");
    }
  };

  handleClick2 = event => {
    if (this.props.valve === true) {
      this.props.manual_valve(this.props.id, "close");
    } else {
      this.props.manual_pump(this.props.id, "stop");
    }
  };

  componentDidMount() {
    this.parseID();
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
          justify="space-evenly"
        >
          <div>
            <Grid item xs={2}>
              <Typography className={classes.label}>{this.props.id}</Typography>
            </Grid>
          </div>
          <Grid item xs={2}>
            <Button
              className={classNames(classes.button, classes.pump)}
              onClick={this.handleClick1}
              disabled={!this.props.staff}
            >
              {this.props.valve ? "open" : "run"}
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button
              className={classNames(classes.button, classes.vent)}
              onClick={this.handleClick2}
              disabled={!this.props.staff}
            >
              {this.props.valve ? "close" : "stop"}
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Typography className={classes.label}>
              {this.props.valve ? this.state.valve_status : this.state.pump_status}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

ManualVacComponent.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    valves_status: state.vacuum.valves_status,
    pumps_status: state.vacuum.pumps_status
  };
}

export default connect(
  mapStateToProps,
  actionCreators
)(withStyles(styles)(ManualVacComponent));
