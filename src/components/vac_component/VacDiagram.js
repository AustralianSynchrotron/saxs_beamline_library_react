import React, { useState, useEffect } from "react";
import green from "@material-ui/core/colors/green";
import grey from "@material-ui/core/colors/grey";

import SvgChamber from "./chamberDiagram.js";
import SvgSample from "./sampleChamber.js";

const Canvas = () => {
  const [ChamberIn, setChamberIn] = React.useState(false);
  const [chamber_opacity, setChamberopacity] = useState(0.5);

  const handleClick = (event) => {
    console.log(event);
  };

  return (
    <React.Fragment>
      <SvgChamber
        height={1000}
        width={2000}
        opacity_vessel={0.8}
        opacity_chamber={chamber_opacity}
        fill_chamber="green"
        fill_vessel="green"
        pressureChamber = {900}
        pressureVessel = {900}
        pressureBeamline = {900}
        chamberIn={ChamberIn}
      />
    </React.Fragment>
  );
};

export default Canvas;
