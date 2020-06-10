import { makeStyles, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";
import React from "react";
import { useSetOphyd } from "../hooks/ophyd.js";

const PumpDialog = (props) => {
  const handleClose = () => {
    this.props.onClose();
  };

  const handlePump = (props) => {
    useSetOphyd(props.device, props.value);
    this.handleClose();
  };

  return (
    <Dialog fullWidth={true} maxwidth="xs" onClose={handleClose} open={props.open}>
      <DialogTitle />
      <div align="center">
        <Typography variant="body1">Pump this section?</Typography>
      </div>
      <Button onClick={handleClose}>No</Button>
      <Button onClick={handlePump}>Yes</Button>
    </Dialog>
  );
};

PumpDialog.propTypes = {
  device: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  open: PropTypes.object.isRequired,
};

export default PumpDialog;
