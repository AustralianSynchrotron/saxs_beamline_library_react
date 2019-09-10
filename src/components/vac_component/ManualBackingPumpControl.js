import React from "react";
import { makeStyles, mergeClasses } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import green from "@material-ui/core/colors/green";
import grey from "@material-ui/core/colors/grey";
import red from "@material-ui/core/colors/red";
import Paper from "@material-ui/core/Paper";
import {
  OphydButton,
  OphydToggleButton,
  OphydSlider,
  OphydTextField,
  OphydStatusField
} from "../ophyd_components/ophyd_components";

const useStyles = makeStyles({
  second: {
    background: green[500],
    color: "white",
    height: 48,
    "&:hover": {
      backgroundColor: green[700]
    }
  },
  first: {
    background: red[500],
    color: "white",
    height: 48,
    "&:hover": {
      backgroundColor: red["A700"]
    }
  },
  root: {
    display: "flex",
    flexDirection: "row",
    width: "560px",
    justifyContent: "center",
    alignItems: "center",
    padding: "5px"
  },
  horizontal: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px"
  }
});

const ManualBackingPumpControl = props => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Paper background={grey["900"]}>
        <div className={classes.root}>
          <div clasname={classes.horizontal}>
            <Typography variant="body1">{props.description}</Typography>
          </div>
          <div classname={classes.horizontal}>
            <OphydButton
              label="Start"
              value={1}
              device={props.pump + ".backing_start"}
              classes={classes.first}
            />
          </div>
          <div classname={classes.horizontal}>
            <OphydButton
              label="Stop"
              value={1}
              device={props.pump + ".backing_stop"}
              classes={classes.second}
            />
          </div>
          <div classname={classes.horizontal}>
            <OphydStatusField label="Pressure" device={props.pump + ".pressure"} />
          </div>
          <div classname={classes.horizontal} margin="10px">
            <OphydStatusField label="Speed" device={props.pump + ".speed"} />
          </div>
        </div>
      </Paper>
    </React.Fragment>
  );
};
export default ManualBackingPumpControl;
