import React, { Component } from "react";
import { connect } from "react-redux";

import * as actionCreators from "../../actions/index";
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
      closed: 1
    };
  }

  handleClose = () => {
    this.props.onClose(this.state.closed);
  };

  handlePump = () => {
    console.log(this.props.id);
    this.props.pump(this.props.id);
    this.handleClose();
  }

  render() {
    return (
     <Dialog fullWidth={true} maxwidth="xs" onClose={this.handleClose} open={this.props.open}>
        <DialogTitle></DialogTitle>
        <div align="center">
        <Typography variant='body1'>Pump this section?</Typography>
        </div>
        <Button onClick={this.handleClose}>No</Button>
        <Button onClick={this.handlePump}>Yes</Button>
      </Dialog>
    );
  }
}

PumpDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    
  };
}

export default connect(
  mapStateToProps,
  actionCreators
)(withStyles(styles)(PumpDialog));
