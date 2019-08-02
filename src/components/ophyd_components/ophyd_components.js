import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";
import { useSubscribeOphyd } from "../hooks/ophyd";
import { useSetOphyd } from "../hooks/ophyd";

export const OphydTextField = props => {
  const setOphyd = useSetOphyd();
  const [tempValue, setTempValue] = useState("");
  const [editing, setEditing] = useState(false);

  var value = useSubscribeOphyd(props.device);

  const handleChange = event => {
    setTempValue(event.target.value);
  };

  const handleKeyDown = event => {
    if (event.key === "Enter") {
      setOphyd(props.device, parseFloat(tempValue));
      setEditing(false);
    }
  };

  const handleFocus = event => {
    setTempValue(event.target.value);
    setEditing(true);
  };

  const handleBlur = () => {
    setEditing(false);
  };

  return (
    <TextField
      value={editing ? tempValue : value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
};

export const OphydButton = props => {
  const setOphyd = useSetOphyd();

  const handleClick = () => {
    setOphyd(props.device, props.value);
  };
  return <Button onClick={handleClick}>{props.label}</Button>;
};

export const OphydSlider = props => {
  const setOphyd = useSetOphyd();
  const [tempValue, setTempValue] = useState(0);
  const [editing, setEditing] = useState(false);

  var value = useSubscribeOphyd(props.device);

  const handleChange = event => {
    setTempValue(event.target.value);
  };

  const handleKeyDown = event => {
    if (event.key === "Enter") {
      setOphyd(props.device, parseFloat(tempValue));
      setEditing(false);
    }
  };

  const handleFocus = event => {
    setTempValue(event.target.value);
    setEditing(true);
  };

  const handleBlur = () => {
    setEditing(false);
  };

  return (
    <Slider
      value={editing ? tempValue : value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      step={props.step}
      max={props.max}
      min={props.min}
    />
  );
};
