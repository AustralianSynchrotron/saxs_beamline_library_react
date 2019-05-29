import React, { Component } from "react";
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
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import WellCard from "./well_card.js";

const switchTheme = createMuiTheme({
  palette: {}
});

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

class WellPlate extends Component {
  constructor(props) {
    super(props);
  }

  handleUpdate = (index, well) => {
    this.props.updateWell(index, well);
  };

  render() {
    const { classes } = this.props;
    var cards = [];
    for (const [index, well] of Object.entries(this.props.wells)) {
      cards.push(
        <Grid key={index} lg={1} md={1} sm={1} xl={1} xs={1} item>
          <WellCard
            index={index}
            well={well}
            onUpdate={this.handleUpdate}
          />
          {/* <WellCard key={index} name={element} onName={event => this.handleName(index, event)} /> */}
        </Grid>
      );
    }

    return (
      <React.Fragment>
        <Grid container>{cards}</Grid>
      </React.Fragment>
    );
  }
}
WellPlate.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    wells: state.wellPlate.wells,
    status: state.acquire.status
  };
}

export default connect(
  mapStateToProps,
  actionCreators
)(withStyles(styles)(WellPlate));
