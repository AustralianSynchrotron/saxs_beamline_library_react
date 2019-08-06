import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { makeStyles, getThemeProps } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Slider from "@material-ui/core/Slider";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";
import DragHandle from "@material-ui/icons/DragHandle";
import { useSubscribeOphyd } from "../hooks/ophyd";
import { useSetOphyd } from "../hooks/ophyd";

const useStyles = makeStyles({
  hidden: { display: "None" },
  showButton: { marginTop: 0 },
  slider: { flexDirection: "row" }
});

export const OphydTextField = props => {
  const setOphyd = useSetOphyd();
  const [tempValue, setTempValue] = useState("");
  const [editing, setEditing] = useState(false);

  var value = useSubscribeOphyd(props.device);
  if (value === undefined) {
    value = "";
  }

  const handleChange = event => {
    setTempValue(event.target.value);
  };

  const handleKeyDown = event => {
    if (event.key === "Enter") {
      setOphyd(props.device, parseFloat(tempValue));
      setEditing(false);
    }
  };

  const handleFocus = event => {
    setTempValue(event.target.value);
    setEditing(true);
  };

  const handleBlur = () => {
    setEditing(false);
  };

  return (
    <TextField
      value={editing ? tempValue : value}
      label={props.label + " (" + props.egu + ")"}
      variant="outlined"
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
};

export const OphydButton = props => {
  const setOphyd = useSetOphyd();

  const handleClick = () => {
    setOphyd(props.device, props.value);
  };
  return <Button onClick={handleClick}>{props.label}</Button>;
};

export const OphydIconButton = props => {
  const setOphyd = useSetOphyd();

  const handleClick = () => {
    setOphyd(props.device, props.value);
  };
  return <IconButton onClick={handleClick}>{props.children}</IconButton>;
};

export const OphydSlider = props => {
  const classes = useStyles(props);
  const setOphyd = useSetOphyd();

  var value = useSubscribeOphyd(props.device);
  if (value === undefined) {
    value = 0;
  }
  const handleChange = (event, value) => {
    setOphyd(props.device, parseFloat(value));
  };

  return (
    <React.Fragment>
      <Grid container direction={props.orientation === "vertical" ? "column" : "row"} spacing={1}>
        <Grid item>{props.leftIcon}</Grid>
        <Grid item xs>
          <Slider
            value={value}
            onChange={handleChange}
            orientation={props.orientation}
            step={props.step}
            max={props.max}
            min={props.min}
          />
        </Grid>
        <Grid item>{props.rightIcon}</Grid>
      </Grid>
    </React.Fragment>
  );
};

export const OphydMotorCompact = props => {
  const classes = useStyles(props);
  const setOphyd = useSetOphyd();
  const [tweak, setTweak] = useState(0);
  const [showTweak, setShowTweak] = useState(false);

  const handleChange = event => {
    setTweak(event.target.value);
  };

  const handleTweakChange = event => {
    setTweak(event.currentTarget.dataset.tweak * tweak);
  };

  const handleTweak = event => {
    console.log(event.currentTarget);
    setOphyd(props.device + ".tweak", tweak * event.currentTarget.dataset.dir);
  };

  const handleShowTweak = () => {
    setShowTweak(!showTweak);
  };

  return (
    <React.Fragment>
      <Grid container spacing={1} direction="column">
        <Grid container direction="row" justify="center">
          <IconButton device={props.device} data-dir={-1} onClick={handleTweak}>
            <ArrowBackIos />
          </IconButton>
          <OphydTextField device={props.device} label={props.label} egu="mm" />
          <IconButton device={props.device} data-dir={1} onClick={handleTweak}>
            <ArrowForwardIos />
          </IconButton>
        </Grid>
        <Grid
          container
          direction="row"
          justify="center"
          className={classNames(showTweak ? null : classes.hidden)}
        >
          <Grid item>
            <Grid container direction="column">
              <Button size="small" onClick={handleTweakChange} data-tweak={0.1}>
                ×0.1
              </Button>
              <Button size="small" onClick={handleTweakChange} data-tweak={0.5}>
                ×0.5
              </Button>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="column">
              <TextField
                value={tweak}
                type="number"
                variant="outlined"
                onChange={handleChange}
                label="tweak"
                margin="dense"
              />
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="column">
              <Button size="small" onClick={handleTweakChange} data-tweak={2}>
                ×2
              </Button>
              <Button size="small" onClick={handleTweakChange} data-tweak={10}>
                ×10
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid container direction="row" justify="center">
          <IconButton
            size="small"
            className={classes.showButton}
            onClick={handleShowTweak}
            className={classes.showButton}
          >
            <DragHandle />
          </IconButton>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
