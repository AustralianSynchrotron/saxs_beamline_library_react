import React, { Component } from "react";
import { connect } from "react-redux";

import * as actionCreators from "../../actions/index";

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

import VentDialog from "../custom_vac_dialog/custom_vent_dialog";
import PumpDialog from "../custom_vac_dialog/custom_pump_dialog";
import LoopTable from "../loop_table/loop_table";
import { Typography } from "@material-ui/core";
import { strikethrough } from "ansi-colors";

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


class VacComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
          PumpOpen: false,
          VentOpen: false
        };
    }

    handleClickVent = event => {
      this.setState({ VentOpen: true });
    }

    handleClickPump = event => {
      this.setState({ VentOpen: true });
    }

    handlePumpClose = event => {
      this.setState({ customVacOpen: false });
    }

     handleVentClose = event => {
      this.setState({ customVacOpen: false });
    }

render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root} spacing={2}>
        <Grid item>
          <Button onClick={this.handleClickPump} >
            pump me
        </Button>
        </Grid>

        <Grid item>
          <Button onClick={this.handleClickVent} >
            vent me
        </Button>
        </Grid>
        <PumpDialog onClose={this.handlePumpClose} open={this.state.PumpOpen} title='pump me' />
        <VentDialog onClose={this.handleVentClose} open={this.state.VentOpen} title='vent me' />
      </Grid>
    );
  }
}

VacComponent.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
  };
}

export default connect(
  mapStateToProps,
  actionCreators
)(withStyles(styles)(VacComponent));