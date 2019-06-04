import React, { Component } from "react";
import { connect } from "react-redux";

import * as actionCreators from "../../actions/index";

import classNames from "classnames";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import purple from "@material-ui/core/colors/purple";
import amber from "@material-ui/core/colors/amber";

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

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const styles = theme => ({
  root: {
    display: "flex",
    flexGrow: 1
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  horizontal: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "2px"
  },
  hidden: {
    display: "none"
  }
});

const positioners = [
  "None",
  "Sample Table X",
  "Sample Table Y",
  "Sample Table Z",
  "SAXS Detector X"
];

class LoopTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      positioner: ["", ""],
      type: [true, true],
      absrel: [true, true]
    };
  }

  handleSelectChange = event => {
    var info = JSON.parse(event.target.name);
    var value = this.state[info.param];
    value[info.positioner] = event.target.value;
    this.setState({ [info.param]: value });
  };

  handleSwitchChange = event => {
    var info = JSON.parse(event.target.name);
    var value = this.state[info.param];
    value[info.positioner] = event.target.checked;
    this.setState({ [info.param]: value });
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell>Parameter</CustomTableCell>
              <CustomTableCell align="right">Positioner 1</CustomTableCell>
              <CustomTableCell align="right">Positioner 2</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow className={classes.row} key={1}>
              <CustomTableCell component="th" scope="row">
                Positioner
              </CustomTableCell>
              <CustomTableCell align="right">
                <Select
                  value={this.state.positioner[0]}
                  onChange={this.handleSelectChange}
                  name='{"param": "positioner", "positioner": 0}'
                  className={classes.selectEmpty}
                >
                  {positioners.map(positioner => (
                    <MenuItem value="Sample Table X">{positioner}</MenuItem>
                  ))}
                </Select>
              </CustomTableCell>
              <CustomTableCell align="right">
                <Select
                  value={this.state.positioner[1]}
                  onChange={this.handleSelectChange}
                  name='{"param": "positioner", "positioner": 1}'
                  className={classes.selectEmpty}
                >
                  {positioners.map(positioner => (
                    <MenuItem value="Sample Table X">{positioner}</MenuItem>
                  ))}
                </Select>
              </CustomTableCell>
            </TableRow>
            <TableRow className={classes.row} key={2}>
              <CustomTableCell component="th" scope="row">
                Type
              </CustomTableCell>
              <CustomTableCell align="right">
                <div className={classes.horizontal}>
                  <Typography>Linear</Typography>
                  <ThemeProvider theme={switchTheme}>
                    <ColourSwitch
                      checked={this.state.type[0]}
                      onChange={this.handleSwitchChange}
                      name='{"param": "type", "positioner": 0}'
                    />
                  </ThemeProvider>
                  <Typography>Table</Typography>
                </div>
              </CustomTableCell>
              <CustomTableCell align="right">
                <div className={classes.horizontal}>
                  <Typography>Linear</Typography>
                  <ThemeProvider theme={switchTheme}>
                    <ColourSwitch
                      checked={this.state.type[1]}
                      onChange={this.handleSwitchChange}
                      name='{"param": "type", "positioner": 1}'
                    />
                  </ThemeProvider>
                  <Typography>Table</Typography>
                </div>
              </CustomTableCell>
            </TableRow>
            <TableRow className={classes.row} key={3}>
              <CustomTableCell component="th" scope="row">
                Absolute/Relative
              </CustomTableCell>
              <CustomTableCell align="right">
                <div className={classes.horizontal}>
                  <Typography>Absolute</Typography>
                  <ThemeProvider theme={switchTheme}>
                    <ColourSwitch
                      checked={this.state.absrel[0]}
                      onChange={this.handleSwitchChange}
                      name='{"param": "absrel", "positioner": 0}'
                    />
                  </ThemeProvider>
                  <Typography>Relative</Typography>
                </div>
              </CustomTableCell>
              <CustomTableCell align="right">
                <div className={classes.horizontal}>
                  <Typography>Absolute</Typography>
                  <ThemeProvider theme={switchTheme}>
                    <ColourSwitch
                      checked={this.state.absrel[1]}
                      onChange={this.handleSwitchChange}
                      name='{"param": "absrel", "positioner": 1}'
                    />
                  </ThemeProvider>
                  <Typography>Relative</Typography>
                </div>
              </CustomTableCell>
            </TableRow>
            <TableRow
              className={classNames(
                classes.row,
                this.state.type.includes(false) ? null : classes.hidden
              )}
              key={4}
            >
              <CustomTableCell component="th" scope="row">
                Start
              </CustomTableCell>
            </TableRow>
            <TableRow
              className={classNames(
                classes.row,
                this.state.type.includes(false) ? null : classes.hidden
              )}
              key={5}
            >
              <CustomTableCell component="th" scope="row">
                Stop
              </CustomTableCell>
            </TableRow>
            <TableRow
              className={classNames(
                classes.row,
                this.state.type.includes(false) ? null : classes.hidden
              )}
              key={6}
            >
              <CustomTableCell component="th" scope="row">
                Step
              </CustomTableCell>
            </TableRow>
            <TableRow
              className={classNames(
                classes.row,
                this.state.type.includes(false) ? null : classes.hidden
              )}
              key={7}
            >
              <CustomTableCell component="th" scope="row">
                Number
              </CustomTableCell>
            </TableRow>
            <TableRow className={classes.row} key={8}>
              <CustomTableCell component="th" scope="row">
                Delay (s)
              </CustomTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
LoopTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoopTable);
