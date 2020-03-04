import React, { Component } from "react";
import { connect } from "react-redux";

import * as actionCreators from "../../actions/index";

import PropTypes from "prop-types";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import Create from "@material-ui/icons/Create";
import Restore from "@material-ui/icons/Restore";
import AutoRenew from "@material-ui/icons/Autorenew";
import Save from "@material-ui/icons/Save";
import Send from "@material-ui/icons/Send";
import PlaylistAddCheck from "@material-ui/icons/PlaylistAddCheck";
import PlaylistAdd from "@material-ui/icons/PlaylistAdd";
import DeleteForever from "@material-ui/icons/DeleteForever";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import CheckBox from "@material-ui/core/CheckBox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Switch from "@material-ui/core/Switch";
import CancelIcon from "@material-ui/icons/Cancel";
import classNames from "classnames";
import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";
import purple from "@material-ui/core/colors/purple";
import deepOrange from "@material-ui/core/colors/deepOrange";
import grey from "@material-ui/core/colors/grey";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import NewConfigDialog from "./new_config_dialog";
import NewDeviceDialog from "./new_device_dialog";
import { Typography } from "@material-ui/core";
import { strikethrough } from "ansi-colors";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { red, blue } from "@material-ui/core/colors";

const beamlineConfigURL = "http://10.138.13.201:8080";
// const beamlineConfigURL = "beamlineConfigURL";

const switchTheme = createMuiTheme({
  palette: {
    secondary: { main: purple[400] }
  }
});

const ColourSwitch = withStyles({
  track: {
    backgroundColor: amber[400]
  },
  switchBase: {
    color: amber[400]
  }
})(Switch);

const styles = theme => ({
  root: {
    display: "flex",
    flexGrow: 1
  },
  fab: {
    margin: theme.spacing(1),
    cursor: "pointer"
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  button: {
    color: "white",
    margin: "2px",
    "&:hover": {
      color: "white"
    }
  },
  restore: {
    backgroundColor: amber["700"],
    "&:hover": {
      backgroundColor: amber["A200"]
    }
  },
  addrow: {
    color: theme.palette.getContrastText(blue["700"]),
    backgroundColor: blue["700"],
    "&:hover": {
      backgroundColor: blue["A200"]
    }
  },
  chip: {
    margin: "2px"
  },
  status: {
    color: grey["400"]
  },
  small_check: {
    width: "24px",
    height: "24px"
  },
  label: {
    color: grey["400"]
  },
  number: {
    height: "8px"
  },
  horizontal: {
    display: "flex",
    flexDirection: "row"
  },
  error: {
    color: theme.palette.getContrastText(theme.palette.error.dark),
    backgroundColor: theme.palette.error.dark
  }
});

class ConfigPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedConfig: "",
      newConfigOpen: false,
      newDeviceOpen: false,
      noOpenConfigWarning: false
    };
  }

  handleNoOpenConfigWarningClose = () => {
    this.setState({ noOpenConfigWarning: false });
  };

  handleOpenNewConfig = () => {
    this.setState({ newConfigOpen: true });
  };

  handleNewConfigClose = (configName, baseConfigName) => {
    if (configName === null) {
    } else {
      this.props.newConfig(configName, baseConfigName);
    }
    this.setState({ newConfigOpen: false });
  };

  handleSelectConfig = event => {
    this.setState({ selectedConfig: event.target.value });
    this.props.getConfig(event.target.value);
  };

  handleReReadConfigs = event => {
    this.props.reRead();
  };

  handleStore = () => {
    this.props.storeConfig(this.state.selectedConfig);
  };

  handleUpdate = () => {
    this.props.updateConfig(this.state.selectedConfig);
  };

  handleReInitConfig = () => {
    this.props.reInitConfig(this.state.selectedConfig);
  };

  handleNewDeviceClose = device => {
    this.setState({ newDeviceOpen: false });
    if (device !== null) {
      this.props.newDevice(this.state.selectedConfig, device);
    }
  };

  handleAddRow = event => {
    if (this.props.configs.config.name === "") {
      this.setState({ noOpenConfigWarning: true });
    } else {
      this.setState({ newDeviceOpen: true });
    }
  };

  handleDeleteRow = event => {
    this.props.deleteDevice(this.state.selectedConfig, event.currentTarget.dataset.device);
  };

  handleCheckDevice = device => {
    return fetch(beamlineConfigURL + "/api/v1.0/device/" + device, {
      method: "GET",
      mode: "cors"
    }).then(response => {
      if (response.status !== 200) {
        return { response: "error" };
      } else {
        return response.json();
      }
    });
  };

  handleRestoreConfig = () => {
    this.props.restoreConfig(this.state.selectedConfig);
  };

  setParameter = (event, key, value) => {
    this.props.configSetParameter(
      this.state.selectedConfig,
      ["devices", event.currentTarget.dataset.device].concat(key),
      value
    );
  };

  handleValueChange = event => {
    this.setParameter(event, ["value"], event.target.value);
  };
  handleNoUpdateChange = event => {
    this.setParameter(event, ["update", "no_update"], event.target.checked);
  };
  handleRelativeDeviceChange = event => {
    this.setParameter(event, ["update", "relative", "device"], event.target.value);
  };
  handleDirChange = event => {
    this.setParameter(event, ["update", "relative", "dir"], event.target.checked);
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="left" spacing={10}>
            <Grid item>
              <div>
                <Fab
                  variant="extended"
                  aria-label="Create"
                  className={classes.fab}
                  onClick={this.handleOpenNewConfig}
                >
                  <Create className={classes.extendedIcon} />
                  Create
                </Fab>
                {/* <Fab
                  variant="extended"
                  aria-label="Store"
                  className={classes.fab}
                  onClick={this.handleStore}
                >
                  <Save className={classes.extendedIcon} />
                  Store To Disk
                </Fab> */}
                {/* <Fab
                  variant="extended"
                  aria-label="Reread"
                  className={classes.fab}
                  onClick={this.handleReReadConfigs}
                >
                  <Restore className={classes.extendedIcon} />
                  Re-Read from Disk
                </Fab> */}
                <Fab
                  variant="extended"
                  aria-label="Create"
                  className={classes.fab}
                  onClick={this.handleReInitConfig}
                >
                  <AutoRenew className={classes.extendedIcon} />
                  Reinitialise
                </Fab>
                {/* <Fab
                  variant="extended"
                  aria-label="Update"
                  className={classes.fab}
                  onClick={this.handleUpdate}
                >
                  <PlaylistAddCheck className={classes.extendedIcon} />
                  Update
                </Fab> */}
                <Fab
                  variant="extended"
                  aria-label="Restore"
                  className={classNames(classes.fab, classes.restore)}
                  onClick={this.handleRestoreConfig}
                >
                  <Send className={classes.extendedIcon} />
                  Restore
                </Fab>
              </div>
            </Grid>
            <Grid item>
              <InputLabel htmlFor="select-config">Selected Config</InputLabel>
              <Select
                label={"Configs"}
                value={this.state.selectedConfig}
                onOpen={this.props.listConfigs}
                onChange={this.handleSelectConfig}
                input={<Input id="select-config" />}
              >
                {this.props.configs.config_list.map(name => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Grid container justify="left" spacing={10}>
            <Grid item>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell> Device </TableCell>
                    <TableCell> Value </TableCell>
                    {/* <TableCell> Don't Update </TableCell>
                    <TableCell> Relative Device </TableCell>
                    <TableCell> Relative Direction </TableCell> */}
                    <TableCell> </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.keys(this.props.configs.config.devices).map(key => (
                    <TableRow key={key}>
                      <TableCell component="th" scope="row">
                        {key}
                      </TableCell>
                      <TableCell>
                        <TextField
                          variant="outlined"
                          inputProps={{ "data-device": key }}
                          value={this.props.configs.config.devices[key]["value"]}
                          onChange={this.handleValueChange}
                        />
                      </TableCell>

                      {/* <TableCell>
                        <CheckBox
                          inputProps={{ "data-device": key }}
                          checked={this.props.configs.config.devices[key]["update"]["no_update"]}
                          onChange={this.handleNoUpdateChange}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          inputProps={{ "data-device": key }}
                          variant="outlined"
                          value={
                            this.props.configs.config.devices[key]["update"]["relative"]
                              ? this.props.configs.config.devices[key]["update"]["relative"][
                                  "device"
                                ]
                              : ""
                          }
                          onChange={this.handleRelativeDeviceChange}
                        />
                      </TableCell>
                      <TableCell className={classes.horizontal}>
                        <Typography>Neg</Typography>
                        <ThemeProvider theme={switchTheme}>
                          <ColourSwitch
                            inputProps={{ "data-device": key }}
                            checked={
                              this.props.configs.config.devices[key]["update"]["relative"]
                                ? this.props.configs.config.devices[key]["update"]["relative"][
                                    "dir"
                                  ] === "positive"
                                : false
                            }
                            onChange={this.handleDirChange}
                          />
                        </ThemeProvider>
                        <Typography>Pos</Typography>
                      </TableCell> */}
                      <TableCell>
                        <IconButton
                          data-device={key}
                          aria-label="Delete Row"
                          onClick={this.handleDeleteRow}
                        >
                          <DeleteForever />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Fab
                variant="extended"
                aria-label="Add Row"
                className={classNames(classes.fab, classes.addrow)}
                onClick={this.handleAddRow}
              >
                <PlaylistAdd className={classes.extendedIcon} />
                Add New Row
              </Fab>
            </Grid>
          </Grid>
        </Grid>
        <NewConfigDialog
          onClose={this.handleNewConfigClose}
          open={this.state.newConfigOpen}
          configs={this.props.configs.config_list}
        />
        <NewDeviceDialog
          onClose={this.handleNewDeviceClose}
          onCheckDevice={this.handleCheckDevice}
          open={this.state.newDeviceOpen}
        />
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          open={this.state.noOpenConfigWarning}
          onClose={this.handleNoOpenConfigWarningClose}
          autoHideDuration={2000}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
        >
          <SnackbarContent
            message={<span id="message-id">Load or Create Config First</span>}
            className={classes.error}
          />
        </Snackbar>
      </Grid>
    );
  }
}

ConfigPage.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    configs: state.configs
  };
}

export default connect(
  mapStateToProps,
  actionCreators
)(withStyles(styles)(ConfigPage));
