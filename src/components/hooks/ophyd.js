import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import subscribeOphyd from "../actions/index";

export const useOphyd = device => {
  useEffect(() => {
    useDispatch(subscribeOphyd(device));
  }, []);

  return useSelector(state => state.devices[device]);
};
