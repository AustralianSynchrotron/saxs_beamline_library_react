import AppBar from "@material-ui/core/AppBar";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SnackBar from "@material-ui/core/SnackBar";
import { createMuiTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Cached from "@material-ui/icons/Cached";
import CallMissedOutgoing from "@material-ui/icons/CallMissedOutgoing";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Favorite from "@material-ui/icons/Favorite";
import MenuIcon from "@material-ui/icons/Menu";
import FlagIcon from "@material-ui/icons/Flag";
import PlayCircleOutline from "@material-ui/icons/PlayCircleOutline";
import Settings from "@material-ui/icons/Settings";
import SwapHoriz from "@material-ui/icons/SwapHoriz";
import Videocam from "@material-ui/icons/Videocam";
import SwitchCameraIcon from "@material-ui/icons/SwitchCamera";
import Warning from "@material-ui/icons/Warning";
import { makeStyles, ThemeProvider } from "@material-ui/styles";
import classNames from "classnames";
import Docker from "mdi-material-ui/Docker";
import Database from "mdi-material-ui/Database";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connectOphyd, subscribeOphyd, buttonStatus } from "./actions/index";
import AcquirePage from "./components/acquire_page/acquire_page.js";
import BeamlineControl from "./components/beamline_control/beamline_control.js";
import ConfigPage from "./components/config_page/config_page.js";
import DockerPage from "./components/docker_page/docker_page";
import FlagsPage from "./components/flags_page/flags_page";
import RedisPage from "./components/redis_page/redis_page";
import GrazingPage from "./components/grazing_page/grazing_page";
import LoggerPage from "./components/logger_page/logger_page";
import { OphydButton, OphydStatusField } from "./components/ophyd_components/ophyd_components.js";
import TensilePage from "./components/tensile/Tensile";
import VacuumPage from "./components/vacuum/Vacuum";
import VideoPage from "./components/video_page/video_page";
import QRangeChange from "./components/q_range_change_page/q_range_change_page.js";
import { TextField } from "@material-ui/core";


const drawerWidth = 240;

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

const useStyles = makeStyles({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  redButton: {
    background: red[500],
    color: "white",
    height: 48,
    "&:hover": {
      backgroundColor: red["A700"]
    }
  },
  greenButton: {
    background: green[500],
    color: "white",
    height: 48,
    "&:hover": {
      backgroundColor: green["A700"]
    }
  },
  horizontal: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "Right",
    alignItems: "center",
    padding: "2px",
    marginLeft: "20px"
  },
  spacing: {
    marginLeft: "10px",
    marginRight: "10px"
  }
});

const App = props => {
  const dispatch = useDispatch();
  const classes = useStyles(theme);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [page, setPage] = useState(0);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handlePageChange = page => {
    setPage(page);
  };

  const handleErrorClose = () => {
    props.clearSetError();
  };

  const ophydError = useSelector(state => state.ophyd.setError);
  const ophydConnected = useSelector(state => state.ophyd.connected);
  const token = useSelector(state => state.ophyd.token);

  const requestRef = React.useRef();

  const animate = () => {

    var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
    if (gamepads) {
      var gp = gamepads[0];
      if (gp) {
        dispatch(buttonStatus(gp.buttons));
      }
    }
    requestRef.current = requestAnimationFrame(animate);
  }

  useEffect(() => {
    dispatch(subscribeOphyd(token));
    dispatch(connectOphyd(token));
    window.addEventListener("gamepadconnected", function (e) {
      requestRef.current = requestAnimationFrame(animate);
    });
    return () => cancelAnimationFrame(requestRef.current);
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          color={ophydConnected ? "primary" : "secondary"}
          position="absolute"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: drawerOpen
          })}
        >
          <Toolbar disableGutters={!drawerOpen}>
            <IconButton
              color="inherit"
              aria-label="Menu"
              onClick={handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: drawerOpen
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">
              SAXS
              </Typography>
            <div className={classes.horizontal}>
              <OphydStatusField
                label="Beamline Status"
                device="ophyd_status_devices.ophyd_status.beam_on_sample"
                good_status={1}
                badStatusText="Something is wrong"
                goodStatusText="Beamline is ok"
              />
              <OphydStatusField
                label="Detector Status"
                device="ophyd_status_devices.ophyd_status.beam_on_sample"
                good_status={false}
                // errorCallback={() => klaxon.play()}
                badStatusText="Detector Error"
                goodStatusText="Detector Happy"
              />
              {/* <OphydStatusField
                label="Last Successful File"
                device="ophyd_status_devices.ophyd_status.last_file"
              /> */}
              <div className={classes.horizontal}>
                <Typography variant="h6" color="inherit">
                  Mono Shutter:
                  </Typography>
                <OphydButton
                  label="Close"
                  value={1}
                  device="saxs_pss.pss.mono_shutter_close"
                  buttonClasses={classes.redButton}
                />
                <OphydButton
                  label="Open"
                  value={1}
                  device="saxs_pss.pss.mono_shutter_open"
                  buttonClasses={classes.greenButton}
                />
              </div>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          anchor="left"
          open={drawerOpen}
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: drawerOpen,
            [classes.drawerClose]: !drawerOpen
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: drawerOpen,
              [classes.drawerClose]: !drawerOpen
            })
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            {[
              ["Acquisition", <PlayCircleOutline />],
              // ["New Experiment", <NoteAdd />],
              ["Beamline Control", <Settings />],
              ["Beamline Config", <Favorite />],
              ["Vacuum Controls", <Cached />],
              ["Video Cameras", <Videocam />],
              ["Q Range Setup", <Typography variant="h6" style={{paddingLeft: "5px"}}>q</Typography>],
              ["Grazing Setup", <CallMissedOutgoing />],
              ["Tensile Setup", <SwapHoriz />],
              ["Python Logger", <Warning />],
              ["Docker", <Docker />],
              ["Flags", <FlagIcon />],
              ["Redis", <Database />]
            ].map((item, index) => (
              <ListItem button key={item[0]} onClick={() => handlePageChange(index)}>
                <ListItemIcon>{item[1]}</ListItemIcon>
                <ListItemText primary={item[0]} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {page === 0 && (
            <div>
              <AcquirePage />
            </div>
          )}
          {page === 1 && (
            <div>
              <BeamlineControl />
            </div>
          )}
          {page === 2 && (
            <div>
              <ConfigPage />
            </div>
          )}
          {page === 3 && (
            <div>
              <VacuumPage />
            </div>
          )}
          {page === 4 && (
            <div>
              <VideoPage />
            </div>
          )}
          {page === 5 && (
            <div>
              <QRangeChange />
            </div>
          )}
          {page === 6 && (
            <div>
              <GrazingPage />
            </div>
          )}
          {page === 7 && (
            <div>
              <TensilePage />
            </div>
          )}
          {page === 8 && (
            <div>
              <LoggerPage />
            </div>
          )}
          {page === 9 && (
            <div>
              <DockerPage />
            </div>
          )}
          {page === 10 && (
            <div>
              <FlagsPage />
            </div>
          )}
          {page === 11 && (
            <div>
              <RedisPage />
            </div>
          )}
          <SnackBar
            open={ophydError !== null}
            message={ophydError}
            onClose={handleErrorClose}
          />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
