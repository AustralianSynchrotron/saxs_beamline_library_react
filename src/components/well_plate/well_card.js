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

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";

const switchTheme = createMuiTheme({
  palette: {}
});

const styles = theme => ({
  card: {
    display: "flex",
    flexGrow: 1
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
  buffer: {
    background: "blue"
  },
  sample: {
    background: "green"
  },
  repeatBuffer: {
    background: "lightblue"
  }
});

const washes = ["No Wash", "Water Wash", "Detergent Wash"];
const wellTypes = ["Empty", "Buffer", "Sample", "Repeat Buffer"];

class WellCard extends PureComponent {
  constructor(props) {
    super(props);
  }

  handleUpdate = (key, event) => {
    this.props.onUpdate(this.props.index, { [key]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <Card
        className={classNames(
          classes.card,
          this.props.well.wellType === "Buffer"
            ? classes.buffer
            : this.props.well.wellType === "Sample"
            ? classes.sample
            : this.props.well.wellType === "Repeat Buffer"
            ? classes.repeatBuffer
            : null
        )}
      >
        <CardContent className={classes.content}>
          <TextField
            className={classes.contentItems}
            variant="outlined"
            value={this.props.well.name}
            onChange={event => this.handleUpdate("name", event)}
            InputProps={{ classes: { input: classes.name } }}
          />
          <Select
            className={classes.contentItems}
            label={"Sample Type"}
            value={this.props.well.wellType}
            onChange={event => this.handleUpdate("wellType", event)}
          >
            {wellTypes.map(name => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
          <Select
            className={classes.contentItems}
            label={"Wash Type"}
            value={this.props.well.washType}
            onChange={event => this.handleUpdate("washType", event)}
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
