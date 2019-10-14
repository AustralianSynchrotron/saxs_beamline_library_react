import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles, createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Favorite from "@material-ui/icons/Favorite";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import NoteAdd from "@material-ui/icons/NoteAdd";
import Cached from "@material-ui/icons/Cached";
import Videocam from "@material-ui/icons/Videocam";
import Warning from "@material-ui/icons/Warning";
import SwapHoriz from "@material-ui/icons/SwapHoriz";
import CallMissedOutgoing from "@material-ui/icons/CallMissedOutgoing";
import Settings from "@material-ui/icons/Settings";
import ViewComfy from "@material-ui/icons/ViewComfy";
import PlayCircleOutline from "@material-ui/icons/PlayCircleOutline";
import Docker from "mdi-material-ui/Docker";
import BeamlineControl from "./components/beamline_control/beamline_control.js";
import AcquirePage from "./components/acquire_page/acquire_page.js";
import ConfigPage from "./components/config_page/config_page.js";
import WellPlate from "./components/well_plate/well_plate.js";
import VacuumPage from "./components/vacuum/Vacuum";
import TensilePage from "./components/tensile/Tensile";
import GrazingPage from "./components/grazing_page/grazing_page";
import VideoPage from "./components/video_page/video_page";
import DockerPage from "./components/docker_page/docker_page";
import LoggerPage from "./components/logger_page/logger_page";
import SnackBar from "@material-ui/core/SnackBar";
import * as actionCreators from "./actions/index";
import { OphydStatusField, OphydButton } from "./components/ophyd_components/ophyd_components.js";
import green from "@material-ui/core/colors/green";
import grey from "@material-ui/core/colors/grey";
import red from "@material-ui/core/colors/red";
import { mergeClasses } from "@material-ui/styles";

const drawerWidth = 240;

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

const styles = theme => ({
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
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9 + 1
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
    padding: theme.spacing.unit * 3
  },
  red_button: {
    background: red[500],
    color: "white",
    height: 48,
    "&:hover": {
      backgroundColor: red["A700"]
    }
  },
  green_button: {
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

class App extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      drawerOpen: false,
      page: 0
    };
  }

  handleDrawerOpen = () => {
    this.setState({ drawerOpen: true });
  };

  handleDrawerClose = () => {
    this.setState({ drawerOpen: false });
  };

  handlePageChange = page => {
    this.setState({ page });
  };

  handleErrorClose = () => {
    this.props.clearSetError();
  };

  render() {
    const { classes } = this.props;
    const { drawerOpen, page } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            color={this.props.connected ? "primary" : "secondary"}
            position="absolute"
            className={classNames(classes.appBar, {
              [classes.appBarShift]: drawerOpen
            })}
          >
            <Toolbar disableGutters={!drawerOpen}>
              <IconButton
                color="inherit"
                aria-label="Menu"
                onClick={this.handleDrawerOpen}
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
                  device="EPICS_status_devices.epics_status.beam_on_sample"
                />
                <div className={classes.horizontal}>
                  <Typography variant="h6" color="inherit">
                    Mono Shutter:
                  </Typography>
                  <OphydButton
                    label="Close"
                    value={1}
                    device="saxs_pss.pss.mono_shutter_close"
                    classes={classes.red_button}
                  />
                  <OphydButton
                    label="Open"
                    value={1}
                    device="saxs_pss.pss.mono_shutter_open"
                    classes={classes.green_button}
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
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List>
              {[
                ["Acquisition", <PlayCircleOutline />],
                ["Solution Autoloader", <ViewComfy />],
                ["New Experiment", <NoteAdd />],
                ["Beamline Control", <Settings />],
                ["Beamline Config", <Favorite />],
                ["Vacuum Controls", <Cached />],
                ["Video Cameras", <Videocam />],
                ["Grazing Setup", <CallMissedOutgoing />],
                ["Tensile Setup", <SwapHoriz />],
                ["Docker", <Docker />],
                ["Python Logger", <Warning />]
              ].map((item, index) => (
                <ListItem button key={item[0]} onClick={() => this.handlePageChange(index)}>
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
                <WellPlate />
              </div>
            )}
            {page === 3 && (
              <div>
                <BeamlineControl />
              </div>
            )}
            {page === 4 && (
              <div>
                <ConfigPage />
              </div>
            )}
            {page === 5 && (
              <div>
                <VacuumPage />
              </div>
            )}
            {page === 6 && (
              <div>
                <VideoPage />
              </div>
            )}
            {page === 7 && (
              <div>
                <GrazingPage />
              </div>
            )}
            {page === 8 && (
              <div>
                <TensilePage />
              </div>
            )}
            {page === 9 && (
              <div>
                <LoggerPage />
              </div>
            )}
            {page === 10 && (
              <div>
                <DockerPage />
              </div>
            )}
            <SnackBar
              open={this.props.error !== null}
              message={this.props.error}
              onClose={this.handleErrorClose}
            />
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    error: state.ophyd.setError,
    connected: state.ophyd.connected
  };
}

export default connect(
  mapStateToProps,
  actionCreators
)(withStyles(styles)(App));
