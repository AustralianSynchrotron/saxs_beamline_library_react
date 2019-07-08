import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Fab from "@material-ui/core/Fab";
import Add from "@material-ui/icons/Add";
import Close from "@material-ui/icons/Close";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";

import red from "@material-ui/core/colors/red";
import blue from "@material-ui/core/colors/blue";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  item: {
    marginTop: "15px"
  },
  blue: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500]
  },
  red: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: red[500]
  },
  error: {
    color: theme.palette.getContrastText(theme.palette.error.dark),
    backgroundColor: theme.palette.error.dark
  }
});

class NewDeviceDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validDeviceName: true,
      invalidDeviceNameText: "",
      deviceName: "",
      enterValidDevice: false
    };
  }

  handleDeviceName = event => {
    this.setState({ deviceName: event.target.value });

    const invalidCharacters = event.target.value.match(/[-!@#$%^&*()+|~=`{}\[\]:";'<>?, \\\/]/g);
    if (invalidCharacters !== null) {
      this.setState({ validDeviceName: false });

      invalidCharacters.forEach((character, index) => {
        if (character === " ") {
          invalidCharacters[index] = "<space>";
        }
      });
      this.setState({ invalidDeviceNameText: "Invalid Characters: " + invalidCharacters.join("") });
    } else {
      this.setState({ validDeviceName: true, invalidDeviceNameText: "" });
    }
  };

  handleNameWarningClose = () => {
    this.setState({ enterValidDevice: false });
  };

  handleAdd = () => {
    if (this.state.deviceName.trim() === "" || this.state.invalidDeviceNameText) {
      this.setState({ enterValidDevice: true });
    } else {
      const valid = this.props.onCheckDevice(this.state.deviceName);
      valid.then(responseData => {
        if (responseData.valid) {
          this.props.onClose(this.state.deviceName);
        } else {
          this.setState({ enterValidDevice: true });
        }
      });
    }
  };

  handleCancel = () => {
    this.props.onClose(null);
  };

  handleChange = event => {
    this.setState({ time: parseFloat(event.target.value) });
  };

  handleSelectConfig = event => {
    this.setState({ baseConfig: event.target.value });
  };

  render() {
    const classes = this.props.classes;
    return (
      <Dialog onClose={this.handleClose} open={this.props.open}>
        <DialogTitle>Add Device</DialogTitle>
        <DialogContent className={classes.root}>
          <TextField
            error={!this.state.validDeviceName}
            label="Config Name"
            variant="outlined"
            helperText={this.state.invalidDeviceNameText}
            onChange={this.handleDeviceName}
            value={this.state.Config}
            onKeyDown={event => {
              if (event.key === "Enter") {
                this.handleAdd();
              }
            }}
            className={classes.item}
          />
        </DialogContent>
        <DialogActions>
          <Fab aria-label="Create" onClick={this.handleAdd} className={classes.blue}>
            <Add />
          </Fab>
          <Fab aria-label="Cancel" onClick={this.handleCancel} className={classes.red}>
            <Close />
          </Fab>
        </DialogActions>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          open={this.state.enterValidDevice}
          onClose={this.handleNameWarningClose}
          autoHideDuration={2000}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
        >
          <SnackbarContent
            message={<span id="message-id">Invalid Device. Try Again.</span>}
            className={classes.error}
          />
        </Snackbar>
      </Dialog>
    );
  }
}

NewDeviceDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NewDeviceDialog);
