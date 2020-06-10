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
import { getFlags, setFlag } from "../../actions/index";

const useStyles = makeStyles({
  search: {
    marginBottom: "20px",
  },
});

const FlagsPage = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("ascending");

  const flags = useSelector((state) => state.flags.flags);

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleSort = (event, newSort) => {
    setSort(newSort);
  };

  const handleCheck = (event) => {
    dispatch(setFlag(event.currentTarget.dataset.flag, event.target.checked));
  };

  useEffect(() => {
    dispatch(getFlags());
  }, []);

  if (flags === null) {
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
              <ToggleButton value="set" aria-label="set">
                <CheckBoxIcon />
              </ToggleButton>
              <ToggleButton value="unset" aria-label="unset">
                <CheckBoxOutlineBlankIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
        <Grid container direction="column" xs={12} justify="center" spacing={2} wrap="nowrap">
          {Object.entries(flags)
            .filter((flag) => flag[0].includes(filter))
            .sort((a, b) => {
              if (sort === "ascending") {
                return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0;
              } else if (sort === "descending") {
                return a[0] < b[0] ? 1 : a[0] > b[0] ? -1 : 0;
              } else if (sort === "set") {
                return a[1] === b[1] ? 0 : a[1] ? -1 : 1;
              } else if (sort === "unset") {
                return a[1] === b[1] ? 0 : a[1] ? 1 : -1;
              }
            })
            .map((flag) => (
              <Grid container direction="row" xs={12} spacing={2} key={flag[0]}>
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={flag[1]}
                        onChange={handleCheck}
                        inputProps={{ "data-flag": flag[0] }}
                      />
                    }
                    label={flag[0]}
                  />
                </Grid>
              </Grid>
            ))}
        </Grid>
      </React.Fragment>
    );
  }
};

export default FlagsPage;
