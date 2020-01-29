import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";

import { useSelector, useDispatch } from "react-redux";

import Select from "@material-ui/core/Select";
import Autocomplete from "@material-ui/lab/Autocomplete";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import { updateGSParam } from "../../actions";

const useStyles = makeStyles({
  buttons: {
    display: "flex",
    flexDirection: "column",
    width: "200px"
  },
  horizontal: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    whiteSpace: "pre"
  },
  text: {
    width: "100px",
    marginTop: "0px"
  },
  paper: {
    width: "300px"
  }
});

const SinglePositioner = props => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const name = useSelector(
    state => state.genericScan.scan.loops[props.loopNum].positioners[props.posNum].name
  );
  const positioner = useSelector(
    state => state.genericScan.scan.loops[props.loopNum].positioners[props.posNum].positioner
  );
  const mode = useSelector(
    state => state.genericScan.scan.loops[props.loopNum].positioners[props.posNum].mode
  );
  const absRel = useSelector(
    state => state.genericScan.scan.loops[props.loopNum].positioners[props.posNum].absRel
  );
  const start = useSelector(
    state => state.genericScan.scan.loops[props.loopNum].positioners[props.posNum].start
  );
  const end = useSelector(
    state => state.genericScan.scan.loops[props.loopNum].positioners[props.posNum].end
  );
  const positions = useSelector(
    state => state.genericScan.scan.loops[props.loopNum].positioners[props.posNum].positions
  );

  const [cellRefs, setCellRefs] = useState(
    Array.apply(null, { length: props.number }).map(function() {
      return React.createRef();
    })
  );
  const positioners = useSelector(state => state.library.positioners) || null;
  const positionersLookup = useSelector(state => state.library.positionersLookup) || null;
  const modes = ["Linear", "Table"];

  const handlePositionerChange = event => {
    try {
      let dataset = event.currentTarget.children[0].dataset;
      dispatch(updateGSParam(props.loopNum, props.posNum, "positioner", dataset.device));
      dispatch(updateGSParam(props.loopNum, props.posNum, "name", dataset.name));
    } catch {}
  };

  const handleModeChange = event => {
    dispatch(updateGSParam(props.loopNum, props.posNum, "mode", event.target.value));
  };

  const handleAbsRelChange = event => {
    dispatch(updateGSParam(props.loopNum, props.posNum, "absRel", event.target.value));
  };

  const handleStartChange = event => {
    dispatch(updateGSParam(props.loopNum, props.posNum, "start", parseFloat(event.target.value)));
  };

  const handleEndChange = event => {
    dispatch(updateGSParam(props.loopNum, props.posNum, "end", parseFloat(event.target.value)));
  };

  const handlePositionChange = event => {
    const i = parseInt(event.currentTarget.dataset.index);
    dispatch(
      updateGSParam(props.loopNum, props.posNum, "positions", [
        ...positions.slice(0, i),
        event.target.value,
        ...positions.slice(i + 1)
      ])
    );
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

  useEffect(() => {
    if (props.number < positions.length) {
      dispatch(
        updateGSParam(props.loopNum, props.posNum, "positions", positions.slice(0, props.number))
      );
    } else if (props.number > positions.length) {
      dispatch(
        updateGSParam(props.loopNum, props.posNum, "positions", [
          ...positions.slice(),
          ...Array.apply(null, { length: props.number - positions.length }).map(function() {
            return null;
          })
        ])
      );
    }
  }, [props.number]);

  useEffect(() => {
    if (mode === "Linear") {
      dispatch(
        updateGSParam(
          props.loopNum,
          props.posNum,
          "positions",
          [...Array(props.number)].map((e, index) => {
            return start + (index * (end - start)) / (props.number - 1);
          })
        )
      );
    }
  }, [start, end, mode, props.number]);

  return (
    <React.Fragment>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Autocomplete
            disableClearable
            clearOnEscape
            options={positioners}
            getOptionLabel={option => option.name}
            style={{ width: 150 }}
            value={{ name: name } || ""}
            renderOption={option => (
              <span
                className={classes.horizontal}
                data-name={option.name}
                data-device={option.device}
              >
                <Typography variant="body1">{option.name} : </Typography>
                <Typography variant="caption">{option.device}</Typography>
              </span>
            )}
            renderInput={params => (
              <TextField
                {...params}
                label="Positioner"
                variant="outlined"
                InputProps={{ ...params["InputProps"], style: { fontSize: "small" } }}
                fullWidth
              />
            )}
            onClose={handlePositionerChange}
            classes={{
              paper: classes.paper
            }}
          />
        </Grid>
        <Grid item>
          <Select value={mode} onChange={handleModeChange}>
            {modes.map(mode => (
              <MenuItem key={mode} value={mode}>
                {mode}
              </MenuItem>
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
                type="number"
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
                type="number"
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
                  <TableCell>
                    <TextField
                      variant="outlined"
                      value={position}
                      onChange={handlePositionChange}
                      inputProps={{ "data-index": index, onKeyDown: handleKeyDown }}
                      inputRef={cellRefs[index]}
                      disabled={mode === "Table" ? false : true}
                      margin="dense"
                      className={classes.text}
                    />
                  </TableCell>
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
