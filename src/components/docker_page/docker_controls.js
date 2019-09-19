import React from "react";
import { makeStyles } from "@material-ui/styles";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import blue from "@material-ui/core/colors/blue";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
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
  view: {
    background: blue[500],
    color: "white",
    height: 48,
    "&:hover": {
      backgroundColor: blue["A700"]
    }
  },
  label: {
    fontSize: "24px"
  },
  header: {
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
    <Grid container direction="row" xs={12} spacing={2}>
      <Grid item xs={3}>
        <Typography className={classes.label}>{props.service.name}</Typography>
      </Grid>
      <Grid item xs={1}>
        <DockerButton
          label="(Re)Start"
          command="restart_service"
          service={props.service}
          classes={classes.start}
        />
      </Grid>
      <Grid item xs={1}>
        <DockerButton
          label="Stop"
          command="stop_service"
          service={props.service}
          classes={classes.stop}
        />
      </Grid>
      <Grid item xs={1}>
        <Typography align="center" className={classes.label}>
          {props.service.tasks}/{props.service.replicas}
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography align="center" className={classes.label}>
          {props.service.node}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography align="center" className={classes.label}>
          {props.service.tasks.image}
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <DockerButton
          label="View Log"
          command="view_log"
          service={props.service}
          classes={classes.view}
        />
      </Grid>
    </Grid>
  );
};

export const ServiceControlHeader = props => {
  const classes = useStyles();
  return (
    <Grid container direction="row" xs={12} spacing={2}>
      <Grid item xs={3}>
        <Typography align="center" className={classes.header}>
          Service
        </Typography>
      </Grid>
      <Grid item xs={1} />
      <Grid item xs={1} />
      <Grid item xs={1}>
        <Typography align="center" className={classes.header}>
          Replicas
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography align="center" className={classes.header}>
          Node
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography align="center" className={classes.header}>
          Image
        </Typography>
      </Grid>
      <Grid item xs={1} />
    </Grid>
  );
};
