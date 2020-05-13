import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import green from "@material-ui/core/colors/green";
import grey from "@material-ui/core/colors/grey";
import red from "@material-ui/core/colors/red";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Add from "@material-ui/icons/Add";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import { makeStyles } from "@material-ui/styles";
import classNames from "classnames";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGSPositioner, removeGSPositioner } from "../../actions";
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
  const dispatch = useDispatch();

  const [numPositions, setNumPositions] = useState(20);
  const [delay, setDelay] = useState(0);

  const numPositioners = useSelector(
    state => state.genericScan.scan.loops[props.loopNum].numPositioners
  );

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
    dispatch(addGSPositioner(props.loopNum));
  };
  const handleRemovePositioner = event => {
    dispatch(removeGSPositioner(props.loopNum, event.currentTarget.dataset.index));
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
                <IconButton onClick={props.onDelete}>
                  <DeleteOutline className={classes.delete} />
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
                  <SinglePositioner loopNum={props.loopNum} posNum={i} number={numPositions} />
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
