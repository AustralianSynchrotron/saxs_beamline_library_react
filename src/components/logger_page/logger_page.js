import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { listenLogger } from "../../actions/index";
import CircularProgress from "@material-ui/core/CircularProgress";
import red from "@material-ui/core/colors/red";
import amber from "@material-ui/core/colors/amber";

import classNames from "classnames";

const useStyles = makeStyles({
  debug: { color: "white" },
  info: { color: "white" },
  warning: { color: amber[500] },
  error: { color: red[500] },
  critical: { color: red[500] }
});

const LoggerPage = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listenLogger());
  }, []);

  const logData = useSelector(state => state.logger.logData) || null;

  if (logData === null) {
    return <CircularProgress />;
  } else {
    return (
      <Grid container direction="column" justify="center" spacing={1}>
        <Grid item>
          <LogHeader />
        </Grid>
        {logData.map(line => (
          <Grid item>
            <LogItem line={line} />
          </Grid>
        ))}
      </Grid>
    );
  }
};

const LogHeader = () => {
  return (
    <Grid container direction="row" spacing={2} xs={12}>
      <Grid item xs={2}>
        <Typography variant="h6">Logger Name</Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography variant="h6">Level Number</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h6">Code Path</Typography>
      </Grid>
      <Grid item xs={5}>
        <Typography variant="h6">Message</Typography>
      </Grid>
    </Grid>
  );
};

const LogItem = props => {
  const classes = useStyles();
  const levelno = props.line.message.levelno;
  const levelClass = classNames(
    levelno === 10
      ? classes.debug
      : levelno === 20
      ? classes.info
      : levelno === 30
      ? classes.warning
      : levelno === 40
      ? classes.error
      : levelno === 50
      ? classes.critical
      : null
  );
  return (
    <Grid container direction="row" spacing={2} xs={12}>
      <Grid item xs={2}>
        <Typography className={levelClass}>{props.line.message.name}</Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography className={levelClass}>{props.line.message.levelno}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography className={levelClass}>{props.line.message.pathname}</Typography>
      </Grid>
      <Grid item xs={5}>
        <Typography className={levelClass}>{props.line.message.message}</Typography>
      </Grid>
    </Grid>
  );
};

export default LoggerPage;
