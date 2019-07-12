import React, { Component } from "react";
import { connect } from "react-redux";

import * as actionCreators from "../../actions/index";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import classNames from "classnames";
import red from "@material-ui/core/colors/red";
import grey from "@material-ui/core/colors/grey";
import Grid from "@material-ui/core/Grid";

import VacComponent from "../vac_component/vacComponent"
import ManualVacComponent from "../vac_component/ManualVacControls"
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

class VacuumPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          customTimeOpen: false,
          staff: false,
          password: ''
        };
    }

    checkPassword = (input) =>{
      if (input === 'Legoland') {
        this.setState({ staff: true });
        //console.log(this.state.staff);
        //console.log(this.props.password)
      } else {this.setState({ staff: false })}
    }

    handleClickDialog = event => {
      this.setState({ customVacOpen: true });
    }

    handleClose = event => {
      this.setState({ customVacOpen: false });
    }

    handleStaff = event => {
      if (event.key === 'Enter') {
        this.setState({ password : '' });
        //console.log(event.target.value);
        this.checkPassword(event.target.value);
          }
    }

    handleConnect = event =>{
      this.props.start_listeners();
    }

    handleLock = event => {
      this.setState({ staff: false })
    }

    handleAbort = event => {
      this.props.vac_abort()
    }

    handleInput = event => {
      const inputPassword = event.target.value;
      this.setState( { password : inputPassword })
    }
    

render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root} spacing={5} direction='column'>
        <Grid container className={classes.root} spacing={5} direction='row' alignItems ='baseline' justify= 'space-evenly'>
        <Grid item xs ={2}>
          <Button onClick={this.handleConnect}>
            Connect
          </Button>
          </Grid>
          <Grid item xs ={2}>
          <Button onClick= {this.handleLock} >
            Lock
          </Button>
          </Grid>
          <Grid item xs ={2}>
          <Button onClick= {this.handleAbort} className={classNames(classes.button, classes.halt)}>
            Abort!
          </Button>
        </Grid>
        </Grid>
        <Grid item xs={12}>
          <VacComponent id='Chamber' staff={this.state.staff}/>
        </Grid>
        <Grid item xs={12}>
          <VacComponent id='Nosecone' staff={this.state.staff}/>
        </Grid>
        <Grid item xs={12}>
          <VacComponent id='Beamline' staff={this.state.staff}/>
        </Grid>
        <Grid container className={classes.root} spacing={5} direction='row' alignItems ='baseline' justify= 'space-evenly'>
        <Grid item xs ={4} spacing = {2}></Grid>
        <Grid item xs ={4} spacing = {3}>
          <TextField type='password' 
                     value= {this.state.password}
                     label = 'Staff Login' 
                     onChange ={this.handleInput}
                     onKeyPress={this.handleStaff} />
        </Grid>
        <Grid item xs ={4} spacing = {3}>
          
        </Grid>
        </Grid>
        <Grid item xs={12}>
          <VacComponent id='Vessel' staff={this.state.staff}/>
        </Grid>
        <Grid item xs={12}>
          <Typography>Valves</Typography>
        </Grid>
        <Grid container className={classes.root} spacing={5} alignItems='baseline' direction='row' justify ='space-evenly'>
          <Grid item xs={6} padding ={20}>
            <ManualVacComponent valve={true} id='Valve07' staff={this.state.staff} />
          </Grid>
          <Grid item xs={6}>
            <ManualVacComponent valve={true} id='Valve10' staff={this.state.staff} />
          </Grid>
          <Grid item xs={6}>
            <ManualVacComponent valve={true} id='Valve11' staff={this.state.staff} />
          </Grid>
          <Grid item xs={6}>
            <ManualVacComponent valve={true} id='IGV06' staff={this.state.staff} />
          </Grid>
          <Grid item xs={6}>
            <ManualVacComponent valve={true} id='IGV08' staff={this.state.staff} />
          </Grid>
          <Grid item xs={6}>
            <ManualVacComponent valve={true} id='IGV09' staff={this.state.staff} />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography>Pumps</Typography>
        </Grid>
        <Grid container className={classes.root} spacing={5} alignItems='baseline' direction='row' justify ='space-evenly'>
          <Grid item xs={6}>
            <ManualVacComponent valve={false} id='Ebarra' staff={this.state.staff} />
          </Grid>
          <Grid item xs={6}>
            <ManualVacComponent valve={false} id='Turbo1' staff={this.state.staff} />
          </Grid>
          <Grid item xs={6}>
            <ManualVacComponent valve={false} id='Turbo2' staff={this.state.staff} />
          </Grid>
          <Grid item xs={6}>
            <ManualVacComponent valve={false} id='Backing1' staff={this.state.staff} />
          </Grid>
          <Grid item xs={6}>
            <ManualVacComponent valve={false} id='Backing2' staff={this.state.staff} />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

VacuumPage.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
  };
}

export default connect(
  mapStateToProps,
  actionCreators
)(withStyles(styles)(VacuumPage));
