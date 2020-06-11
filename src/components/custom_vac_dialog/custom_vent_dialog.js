import { makeStyles, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { vent } from "../../actions/index";

const VentDialog = (props) => {
  const dispatch = useDispatch();
  
  const handleClose = () => {
    props.onClose();
  };

  const handleVent = () => {
    dispatch(vent(props.id.toLowerCase()));
    handleClose();
  };

  return (
    <Dialog fullWidth={true} maxwidth="xs" onClose={handleClose} open={props.open}>
      <DialogTitle />
      <div align="center">
        <Typography variant="body1">Vent this section?</Typography>
      </div>
      <Button onClick={handleClose}>No</Button>
      <Button onClick={handleVent}>Yes</Button>
    </Dialog>
  );
};

VentDialog.propTypes = {
  id: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.object.isRequired,
};

export default VentDialog;
