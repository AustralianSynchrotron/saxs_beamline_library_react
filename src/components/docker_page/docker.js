import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDocker, subscribeDocker } from "../../actions/index";

export const useSubscribeDocker = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(subscribeDocker());
  }, []);

  try {
    return useSelector(state => state.docker);
  } catch {
    return null;
  }
};

export const useSetDocker = cmd => {
  const dispatch = useDispatch();
  return cmd => dispatch(setDocker(cmd));
};
