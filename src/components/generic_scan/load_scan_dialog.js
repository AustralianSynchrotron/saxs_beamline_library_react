import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from "@material-ui/core/Fab";
import TextField from "@material-ui/core/TextField";
import Close from "@material-ui/icons/Close";
import OpenInBrowser from "@material-ui/icons/OpenInBrowser";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";


const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  item: {
    marginTop: "15px"
  },
  blue: {
    color: "white",
    backgroundColor: blue[500]
  },
  red: {
    color: "white",
    backgroundColor: red[500]
  }
});

const LoadScanDialog = props => {
  const classes = useStyles();
  const [scanName, setScanName] = useState("");
  const handleScanNameChange = event => {
    setScanName(event.target.value);
  };

  const handleCancel = () => {
    props.onCancel();
  };

  const handleLoad = event => {
    props.onLoad(scanName);
  };

  return (
    <Dialog onClose={handleCancel} open={props.open}>
      <DialogTitle>Load Scan</DialogTitle>
      <DialogContent>
        <Autocomplete
          options={props.scans}
          getOptionLabel={option => option}
          style={{ width: 300 }}
          renderInput={params => (
            <TextField {...params} value={scanName || ''} label="Scans" variant="outlined" fullWidth />
          )}
          onSelect={handleScanNameChange}
        />
      </DialogContent>
      <DialogActions>
        <Fab aria-label="Save" onClick={handleLoad} className={classes.blue}>
          <OpenInBrowser />
        </Fab>
        <Fab aria-label="Cancel" onClick={handleCancel} className={classes.red}>
          <Close />
        </Fab>
      </DialogActions>
    </Dialog>
  );
};

export default LoadScanDialog;
