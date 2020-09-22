import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Search from "@material-ui/icons/Search";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/styles";
import SortAlphabeticalAscending from "mdi-material-ui/SortAlphabeticalAscending";
import SortAlphabeticalDescending from "mdi-material-ui/SortAlphabeticalDescending";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getKVs } from "../../actions/index";
import { Typography } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  search: {
    marginBottom: "20px",
  },
});

const RedisPage = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("ascending");

  const kvs = useSelector((state) => state.redis.kvs);

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleSort = (event, newSort) => {
    setSort(newSort);
  };

  useEffect(() => {
    dispatch(getKVs());
  }, []);

  if (kvs === null) {
    return <CircularProgress />;
  } else {
    return (
      <React.Fragment>
        <Grid container direction="row" xs={12} spacing={1} wrap="nowrap">
          <Grid item xs={1}>
            <TextField
              variant="outlined"
              label="Filter by Name"
              onChange={handleFilter}
              value={filter}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              className={classes.search}
            />
          </Grid>
          <Grid item xs={1}>
            <ToggleButtonGroup exclusive value={sort} onChange={handleSort}>
              <ToggleButton value="ascending" aria-label="ascending">
                <SortAlphabeticalAscending />
              </ToggleButton>
              <ToggleButton value="descending" aria-label="descending">
                <SortAlphabeticalDescending />
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
        <Grid container direction="column" xs={12} justify="center" spacing={2} wrap="nowrap">
          <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Key</TableCell>
                  <TableCell align="left">Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(kvs)
                  .filter((kv) => kv[0].includes(filter))
                  .sort((a, b) => {
                    if (sort === "ascending") {
                      return a[0].toLowerCase() < b[0].toLowerCase() ? -1 : a[0].toLowerCase() > b[0].toLowerCase() ? 1 : 0;
                    } else if (sort === "descending") {
                      return a[0].toLowerCase() < b[0].toLowerCase() ? 1 : a[0].toLowerCase() > b[0].toLowerCase() ? -1 : 0;
                    }
                  })
                  .map((kv) => (
                    <TableRow key={kv[0]}>
                      <TableCell component="th" scope="row">
                        {kv[0]}
                      </TableCell>
                      <TableCell align="left">{JSON.stringify(kv[1])}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </React.Fragment>
    );
  }
};

export default RedisPage;
