import React from "react";
import { makeStyles } from "@material-ui/styles";
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
    width: "350px",
    justifyContent: "center",
    alignItems: "center",
    padding: "1px"
  },
  horizontal: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px"
  }
});

const ManualValveControl = props => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Paper background={grey["900"]}>
        <div className={classes.root}>
          <div clasname={classes.horizontal}>
            <Typography variant="body1">{props.description}</Typography>
          </div>
          <OphydToggleButton
            label={props.label !== undefined ? props.label : null}
            labelPosition="left"
            labelFirst="Close"
            labelSecond="Open"
            valueFirst={2}
            valueSecond={1}
            readFirst={0}
            readSecond={1}
            device={props.valve + ".open_close_withrbv"}
            classes={classes}
          />
          <OphydStatusField
            device={props.valve + ".open_state"}
            good_status={1}
            badStatusText="Closed"
            goodStatusText="Open"
          />
        </div>
      </Paper>
    </React.Fragment>
  );
};
export default ManualValveControl;
