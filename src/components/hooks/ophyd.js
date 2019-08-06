import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { subscribeOphyd, setOphyd } from "../../actions/index";

export const useSubscribeOphyd = device => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(subscribeOphyd(device));
  }, []);

  try {
    return useSelector(state => state.ophyd.devices[device]);
  } catch {
    return null;
  }
};

export const useSetOphyd = (device, value) => {
  const dispatch = useDispatch();
  return (device, value) => dispatch(setOphyd(device, value));
};
