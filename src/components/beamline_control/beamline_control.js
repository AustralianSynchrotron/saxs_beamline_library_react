import React, { Component } from "react";
import BrightnessLow from "@material-ui/icons/BrightnessLow";
import BrightnessHigh from "@material-ui/icons/BrightnessHigh";
import { OphydMotorCompact, OphydSlider } from "../ophyd_components/ophyd_components";

const BeamlineControl = props => {
  return (
    <React.Fragment>
      <OphydSlider
        device="saxs_IO.rio0.ao_0"
        step={0.1}
        min={0}
        max={10}
        leftIcon={<BrightnessLow />}
        rightIcon={<BrightnessHigh />}
      />
      <OphydSlider device="saxs_IO.rio0.ao_1" step={0.1} min={0} max={10} />
      <OphydMotorCompact device="saxs_motors.sample_table.x" label="Sample Table X" />
      <OphydMotorCompact device="saxs_motors.sample_table.y" label="Sample Table Y" />
      <OphydMotorCompact device="saxs_motors.in_vac.x" label="In Vac X" />
      <OphydMotorCompact device="saxs_motors.in_vac.y" label="In Vac Y" />
      <OphydMotorCompact device="saxs_motors.mc7.syringe_pump1" label="Syringe" />
    </React.Fragment>
  );
};
export default BeamlineControl;
