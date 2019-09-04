import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBundleList } from "../../actions/index";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import CameraControl from "./camera_control";

const VideoPage = props => {
  return (
    <React.Fragment>
      <VideoCameraBundle bundle="saxs_video.video_cameras" />
    </React.Fragment>
  );
};

export default VideoPage;

export const VideoCameraBundle = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBundleList(props.bundle, true));
  }, []);

  const bundleDeviceList = useSelector(state => state.ophyd.bundles[props.bundle]) || null;

  if (bundleDeviceList === null) {
    return <CircularProgress />
  } else {
    return (
      <Grid container direction="column" justify="center" spacing={1}>
        <Grid item>
          <Typography align="center">Video Cameras</Typography>
        </Grid>
        {bundleDeviceList.list.map(device => (
          <Grid item>
            <CameraControl label={device} cam={props.bundle + "." + device} />
          </Grid>
        ))}
      </Grid>
    );
  }
};
