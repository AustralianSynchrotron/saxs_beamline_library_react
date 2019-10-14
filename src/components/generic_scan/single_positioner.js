import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";

import { useSelector } from "react-redux";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";

import classNames from "classnames";

import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import {
  OphydButton,
  OphydToggleButton,
  OphydSlider,
  OphydTextField,
  OphydStatusField
} from "../ophyd_components/ophyd_components";
import { number } from "prop-types";

const useStyles = makeStyles({
  buttons: {
    display: "flex",
    flexDirection: "column",
    width: "200px"
  },
  text: {
    width: "100px",
    marginTop: "0px"
  }
});

const SinglePositioner = props => {
  const classes = useStyles();

  const [positioner, setPositioner] = useState("");
  const [mode, setMode] = useState("Linear");
  const [absRel, setAbsRel] = useState("Absolute");
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(1);
  const [positions, setPositions] = useState(
    Array.apply(null, { length: props.number }).map(function() {
      return null;
    })
  );
  const [cellRefs, setCellRefs] = useState(
    Array.apply(null, { length: props.number }).map(function() {
      return React.createRef();
    })
  );
  const positioners = useSelector(state => state.library.positioners) || null;
  const modes = ["Linear", "Table"];

  const handlePositionerChange = event => {
    setPositioner(event.target.value);
  };

  const handleModeChange = event => {
    setMode(event.target.value);
  };

  const handleAbsRelChange = event => {
    setAbsRel(event.target.value);
  };

  const handlePositionChange = event => {
    const i = parseInt(event.currentTarget.dataset.index);
    setPositions([...positions.slice(0, i), event.target.value, ...positions.slice(i + 1)]);
  };

  const handleKeyDown = event => {
    const index = parseInt(event.currentTarget.dataset.index);
    if (event.key === "ArrowDown" && index < positions.length - 1) {
      cellRefs[index + 1].current.focus();
      event.preventDefault();
    } else if (event.key === "ArrowUp" && index > 0) {
      cellRefs[index - 1].current.focus();
      event.preventDefault();
    }
  };

  const handleStartChange = event => {
    setStart(parseFloat(event.target.value));
  };

  const handleEndChange = event => {
    setEnd(parseFloat(event.target.value));
  };

  useEffect(() => {
    if (props.number < positions.length) {
      setPositions(positions.slice(0, props.number));
    } else if (props.number > positions.length) {
      setPositions([
        ...positions.slice(),
        ...Array.apply(null, { length: props.number - positions.length }).map(function() {
          return null;
        })
      ]);
    }
  }, [props.number]);

  useEffect(() => {
    if (mode === "Linear") {
      setPositions(
        [...Array(props.number)].map((e, index) => {
          return start + (index * (end - start)) / (props.number - 1);
        })
      );
    }
  }, [start, end, mode, props.number]);

  return (
    <React.Fragment>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Select value={positioner} onChange={handlePositionerChange}>
            {positioners.map(positioner => (
              <MenuItem value={positioner.name}>{positioner.name}</MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item>
          <Select value={mode} onChange={handleModeChange}>
            {modes.map(mode => (
              <MenuItem value={mode}>{mode}</MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item>
          <Select value={absRel} onChange={handleAbsRelChange}>
            <MenuItem value="Absolute">Absolute</MenuItem>
            <MenuItem value="Relative">Relative</MenuItem>
          </Select>
        </Grid>
        <Grid item>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <TextField
                variant="outlined"
                label="Start"
                disabled={mode === "Table" ? true : false}
                value={start}
                onChange={handleStartChange}
                margin="dense"
                className={classes.text}
              />
            </Grid>
            <Grid item>
              <TextField
                variant="outlined"
                label="End"
                disabled={mode === "Table" ? true : false}
                value={end}
                onChange={handleEndChange}
                margin="dense"
                className={classes.text}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Typography>Positions</Typography>
          <Table size="small">
            <TableBody>
              {positions.map((position, index) => (
                <TableRow key={index}>
                  <TextField
                    variant="outlined"
                    value={position}
                    onChange={handlePositionChange}
                    inputProps={{ "data-index": index, onKeyDown: handleKeyDown }}
                    inputRef={cellRefs[index]}
                    margin="dense"
                    className={classes.text}
                  />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default SinglePositioner;
