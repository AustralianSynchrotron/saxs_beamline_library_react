import * as React from "react";
import { useSetOphyd, useSubscribeOphyd } from "../hooks/ophyd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function SvgButton(props) {
    return (
        <rect
          x={18.562}
          y={87.535}
          width={445.97}
          height={67.827}
          style={{
            paintOrder: "fill markers stroke",
          }}
          id="test"
        />
    )}

export default SvgButton;

