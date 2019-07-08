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

class VentDialog extends Component {
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
      <Dialog fullWidth={true} maxwidth="xs" onClose={this.handleClose} open={this.props.open}>
        <DialogTitle></DialogTitle>
        <div align="center">
        <Typography variant='body1'>Do you really want to Vent?</Typography>
        </div>
        <Button onClick={this.handleClose}>No</Button>
        <Button onClick={this.handleClose}>Yes</Button>
      </Dialog>
    );
  }
}

VentDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(VentDialog);
