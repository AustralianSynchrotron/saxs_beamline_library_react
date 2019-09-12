import React from "react";
import { makeStyles } from "@material-ui/styles";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useSetDocker } from "./docker";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  start: {
    background: green[500],
    color: "white",
    height: 48,
    "&:hover": {
      backgroundColor: green[700]
    }
  },
  stop: {
    background: red[500],
    color: "white",
    height: 48,
    "&:hover": {
      backgroundColor: red["A700"]
    }
  },
  label: {
    fontSize: "24px"
  }
});

const DockerButton = props => {
  const setDocker = useSetDocker();

  const handleClick = () => {
    setDocker({ command: props.command, service: props.service.name });
  };

  return (
    <Button onClick={handleClick} className={props.classes}>
      {props.label}
    </Button>
  );
};

export const ServiceControl = props => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className={classes.root}>
        <Typography className={classes.label}>{props.service.name}</Typography>
        <DockerButton
          label="(Re)Start"
          command="restart_service"
          service={props.service}
          classes={classes.start}
        />
        <DockerButton
          label="Stop"
          command="stop_service"
          service={props.service}
          classes={classes.stop}
        />
        <Typography className={classes.label}>{props.service.status}</Typography>
      </div>
    </React.Fragment>
  );
};
