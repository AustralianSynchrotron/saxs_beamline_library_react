import Button from "@material-ui/core/Button";
import amber from "@material-ui/core/colors/amber";
import blue from "@material-ui/core/colors/blue";
import green from "@material-ui/core/colors/green";
import purple from "@material-ui/core/colors/purple";
import red from "@material-ui/core/colors/red";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import Add from "@material-ui/icons/Add";
import OpenInBrowser from "@material-ui/icons/OpenInBrowser";
import Pause from "@material-ui/icons/Pause";
import PlayArrow from "@material-ui/icons/PlayArrow";
import SaveIcon from "@material-ui/icons/Save";
import Stop from "@material-ui/icons/Stop";
import { makeStyles } from "@material-ui/styles";
import classNames from "classnames";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGSLoop, listGSScan, loadGSScan, removeGSLoop, runGSScan, saveGSScan } from "../../actions";
import LoadScanDialog from "./load_scan_dialog";
import SaveScanDialog from "./save_scan_dialog";
import SingleLoop from "./single_loop";








const useStyles = makeStyles({
  buttons: {
    display: "flex",
    flexDirection: "column",
    width: "200px"
  },
  addFab: {
    background: green[800],
    "&:hover": {
      backgroundColor: green["A700"]
    }
  },
  add: {
    color: "white"
  },
  remove: {
    color: red[500]
  },
  hidden: {
    display: "none"
  },
  button: {
    color: "white",
    margin: "2px",
    "&:hover": {
      color: "white"
    }
  },
  play: {
    backgroundColor: green["700"],
    "&:hover": {
      backgroundColor: green["A700"]
    }
  },
  pause: {
    backgroundColor: amber["700"],
    "&:hover": {
      backgroundColor: amber["A700"]
    }
  },
  abort: {
    backgroundColor: red["700"],
    "&:hover": {
      backgroundColor: red["A700"]
    }
  },
  save: {
    backgroundColor: blue["700"],
    "&:hover": {
      backgroundColor: blue["A700"]
    }
  },
  load: {
    backgroundColor: purple["700"],
    "&:hover": {
      backgroundColor: purple["A700"]
    }
  }
});

const GenericScan = props => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [loadDialogOpen, setLoadDialogOpen] = useState(false);

  const numLoops = useSelector(state => state.genericScan.scan.numLoops);
  const scans = useSelector(state => state.genericScan.scan_list);

  const handleAddLoop = () => {
    dispatch(addGSLoop());
  };
  const handleRemoveLoop = event => {
    const loopNum = event.currentTarget.dataset.index;
    dispatch(removeGSLoop(loopNum));
  };

  const handleSaveScan = () => {
    setSaveDialogOpen(true);
  };

  const handleSave = scanName => {
    dispatch(saveGSScan(scanName));
    setSaveDialogOpen(false);
  };

  const handleSaveCancel = () => {
    setSaveDialogOpen(false);
  };

  const handleLoadScan = () => {
    dispatch(listGSScan());
    setLoadDialogOpen(true);
  };

  const handleLoad = scanName => {
    dispatch(loadGSScan(scanName));
    setLoadDialogOpen(false);
  };

  const handleLoadCancel = () => {
    setLoadDialogOpen(false);
  };

  const handleRunScan = () => {
    dispatch(runGSScan());
  };
  return (
    <React.Fragment>
      <Grid container direction="column">
        <Grid container direction="row" spacing={0}>
          <Button
            variant="contained"
            size="large"
            className={classNames(classes.save, classes.button)}
            startIcon={<SaveIcon />}
            onClick={handleSaveScan}
          >
            Save Scan
          </Button>
          <Button
            variant="contained"
            size="large"
            className={classNames(classes.load, classes.button)}
            startIcon={<OpenInBrowser />}
            onClick={handleLoadScan}
          >
            Load Scan
          </Button>
          <Button
            size="large"
            startIcon={<PlayArrow />}
            className={classNames(classes.play, classes.button)}
            onClick={handleRunScan}
          >
            Run Scan
          </Button>
          <Button
            variant="contained"
            size="large"
            className={classNames(classes.pause, classes.button)}
            startIcon={<Pause />}
          >
            Pause Scan
          </Button>
          <Button
            variant="contained"
            size="large"
            className={classNames(classes.abort, classes.button)}
            startIcon={<Stop />}
          >
            Abort Scan
          </Button>
        </Grid>
        <Grid container direction="row" spacing={3}>
          {[...Array(numLoops)].map((e, i) => (
            <Grid item key={i}>
              <SingleLoop loopNum={i} onDelete={handleRemoveLoop} />
            </Grid>
          ))}
          <Grid item>
            <Fab onClick={handleAddLoop} className={classes.addFab}>
              <Add className={classes.add} />
            </Fab>
          </Grid>
        </Grid>
      </Grid>
      <LoadScanDialog
        open={loadDialogOpen}
        onCancel={handleLoadCancel}
        onLoad={handleLoad}
        scans={scans}
      />
      <SaveScanDialog open={saveDialogOpen} onCancel={handleSaveCancel} onSave={handleSave} />
    </React.Fragment>
  );
};
export default GenericScan;
