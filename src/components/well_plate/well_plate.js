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
// import Grid from "@material-ui/core/Grid";
import { AutoSizer, Grid } from "react-virtualized";
import Button from "@material-ui/core/Button";

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
    this.state = {
      rowCount: 80,
      columnCount: 12,
      rowHeight: 200,
      columnWidth: 175,
      height: 1200
    };
  }

  handleUpdate = (index, well) => {
    this.props.updateWell(index, well);
  };

  handleSelectAll = () => {
    this.props.selectAllWells();
  };

  handleUnselectAll = () => {
    this.props.unselectAllWells();
  };

  cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
    console.log(key);
    return (
      <div key={key} style={style}>
        <WellCard
          index={columnIndex + 12 * rowIndex}
          well={this.props.wells[columnIndex + 12 * rowIndex]}
          onUpdate={this.handleUpdate}
        />
      </div>
    );
  };

  render() {
    const { classes } = this.props;
    // var cards = [];
    // for (const [index, well] of Object.entries(this.props.wells)) {
    //   cards.push(
    //     <Grid key={index} lg={1} md={1} sm={1} xl={1} xs={1} item>
    //       <WellCard index={index} well={well} onUpdate={this.handleUpdate} />
    //       {/* <WellCard key={index} name={element} onName={event => this.handleName(index, event)} /> */}
    //     </Grid>
    //   );
    // }

    // return (
    //   <React.Fragment>
    //     <Button onClick={this.handleSelectAll}>Select All</Button>
    //     <Button onClick={this.handleUnselectAll}>Unselect All</Button>
    //     <Grid container>{cards}</Grid>
    //   </React.Fragment>
    // );

    return (
      <AutoSizer disableHeight>
        {({ width }) => (
          <Grid
            cellRenderer={this.cellRenderer}
            // className={styles.BodyGrid}
            columnWidth={this.state.columnWidth}
            columnCount={this.state.columnCount}
            height={this.state.height}
            rowHeight={this.state.rowHeight}
            rowCount={this.state.rowCount}
            width={width}
          />
        )}
      </AutoSizer>
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
