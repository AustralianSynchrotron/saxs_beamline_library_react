import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";

import { useSelector } from "react-redux";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import Add from "@material-ui/icons/Add";
import DeleteOutline from "@material-ui/icons/DeleteOutline";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

import classNames from "classnames";

import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import grey from "@material-ui/core/colors/grey";
import {
  OphydButton,
  OphydToggleButton,
  OphydSlider,
  OphydTextField,
  OphydStatusField
} from "../ophyd_components/ophyd_components";

import SinglePositioner from "./single_positioner";

const useStyles = makeStyles({
  buttons: {
    display: "flex",
    flexDirection: "column",
    width: "200px"
  },
  add: {
    color: green[500]
  },
  delete: {
    color: red[700]
  },
  hidden: {
    display: "none"
  },
  odd: {
    background: grey[700]
  },
  even: {
    background: grey[800]
  },
  options: {
    width: "80px"
  }
});

const SingleLoop = props => {
  const classes = useStyles();

  const [numPositions, setNumPositions] = useState(20);
  const [delay, setDelay] = useState(0);
  const [numPositioners, setNumPositioners] = useState(1);

  const handleNumberPositionsChange = event => {
    if (event.type == "blur" || event.key === "Enter") {
      if (event.target.value === "") {
        return;
      }
      setNumPositions(parseInt(event.target.value));
    }
  };

  const handleDelayChange = event => {
    setDelay(parseInt(event.target.value));
  };

  const handleAddPositioner = () => {
    setNumPositioners(numPositioners + 1);
  };
  const handleRemovePositioner = () => {
    setNumPositioners(numPositioners - 1);
  };

  return (
    <React.Fragment>
      <Card>
        <Grid
          container
          direction="column"
          className={classNames(props.loopNum % 2 === 1 ? classes.odd : classes.even)}
          spacing={2}
        >
          <Grid item>
            <CardHeader
              title={"Loop " + props.loopNum}
              action={
                <IconButton>
                  <DeleteOutline className={classes.delete} onClick={props.onDelete} />
                </IconButton>
              }
            />
          </Grid>
          <CardContent>
            <Grid container direction="row" spacing={1}>
              <Grid item>
                <TextField
                  label="No. Points"
                  variant="outlined"
                  onKeyPress={handleNumberPositionsChange}
                  onBlur={handleNumberPositionsChange}
                  defaultValue={numPositions}
                  className={classes.options}
                  margin="dense"
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Delay (s)"
                  variant="outlined"
                  onKeyPress={handleDelayChange}
                  value={delay}
                  className={classes.options}
                  margin="dense"
                />
              </Grid>
            </Grid>
            <Grid container direction="row" spacing={1}>
              {[...Array(numPositioners)].map((e, i) => (
                <Grid item key={i}>
                  <IconButton onClick={handleRemovePositioner} data-index={i}>
                    <DeleteOutline className={classes.delete} />
                  </IconButton>
                  <SinglePositioner number={numPositions} />
                </Grid>
              ))}
              <Grid item>
                <IconButton onClick={handleAddPositioner}>
                  <Add className={classes.add} />
                </IconButton>
              </Grid>
            </Grid>
          </CardContent>
        </Grid>
      </Card>
    </React.Fragment>
  );
};
export default SingleLoop;
