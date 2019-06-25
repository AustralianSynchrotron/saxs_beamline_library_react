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
import Button from "@material-ui/core/Button";

import red from "@material-ui/core/colors/red";
import blue from "@material-ui/core/colors/blue";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  item: {
    paddingTop: "15px"
  },
  blue: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500]
  },
  red: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: red[500]
  }
});

class NewConfigDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validConfigName: true,
      invalidConfigNameText: "",
      baseConfig: "default",
      configName: ""
    };
  }

  handleConfigName = event => {
    this.setState({ configName: event.target.value });

    const invalidCharacters = event.target.value.match(/[-!@#$%^&*()+|~=`{}\[\]:";'<>?,. \\\/]/g);
    if (invalidCharacters !== null) {
      this.setState({ validConfigName: false });

      invalidCharacters.forEach((character, index) => {
        if (character === " ") {
          invalidCharacters[index] = "<space>";
        }
      });
      this.setState({ invalidConfigNameText: "Invalid Characters: " + invalidCharacters.join("") });
    } else {
      this.setState({ validConfigName: true, invalidConfigNameText: "" });
    }
  };

  handleAdd = () => {
    this.props.onClose(this.state.configName);
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
        <DialogTitle>Create New Config</DialogTitle>
        <DialogContent className={classes.root}>
          <TextField
            error={!this.state.validConfigName}
            label="Config Name"
            variant="outlined"
            helperText={this.state.invalidConfigNameText}
            onChange={this.handleConfigName}
            value={this.state.Config}
            onKeyDown={event => {
              if (event.key === "Enter") {
                this.handleClose();
              }
            }}
            className={classes.item}
          />
          <InputLabel htmlFor="select-config" className={classes.item}>
            Base Config
          </InputLabel>
          <Select
            label={"Configs"}
            value={this.state.baseConfig}
            onChange={this.handleSelectConfig}
            input={<Input id="select-config" />}
          >
            {this.props.configs.map(name => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Fab aria-label="Create" onClick={this.handleAdd} className={classes.blue}>
            <Add />
          </Fab>
          <Fab aria-label="Cancel" onClick={this.handleCancel} className={classes.red}>
            <Close />
          </Fab>
        </DialogActions>
      </Dialog>
    );
  }
}

NewConfigDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NewConfigDialog);
