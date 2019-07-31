import React, { Component } from "react";
import { connect } from "react-redux";

import * as actionCreators from "../../actions/index";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import classNames from "classnames";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import grey from "@material-ui/core/colors/grey";
import blue from "@material-ui/core/colors/blue";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import CancelIcon from "@material-ui/icons/Cancel";
import ColoriseIcon from "@material-ui/icons/Colorize"
import CustomTimeDialog from "../custom_time_dialog/custom_time_dialog";

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

    start: {
        backgroundColor: green["500"],
        "&:hover": {
          backgroundColor: green["A700"]
        }
      },

    hydrate: {
        backgroundColor: blue["500"],
        "&:hover": {
          backgroundColor: blue["A700"]
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

  const shapes = [
    "Square",
    "Cylinder"
  ];

  var times = [0.1, 0.5, 1, 2, 5, 10, 20, 30, 60, 120, "Custom"];

  class TensilePage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        length: 1,
        width: 1,
        thickness:1,
        hydrationvol: 0.25,
        delay: 60,
        dispStart: 0,
        dispStop: 100,
        dispSteps: 10,
        sampleX_start: 0,
        sampleX_end:10,
        sampleX_points: 6,
        filename: null,
        expTimes: [1],
        customTimeOpen: false

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



    handleLengthInput = event => {
        const inputLength = event.target.value;
        this.setState({ length: inputLength });
      };

    handleLengthSend = event => {
        if (event.key === "Enter") {
            this.props.tensileLength( this.state.length );
            console.log(this.state)
        }
    }
    
    handleWidthInput = event => {
        const inputWidth = event.target.value;
        this.setState({ width: inputWidth });
      };
    
    handleWidthSend = event => {
        if (event.key === "Enter") {
            this.props.tensileWidth( this.state.width );
            console.log(this.state)
        }
    }
    
    handleThicknessInput = event => {
        const inputThickness = event.target.value;
        console.log(event.target.value);
        this.setState({ thickness: inputThickness });
      };
    
    handleThicknessSend = event => {
        if (event.key === "Enter") {
            this.props.tensileThickness( this.state.thickness );
            console.log(this.state)
        }
    }

    handleStart = event =>{
        console.log(this.state.filename,
            this.state.exposure_time)
    }

    handleAbort = event => {
            this.props.tensile_abort();
    
    }

    handleTensileAcquire = event => {
        this.props.TensileAcquire(
            this.state.filename, 
            this.state.expTimes, 
            this.state.dispStart,
            this.state.dispStop,
            this.state.dispSteps,
            this.state.sampleX_start,
            this.state.sampleX_end,
            this.sampleX_points,
            this.state.delay,
            this.state.hydrationvol
            )
    }

    handleHydrate = event => {
        this.props.Hydrate(
            this.state.hydrationvol
        )
    }



    handleDstart = event => {
        this.setState({ dispStart: event.target.value });
    }

    handleDstop = event => {
            this.setState({ dispStop: event.target.value });
    }

    handleDstep = event => {
            this.setState({ dispSteps: event.target.value });

    }

    handleXstart = event => {
        this.setState({  sampleX_start: event.target.value });
    }

    handleXstop = event => {
            this.setState({ sampleX_end: event.target.value });
    }

    handleXstep = event => {
            this.setState({ sampleX_points: event.target.value });

    }

    handleDelay = event => {
        this.setState({ delay: event.target.value });
    }

    handleHydrationVol = event => {
        this.setState({ hydrationvol: event.target.value });
    }

    handleAbort = event => {
        this.props.tensileAbort()
    }

    
    render() {
        const { classes } = this.props;
        return (
          <Grid container className={classes.root} spacing={0} direction="column">
            <Grid
              container
              className={classes.root}
              spacing={5}
              direction="row"
              alignItems="baseline"
              justify="center"
            >
          <Grid item xs={1}></Grid>
          <Grid item xs={1}>
            <Button onClick={this.handleTensileAcquire} className={classNames(classes.button, classes.start)}>
              Start
            </Button>
            </Grid>
            <Grid item xs={1}>
            <Button onClick={this.handleAbort} className={classNames(classes.button, classes.halt)}>
              Abort!
            </Button> 
          </Grid>
          <Grid item xs={1}>
            <Button onClick={this.handleHydrate} className={classNames(classes.button, classes.hydrate)}>
              Hydrate sample
              <ColoriseIcon />
            </Button> 
          </Grid>
          <Grid item xs={1}>
          </Grid>
          <Grid
              container
              className={classes.root}
              spacing={5}
              direction="row"
              alignItems="baseline"
              justify="left"
            >
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
        <Grid item xs ={2}>
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
            
          <Grid
              container
              className={classes.root}
              spacing={10}
              direction="row"
              alignItems="baseline"
              justify="left"
            >
          </Grid>
          <Grid item xs={2}>
              <TextField label = 'Displacement Start' variant= "outlined" value = {this.state.dispStart} onChange={this.handleDstart} />
          </Grid>
          <Grid item xs={2}>
              <TextField label = 'Displacement Stop' variant= "outlined" value = {this.state.dispStop} onChange={this.handleDstop} />
          </Grid>
          <Grid item xs={2}>
              <TextField label = 'Displacement Steps' variant= "outlined" value = {this.state.dispSteps} onChange={this.handleDstep} />
          </Grid>
          <Grid item xs={2}>
          <TextField label = 'Delay after move' variant= "outlined" value= {this.state.delay} onChange={this.handleDelay} />
          </Grid>
          <Grid
              container
              className={classes.root}
              spacing={5}
              direction="row"
              alignItems="baseline"
              justify="left"
            >
          <Grid item xs={2}></Grid>
          </Grid>  
         
          </Grid>
          <Grid
              container
              className={classes.root}
              spacing={5}
              direction="row"
              alignItems="baseline"
              justify="left"
            >
          <Grid item xs={2}>
              <TextField label = 'Length' variant= "outlined" value = {this.state.length} onChange={this.handleLengthInput} onKeyPress= {this.handleLengthSend} />
          </Grid>
          <Grid item xs={2}>
              <TextField label = 'Width' variant= "outlined" value = {this.state.width} onChange={this.handleWidthInput} onKeyPress= {this.handleWidthSend} />
          </Grid>
          <Grid item xs={2}>
              <TextField label = 'Thickness' variant= "outlined" value = {this.state.thickness} onChange={this.handleThicknessInput} onKeyPress= {this.handleThicknessSend}/>          
          </Grid>      
          <Grid item xs={2}>
              <TextField label = 'Cross Sectional Area' variant= "outlined" value = {this.props.csa} />
          </Grid>
          <Grid item xs={2}>
              <TextField label = 'Poisson Ratio' variant= "outlined" value = "0.25" disabled="true"/>
          </Grid>
          <Grid item xs={2}>
          <TextField label = 'Shape' variant= "outlined" value="Square" disabled= "true"/>
          </Grid>

          </Grid>
          <Grid
              container
              className={classes.root}
              spacing={10}
              direction="row"
              alignItems="baseline"
              justify="left"
            >
          <Grid item xs={2}></Grid>
          </Grid>
          <Grid
              container
              className={classes.root}
              spacing={10}
              direction="row"
              alignItems="baseline"
              justify="left"
            >
          <Grid item xs={2}>
              <TextField variant='outlined' label= 'Hydration Volume' value= {this.state.hydrationvol} onChange={this.handleHydrationVol} />
          </Grid>
          <Grid item xs={2}>
              <TextField variant='outlined' label= 'Sample X start' value= {this.state.sampleX_start} onChange={this.handleXstart} />
          </Grid>          
          <Grid item xs={2}>
              <TextField variant='outlined' label= 'Sample X end' value= {this.state.sampleX_end} onChange={this.handleXstop} />          </Grid>
          <Grid item xs={2}>
              <TextField variant='outlined' label= 'Sample X points' value= {this.state.sampleX_points} onChange={this.handleXstep} />
          </Grid>
          </Grid>
          <Grid
              container
              className={classes.root}
              spacing={10}
              direction="row"
              alignItems="baseline"
              justify="left"
            >
                <Grid item xs={2}></Grid>
          </Grid>
          <Grid
              container
              className={classes.root}
              spacing={10}
              direction="row"
              alignItems="baseline"
              justify="left"
            >
          
          <Grid item xs={2}>   
          <Typography>Displacement: {this.props.extension.toPrecision(3)} mm</Typography>
          </Grid>
          <Grid item xs={2}>   
          <Typography>Volts: {this.props.volts.toPrecision(3)} Volts</Typography>
          </Grid>
          <Grid item xs={2}>   
          <Typography> Force: {this.props.force.toPrecision(3)} Kg</Typography>
          </Grid>
          <Grid item xs={2}>   
          <Typography> Stress: {this.props.stress.toPrecision(3)} </Typography>
          </Grid>
          <Grid item xs={2}>   
          <Typography> Strain: {this.props.strain.toPrecision(3)} </Typography>
          </Grid>
          </Grid>
          </Grid>
          </Grid>
        );
    }
}

TensilePage.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  function mapStateToProps(state) {
    return {
        extension:state.tensile.extension,
        csa:state.tensile.csa,
        strain:state.tensile.strain,
        stress:state.tensile.stress,
        volts:state.tensile.volts,
        force:state.tensile.force,
    };
  }
  
  export default connect(
    mapStateToProps,
    actionCreators
  )(withStyles(styles)(TensilePage));

