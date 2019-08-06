import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OphydMotorCompact } from "../ophyd_components/ophyd_components";

const BeamlineControl = props => {
  return (
    <React.Fragment>
      <OphydMotorCompact device="saxs_motors.sample_table.x" label="Sample Table X" />
      <OphydMotorCompact device="saxs_motors.sample_table.y" label="Sample Table Y" />
    </React.Fragment>
  );
};
export default BeamlineControl;
