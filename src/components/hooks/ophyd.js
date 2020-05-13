import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOphyd, setOphyd, subscribeOphydDevice } from "../../actions/index";

export const useSubscribeOphyd = device => {
  const dispatch = useDispatch();

  const token = useSelector(state => state.ophyd.token)

  useEffect(() => {
    dispatch(subscribeOphydDevice(token, [device]));
    dispatch(getOphyd(device, true));
  }, []);

  try {
    return useSelector(state => state.ophyd.devices[device]);
  } catch {
    return null;
  }
};

export const useSetOphyd = (device, value, timeout = null) => {
  const dispatch = useDispatch();
  return (device, value, timeout) => dispatch(setOphyd(device, value, timeout));
};
