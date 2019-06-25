import React, { Component } from "react";
import { connect } from "react-redux";

import * as actionCreators from "../../actions/index";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import Create from "@material-ui/icons/Create";
import AutoRenew from "@material-ui/icons/Autorenew";
import Save from "@material-ui/icons/Save";
import Send from "@material-ui/icons/Send";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import CancelIcon from "@material-ui/icons/Cancel";
import classNames from "classnames";
import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";
import red from "@material-ui/core/colors/red";
import deepOrange from "@material-ui/core/colors/deepOrange";
import grey from "@material-ui/core/colors/grey";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import NewConfigDialog from "../new_config_dialog/new_config_dialog";
import LoopTable from "../loop_table/loop_table";
import { Typography } from "@material-ui/core";
import { strikethrough } from "ansi-colors";

const styles = theme => ({
  root: {
    display: "flex",
    flexGrow: 1
  },
  fab: {
    margin: theme.spacing(1)
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
  store: {
    backgroundColor: green["700"],
    "&:hover": {
      backgroundColor: green["A700"]
    }
  },
  restore: {
    backgroundColor: amber["700"],
    "&:hover": {
      backgroundColor: amber["A700"]
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
  }
});

class ConfigPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedConfig: "a",
      newConfigOpen: false
    };
  }

  handleOpenNewConfig = () => {
    this.setState({ newConfigOpen: true });
  };

  handleNewConfigClose = configName => {
    alert(configName);
    this.setState({ newConfigOpen: false });
  };

  handleSelectConfig = event => {
    this.setState({ selectedConfig: event.target.value });
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
                <Fab variant="extended" aria-label="Create" className={classes.fab}>
                  <AutoRenew className={classes.extendedIcon} />
                  Reinitialise
                </Fab>
                <Fab variant="extended" aria-label="Update" className={classes.fab}>
                  <Save className={classes.extendedIcon} />
                  Update
                </Fab>
                <Fab variant="extended" aria-label="Restore" className={classes.fab}>
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
        </Grid>
        <NewConfigDialog
          onClose={this.handleNewConfigClose}
          open={this.state.newConfigOpen}
          configs={this.props.configs.config_list}
        />
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
