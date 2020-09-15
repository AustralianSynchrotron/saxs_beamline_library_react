import React, { useState, useEffect } from "react";
import green from "@material-ui/core/colors/green";
import grey from "@material-ui/core/colors/grey";

import SvgChamber from "./chamberDiagram.js";
import SvgSample from "./sampleChamber.js";

const Canvas = () => {
  const [ChamberIn, setChamberIn] = useState(false);
  const [chamber_opacity, setChamberopacity] = useState(0.5);


  return (
    <React.Fragment>
      <SvgChamber
        height={1000}
        width={2000}
        fill_chamber="green"
        fill_vessel="green"
        backingFill = "blue"
        turboFill = "blue"
        chamberIn={ChamberIn}
      />
    </React.Fragment>
  );
};

export default Canvas;
