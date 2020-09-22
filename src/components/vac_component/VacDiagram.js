import React, { useState, useEffect } from "react";
import green from "@material-ui/core/colors/green";
import grey from "@material-ui/core/colors/grey";

import SvgChamber from "./chamberDiagram.js";

const Canvas = (props) => {
  return (
    <React.Fragment>
      <SvgChamber
        height={800}
        width= {2000}
        fill_chamber="green"
        fill_vessel="green"
        backingFill="blue"
        turboFill="blue"
        chamberIn={props.ChamberIn}
        disable={props.disable}
      />
    </React.Fragment>
  );
};

export default Canvas;
