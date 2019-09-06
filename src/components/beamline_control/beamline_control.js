import React, { Component } from "react";
import BrightnessLow from "@material-ui/icons/BrightnessLow";
import BrightnessHigh from "@material-ui/icons/BrightnessHigh";
import {
  OphydMotorCompact,
  OphydSlider,
  OphydMotorBundleCompact
} from "../ophyd_components/ophyd_components";

const BeamlineControl = props => {
  return (
    <React.Fragment>
      <OphydSlider
        device="saxs_IO.rio0.ao_0"
        step={0.1}
        min={0}
        max={10}
        label="Light One"
        leftIcon={<BrightnessLow />}
        rightIcon={<BrightnessHigh />}
      />
      <OphydSlider
        device="saxs_IO.rio0.ao_1"
        step={0.1}
        min={0}
        max={10}
        label="Light Two"
        leftIcon={<BrightnessLow />}
        rightIcon={<BrightnessHigh />}
      />
      <OphydMotorBundleCompact bundle="saxs_motors.sample_table" />
      <OphydMotorBundleCompact bundle="saxs_motors.in_vac" />
      <OphydMotorCompact device="saxs_motors.mc7.syringe_pump1" label="Syringe 1" />
      <OphydMotorCompact device="saxs_motors.mc7.syringe_pump2" label="Syringe 2" />
    </React.Fragment>
  );
};
export default BeamlineControl;
