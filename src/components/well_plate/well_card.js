import React, { PureComponent } from "react";
import { connect } from "react-redux";

import * as actionCreators from "../../actions/index";

import classNames from "classnames";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import Checkbox from "@material-ui/core/Checkbox";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import blue from "@material-ui/core/colors/blue";
import pink from "@material-ui/core/colors/pink";
import grey from "@material-ui/core/colors/grey";
import green from "@material-ui/core/colors/green";

const switchTheme = createMuiTheme({
  palette: {}
});

const styles = theme => ({
  card: {
    display: "flex",
    flexGrow: 1
  },
  horizontal: {
    display: "flex",
    flexDirection: "row"
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  content: {
    display: "flex",
    flexDirection: "column"
  },
  contentItems: {
    paddingTop: "10px"
  },
  name: {
    padding: "10px"
  },
  volume: {
    padding: "10px"
  },
  buffer: {
    background: blue[900]
  },
  sample: {
    background: green[700]
  },
  repeatBuffer: {
    background: blue[700]
  },
  noWash: {
    background: grey[400]
  },
  waterWash: {
    background: blue[400]
  },
  detergentWash: {
    background: pink[400]
  }
});

const washes = ["No Wash", "Water Wash", "Det. Wash"];
const wellTypes = ["Empty", "Buffer", "Sample", "Rpt. Buffer"];

class WellCard extends PureComponent {
  constructor(props) {
    super(props);
  }

  handleUpdate = (key, event) => {
    this.props.onUpdate(this.props.index, { [key]: event.target.value });
  };
  handleCheckedUpdate = (key, event) => {
    this.props.onUpdate(this.props.index, { [key]: event.target.checked });
  };

  render() {
    const { classes } = this.props;
    return (
      <Card
        className={classNames(
          classes.card,
          this.props.well.well_type === "Buffer"
            ? classes.buffer
            : this.props.well.well_type === "Sample"
            ? classes.sample
            : this.props.well.well_type === "Rpt. Buffer"
            ? classes.repeatBuffer
            : null
        )}
      >
        <CardContent className={classes.content}>
          <div className={classes.horizontal}>
            <TextField
              className={classes.contentItems}
              variant="outlined"
              value={this.props.well.well_name}
              onChange={event => this.handleUpdate("well_name", event)}
              InputProps={{ classes: { input: classes.name } }}
            />
            <Checkbox
              checked={this.props.well.well_selected}
              onChange={event => this.handleCheckedUpdate("well_selected", event)}
            />
          </div>
          <Select
            className={classes.contentItems}
            label={"Sample Type"}
            value={this.props.well.well_type}
            onChange={event => this.handleUpdate("well_type", event)}
          >
            {wellTypes.map(name => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
          <TextField
            className={classes.contentItems}
            variant="outlined"
            placeholder={"Vol."}
            type="number"
            value={this.props.well.well_volume}
            onChange={event => this.handleUpdate("well_volume", event)}
            InputProps={{
              endAdornment: <InputAdornment position="end">ul</InputAdornment>,
              classes: { input: classes.volume }
            }}
          />
          <Select
            className={classNames(
              classes.contentItems,
              this.props.well.wash_type === "No Wash"
                ? classes.noWash
                : this.props.well.wash_type === "Water Wash"
                ? classes.waterWash
                : this.props.well.wash_type === "Det. Wash"
                ? classes.detergentWash
                : null
            )}
            bgcolor="primary.main"
            label={"Wash Type"}
            value={this.props.well.wash_type}
            onChange={event => this.handleUpdate("wash_type", event)}
          >
            {washes.map(name => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </CardContent>
      </Card>
    );
  }
}
WellCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WellCard);
