import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    display: "flex"
  }
});

class PumpDialog extends Component {
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
        <DialogTitle>{this.props.title}</DialogTitle>
        <Typography>do you really want to pump {this.props.id}?</Typography>
        <Button onClick={this.handleClose}>No</Button>
        <Button onClick={this.handleClose}>Yes</Button>
      </Dialog>
    );
  }
}

PumpDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PumpDialog);
