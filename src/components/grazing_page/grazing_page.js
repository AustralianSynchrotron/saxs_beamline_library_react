import React, { useEffect, useState } from "react";
import { useDispatch, useSelectState } from "react-redux";
import { OphydMotorBundleCompact } from "../ophyd_components/ophyd_components";

const GrazingPage = props => {
  return <OphydMotorBundleCompact bundle="saxs_motors.gsaxs" />;
};

export default GrazingPage;
