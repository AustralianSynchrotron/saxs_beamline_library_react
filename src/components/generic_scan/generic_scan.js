import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";

import { useSelector } from "react-redux";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import PlayArrow from "@material-ui/icons/PlayArrow";
import OpenInBrowser from "@material-ui/icons/OpenInBrowser";
import Pause from "@material-ui/icons/Pause";
import Stop from "@material-ui/icons/Stop";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";

import Add from "@material-ui/icons/Add";
import DeleteOutline from "@material-ui/icons/DeleteOutline";

import classNames from "classnames";

import blue from "@material-ui/core/colors/blue";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";
import red from "@material-ui/core/colors/red";
import SingleLoop from "./single_loop";
import LoadScanDialog from "./load_scan_dialog";
import SaveScanDialog from "./save_scan_dialog";

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

  const [numLoops, setNumLoops] = useState(1);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [loadDialogOpen, setLoadDialogOpen] = useState(false);

  const handleAddLoop = () => {
    setNumLoops(numLoops + 1);
  };
  const handleRemoveLoop = () => {
    setNumLoops(numLoops - 1);
  };

  const handleSaveScan = () => {
    setSaveDialogOpen(true);
  };

  const handleSave = scanName => {
    alert(scanName);
    setSaveDialogOpen(false);
  };

  const handleSaveCancel = () => {
    setSaveDialogOpen(false);
  };

  const handleLoadScan = () => {
    setLoadDialogOpen(true);
  };

  const handleLoad = scanName => {
    alert(scanName);
    setLoadDialogOpen(false);
  };

  const handleLoadCancel = () => {
    setLoadDialogOpen(false);
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
      <LoadScanDialog open={loadDialogOpen} onCancel={handleLoadCancel} onLoad={handleLoad} />
      <SaveScanDialog open={saveDialogOpen} onCancel={handleSaveCancel} onSave={handleSave} />
    </React.Fragment>
  );
};
export default GenericScan;
