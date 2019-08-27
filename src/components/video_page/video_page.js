import React from "react";
import CameraControl from "./camera_control";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

const VideoPage = props => {
  return (
    <React.Fragment>
      <List>
        {[1, 2, 3, 4, 5].map(num => (
          <ListItem>
            <CameraControl cam={"saxs_video.video_camera_" + toString(num)} />
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
};
export default VideoPage;
