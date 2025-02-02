import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Slider from "@material-ui/core/Slider";
import TextField from "@material-ui/core/TextField";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";
import DragHandle from "@material-ui/icons/DragHandle";
import ToggleButton from "@material-ui/lab/ToggleButton";
import { makeStyles } from "@material-ui/styles";
import classNames from "classnames";
import CheckAll from "mdi-material-ui/CheckAll";
import CloseOutline from "mdi-material-ui/CloseOutline";
import Help from "mdi-material-ui/Help";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBundleList } from "../../actions/index";
import { useSetOphyd, useSubscribeOphyd } from "../hooks/ophyd";

const useStyles = makeStyles({
  hidden: { display: "None" },
  showButton: { marginTop: 0 },
  slider: { flexDirection: "row" },
  cssOutlinedInput: {
    "&:not(hover):not($disabled):not($cssFocused):not($error) $notchedOutline": {
      borderColor: "red", //default
    },
  },
  notchedOutline: {},
  error: {},
  disabled: {},
  horizontal: {
    display: "flex",
    flexDireciton: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  vertical: {
    display: "flex",
    flexDireciton: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  statusField: {
    padding: "2px",
    margin: "5px",
  },
  statusFieldInput: {
    background: "transparent",
  },
  statusFieldGood: {},
  statusFieldBad: {
    background: "red",
  },
  padding: {
    padding: "2px",
  },
  formControl: {
    margin: "5px",
    minWidth: 130,
  },
});

export const OphydStatusField = (props) => {
  const classes = useStyles(props);
  var deviceData = useSubscribeOphyd(props.device);
  if (deviceData === undefined) {
    deviceData = { value: "", dtype: "string", name: undefined, obj_value: "" };
  } else {
    if (deviceData.dtype === "number") {
      deviceData.value = parseFloat(deviceData.value).toPrecision(
        props.precision !== undefined ? props.precision : deviceData.precision
      );
    } else {
      console.log(deviceData);
    }
  }

  useEffect(() => {
    if (props.good_status !== undefined && props.errorCallback !== undefined) {
      if (deviceData.value !== props.good_status) {
        try {
          props.errorCallback();
        } catch {
          console.log("Error Callback didn't work");
        }
      }
    }
  }, [deviceData]);

  return (
    <TextField
      className={classNames(
        classes.statusfield,
        classes.padding,
        props.good_status !== undefined
          ? deviceData.value === props.good_status
            ? classes.statusFieldGood
            : classes.statusFieldBad
          : null
      )}
      InputProps={{ className: classes.statusFieldInput, readOnly: true, disableUnderline: true }}
      variant="filled"
      label={props.label !== undefined ? props.label + ": " : null}
      value={
        (deviceData.name !== undefined
          ? props.good_status !== undefined
            ? props.printVal !== undefined
              ? props.asString !== undefined
                ? deviceData.obj_value
                : deviceData.value
              : deviceData.value === props.good_status
              ? props.goodStatusText !== undefined
                ? props.goodStatusText
                : deviceData.value
              : props.badStatusText
            : props.toNumber === true
            ? props.toExp === true
              ? parseFloat(deviceData.value).toExponential()
              : parseFloat(deviceData.value)
            : deviceData.value
          : props.undef_val !== undefined
          ? props.undef_val
          : "Status Unavailable") +
        (deviceData.name !== undefined
          ? props.suffix !== undefined
            ? " " + props.suffix
            : ""
          : "")
      }
    />
  );
};

export const OphydTextField = (props) => {
  const classes = useStyles(props);
  const setOphyd = useSetOphyd();
  const [tempValue, setTempValue] = useState("");
  const [editing, setEditing] = useState(false);

  var deviceData = useSubscribeOphyd(props.device);
  if (deviceData === undefined) {
    deviceData = { value: "", dtype: "string" };
  }
  if (deviceData.value === undefined) {
    deviceData.value = "";
  }
  if (deviceData.dtype === "number") {
    deviceData.value = parseFloat(deviceData.value).toPrecision(6);
  }

  const handleChange = (event) => {
    setTempValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (editing === false) {
      setTempValue(event.target.value);
      setEditing(true);
    }
    if (event.key === "Enter") {
      setOphyd(
        props.device,
        deviceData.dtype === "number"
          ? parseFloat(tempValue)
          : deviceData.dtype === "integer"
          ? parseInt(tempValue)
          : tempValue
      );
      setEditing(false);
    }
  };

  const handleBlur = () => {
    setEditing(false);
  };

  return (
    <TextField
      value={editing ? tempValue : deviceData.value}
      label={(
        (props.label === undefined ? deviceData.name : props.label) +
        (deviceData.egu === undefined || deviceData.equ === "" ? "" : " (" + deviceData.egu + ")")
      ).replace(/_/g, " ")}
      variant="outlined"
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      InputProps={
        deviceData.set_success === undefined
          ? null
          : deviceData.set_success
          ? null
          : {
              classes: {
                root: classes.cssOutlinedInput,
                notchedOutline: classes.notchedOutline,
              },
            }
      }
    />
  );
};

export const OphydButton = (props) => {
  const setOphyd = useSetOphyd();
  const classes = useStyles(props);
  const handleClick = () => {
    setOphyd(props.device, props.value);
  };
  return (
    <React.Fragment>
      <div className={classes.padding}>
        <Button
          onClick={handleClick}
          className={props.buttonClasses}
          disabled={props.disable !== undefined ? props.disable : false}
        >
          {props.label}
        </Button>
      </div>
    </React.Fragment>
  );
};

export const OphydToggleButton = (props) => {
  const classes = useStyles(props);
  const setOphyd = useSetOphyd();
  var status = 0;
  var deviceData = useSubscribeOphyd(props.device);
  if (deviceData === undefined) {
    deviceData = { value: 0, dtype: "integer" };
  }

  var readValue = null;

  if (props.readFirst === undefined) {
    readValue = props.valueFirst;
  } else {
    readValue = props.readFirst;
  }

  if (deviceData.value === readValue) {
    status = 1;
  } else {
    if (props.readSecond === undefined) {
      readValue = props.valueSecond;
    } else {
      readValue = props.readSecond;
    }
    if (deviceData.value === readValue) {
      status = 2;
    }
  }

  const handleChange = () => {
    if (status === 0) {
      return;
    }
    setOphyd(props.device, status === 1 ? props.valueSecond : props.valueFirst);
  };

  return (
    <React.Fragment>
      <div
        className={classNames(
          props.labelPosition === "left" ? classes.horizontal : classes.vertical
        )}
      >
        {!props.noShowLabel ? (
          <Typography>{props.label !== undefined ? props.label : deviceData.name}</Typography>
        ) : null}
        <div className={classes.padding}>
          <ToggleButton
            value={props.label !== undefined ? props.label : deviceData.name}
            onChange={handleChange}
            className={classNames(
              status === 1 ? props.toggleClasses.second : props.toggleClasses.first
            )}
            disabled={props.disable !== undefined ? props.disable : false}
          >
            {status === 1 ? props.labelSecond : status === 2 ? props.labelFirst : "Not Connected"}
          </ToggleButton>
        </div>
      </div>
    </React.Fragment>
  );
};

export const OphydIconButton = (props) => {
  const setOphyd = useSetOphyd();

  const handleClick = () => {
    setOphyd(props.device, props.value);
  };
  return <IconButton onClick={handleClick}>{props.children}</IconButton>;
};

export const OphydSlider = (props) => {
  const classes = useStyles(props);
  const setOphyd = useSetOphyd();

  var deviceData = useSubscribeOphyd(props.device);

  if (deviceData === undefined) {
    deviceData = { value: 0 };
  }

  if (typeof deviceData.value !== "number") {
    deviceData.value = parseFloat(deviceData.value);
  }

  if (deviceData.value === undefined || Number.isNaN(deviceData.value)) {
    deviceData.value = 0;
  }
  const handleChange = (event, value) => {
    setOphyd(props.device, parseFloat(value), props.setTimeout);
  };

  return (
    <React.Fragment>
      <Grid container direction={props.orientation === "vertical" ? "column" : "row"} spacing={1}>
        <Grid item xs={2}>
          {props.label}
        </Grid>
        <Grid item xs={1}>
          {props.leftIcon}
        </Grid>
        <Grid item xs={8}>
          <Slider
            value={deviceData.value}
            onChange={handleChange}
            orientation={props.orientation}
            step={props.step}
            max={props.max === "undefined" ? deviceData.upper_disp_limit : props.max}
            min={props.min === "undefined" ? deviceData.lower_disp_limit : props.min}
          />
        </Grid>
        <Grid item xs={1}>
          {props.rightIcon}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export const OphydMotorCompact = (props) => {
  const classes = useStyles(props);
  const setOphyd = useSetOphyd();
  const [tweak, setTweak] = useState(0);
  const [showTweak, setShowTweak] = useState(false);

  const handleChange = (event) => {
    setTweak(event.target.value);
  };

  const handleTweakChange = (event) => {
    setTweak(event.currentTarget.dataset.tweak * tweak);
  };

  const handleTweak = (event) => {
    console.log(event.currentTarget);
    console.log(tweak * event.currentTarget.dataset.dir);
    setOphyd(props.device + "._tweak", tweak * event.currentTarget.dataset.dir);
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
          <IconButton size="small" onClick={handleShowTweak} className={classes.showButton}>
            <DragHandle />
          </IconButton>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export const OphydMotorBundleCompact = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBundleList(props.bundle));
  }, []);

  const bundleDeviceList = useSelector((state) => state.ophyd.bundles[props.bundle]) || null;

  if (bundleDeviceList === null) {
    return <div />;
  } else {
    return (
      <Grid container direction="column" justify="center" spacing={1}>
        <Grid item>
          <Typography align="center">{bundleDeviceList.name}</Typography>
        </Grid>
        {bundleDeviceList.list.map((device) => (
          <Grid item>
            <OphydMotorCompact label={device} device={props.bundle + "." + device} />
          </Grid>
        ))}
      </Grid>
    );
  }
};

export const OphydDropdown = (props) => {
  const setOphyd = useSetOphyd();
  const classes = useStyles();
  const [values, setValues] = React.useState({
    input_value: "",
  });

  var deviceData = useSubscribeOphyd(props.device);
  if (deviceData === undefined) {
    deviceData = { value: 0, enum_strs: [0, 1, 2] };
  }

  const renderMenuItems = () => {
    var enum_strs = deviceData.enum_strs;
    if (enum_strs === undefined) {
      enum_strs = [0, 1, 2];
    }
    return enum_strs.map((el, i) => {
      return (
        <MenuItem value={i} key={i}>
          {" "}
          {el}
        </MenuItem>
      );
    });
  };

  const handleChange = (event) => {
    setValues((oldValues) => ({
      ...oldValues,
      input_value: event.target.value,
    }));
    setOphyd(props.device, event.target.value);
  };

  return (
    <form className={classes.root} autoComplete="off">
      <FormControl className={classes.formControl}>
        <InputLabel>{props.label !== undefined ? props.label : deviceData.name}</InputLabel>
        <Select value={values.input_value} onChange={handleChange}>
          {renderMenuItems()}
        </Select>
      </FormControl>
    </form>
  );
};

export const OphydStateIcon = (props) => {
  const classes = useStyles(props);
  var deviceData = useSubscribeOphyd(props.device);
  if (deviceData === undefined) {
    deviceData = { value: 0, dtype: "integer", name: undefined };
  }

  return (
    <React.Fragment>
      <div className={classes.horizontal}>
        {!props.noShowLabel ? (
          <Typography>{props.label !== undefined ? props.label : deviceData.name}</Typography>
        ) : null}
        <div className={classes.padding}>
          {deviceData.name !== undefined ? (
            deviceData.value !== props.good_value ? (
              <CloseOutline color="secondary" />
            ) : (
              <CheckAll color="primary" />
            )
          ) : (
            <Help color="error" />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export const OphydCheckBox = (props) => {
  const classes = useStyles(props);
  const setOphyd = useSetOphyd();
  var deviceData = useSubscribeOphyd(props.device);
  if (deviceData === undefined) {
    deviceData = { value: true, dtype: "boolean" };
  }

  const handleChange = (event) => {
    setOphyd(props.device, !deviceData.value);
  };

  return (
    <React.Fragment>
      <FormControlLabel
        control={
          <Checkbox
            checked={deviceData.value}
            onChange={handleChange}
            value="checkbox"
            className={classes.small_check}
          />
        }
        label={props.label}
        className={classes.label}
      />
    </React.Fragment>
  );
};
