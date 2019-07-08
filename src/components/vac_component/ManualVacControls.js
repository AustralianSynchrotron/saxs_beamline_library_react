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
import Paper from'@material-ui/core/Paper'
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
  pump: {
    backgroundColor: green["700"],
    "&:hover": {
      backgroundColor: green["A700"]
    }
  },

  vent: {
    backgroundColor: deepOrange["500"],
    "&:hover": {
      backgroundColor: deepOrange["A400"]
    }
  },

  ok: {
    color: 'green'
  },
   bad: {
    color: 'red'
  },

  status: {
    color: grey["400"]
  },
  small_check: {
    width: "24px",
    height: "24px"
  },
  label: {
    color: grey["400"],
  }

});

class ManualVacComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
          valve_status: '',
          pump_status: '',
          isOpen: true,
          isRunning:true,
        };
    }

    parseID = () => {
      switch (this.props.id) {
        case 'Valve07':
          this.setState({valve_status: this.props.valves_status.vlv07});
          break;
        case 'Valve10':
          this.setState({valve_status: this.props.valves_status.vlv10});
          break;
        case 'Valve11':
          this.setState({valve_status: this.props.valves_status.vlv11});
          break;
        case 'Valve12':
          this.setState({valve_status: this.props.valves_status.vlv12});
          break;
        case 'IGV06':
          this.setState({valve_status: this.props.valves_status.igv06});
          break;
        case 'IGV08':
          this.setState({valve_status: this.props.valves_status.igv08});
          break;
        case 'IGV09':
          this.setState({valve_status: this.props.valves_status.igv09});
          break;
        case 'Ebarra':
          this.setState({pump_status: this.props.pumps_status.ebarra});
          break;
        case 'Turbo1':
          this.setState({pump_status: this.props.pumps_status.turbo1});
          break;
        case 'Turbo2':
          this.setState({pump_status: this.props.pumps_status.turbo2});
          break;
      }
    }

    handleClick = () =>{

    };

    componentDidMount() {
      this.parseID()
    }
render() {
    const { classes } = this.props;
    return (
      <Paper>
      <Grid container className={classes.root} spacing={2} alignItems='baseline' justify={'center'}>
        <div>
        <Grid item xs={2}>
          <Typography className={classes.label} >{this.props.id}</Typography>
        </Grid>
        </div>
        <Grid item xs={2}>
          <Button  className={classNames(classes.button, classes.pump)} onClick={this.handleClick()} >
            {this.props.valve ? "open":"run"}
        </Button>
        </Grid>
        <Grid item xs={2}>
          <Button className={classNames(classes.button, classes.vent)} onClick={this.handleClick()} >
           {this.props.valve ? "close":"stop"}
        </Button>
        </Grid>
        <Grid item xs={2}>
          <Typography className={classes.label}>{this.props.valve? this.state.valve_status : this.state.pump_status}</Typography>
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