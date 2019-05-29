import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    display: "flex"
  }
});

class CustomTimeDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 1.0
    };
  }

  handleClose = () => {
    this.props.onClose(this.state.time);
  };

  handleChange = event => {
    this.setState({ time: parseFloat(event.target.value) });
  };

  render() {
    return (
      <Dialog onClose={this.handleClose} open={this.props.open}>
        <DialogTitle>Add custom expsure time</DialogTitle>
        <TextField
          value={this.state.time}
          onChange={this.handleChange}
          type="number"
          variant="outlined"
          onKeyDown={event => {
            if (event.key === "Enter") {
              this.handleClose();
            }
          }}
        />
        <Button onClick={this.handleClose}>Close</Button>
      </Dialog>
    );
  }
}

CustomTimeDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomTimeDialog);
