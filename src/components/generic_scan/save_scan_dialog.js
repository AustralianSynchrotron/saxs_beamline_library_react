import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import SaveIcon from "@material-ui/icons/Save";
import Close from "@material-ui/icons/Close";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";

import red from "@material-ui/core/colors/red";
import blue from "@material-ui/core/colors/blue";

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
  },
});

const SaveScanDialog = props => {
  const classes = useStyles();
  const [scanName, setScanName] = useState("");

  const handleScanNameChange = event => {
    setScanName(event.target.value);
  };

  const handleCancel = () => {
    props.onCancel();
  };

  const handleSave = event => {
    props.onSave(scanName);
  };

  return (
    <Dialog onClose={handleCancel} open={props.open}>
      <DialogTitle>Save Scan</DialogTitle>
      <DialogContent className={classes.root}>
        <TextField
          label="Scan Name"
          variant="outlined"
          onChange={handleScanNameChange}
          value={scanName}
          onKeyDown={event => {
            if (event.key === "Enter") {
              handleSave();
            }
          }}
          className={classes.item}
        />
      </DialogContent>
      <DialogActions>
        <Fab aria-label="Save" onClick={handleSave} className={classes.blue}>
          <SaveIcon />
        </Fab>
        <Fab aria-label="Cancel" onClick={handleCancel} className={classes.red}>
          <Close />
        </Fab>
      </DialogActions>
    </Dialog>
  );
};

export default SaveScanDialog;
