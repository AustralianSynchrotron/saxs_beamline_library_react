import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Search from "@material-ui/icons/Search";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { makeStyles } from "@material-ui/styles";
// import SortByAlpha from "@material-ui/icons/SortByAlpha";
import PriorityHigh from "mdi-material-ui/PriorityHigh";
import PriorityLow from "mdi-material-ui/PriorityLow";
import SortAlphabeticalAscending from "mdi-material-ui/SortAlphabeticalAscending";
import SortAlphabeticalDescending from "mdi-material-ui/SortAlphabeticalDescending";
import React, { useState } from "react";
import { useSubscribeDocker } from "./docker";
import { ServiceControl, ServiceControlHeader } from "./docker_controls";

const useStyles = makeStyles({
  search: {
    marginBottom: "20px"
  }
});

const DockerPage = props => {
  const classes = useStyles();

  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("ascending");
  const dockerData = useSubscribeDocker();
  const services = dockerData.services;

  const handleFilter = event => {
    setFilter(event.target.value);
  };

  const handleSort = (event, newSort) => {
    setSort(newSort);
  };

  if (services === null) {
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
                )
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
              <ToggleButton value="high" aria-label="high">
                <PriorityHigh />
              </ToggleButton>
              <ToggleButton value="low" aria-label="low">
                <PriorityLow />
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
        <Grid container direction="column" xs={12} justify="center" spacing={2} wrap="nowrap">
          <ServiceControlHeader />
          {services
            .filter(service => service.name.includes(filter))
            .sort((a, b) => {
              if (sort === "ascending") {
                return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
              } else if (sort === "descending") {
                return a.name < b.name ? 1 : a.name > b.name ? -1 : 0;
              } else if (sort === "high" || sort === "low") {
                const a_frac = a.tasks === a.replicas ? 1 : a.tasks / (a.replicas + 1);
                const b_frac = b.tasks === b.replicas ? 1 : b.tasks / (b.replicas + 1);
                const a_diff = a.replicas - a.tasks;
                const b_diff = b.replicas - b.tasks;
                const a_over = Math.max(a.tasks - a.replicas, 0);
                const b_over = Math.max(b.tasks - b.replicas, 0);

                if (sort === "high") {
                  var frac = a_frac < b_frac ? -100 : a_frac > b_frac ? 100 : 0;
                  var diff = a_diff > b_diff ? -10 : a_diff < b_diff ? 10 : 0;
                  var over = a_over > b_over ? -1000 : a_over < b_over ? 1000 : 0;
                } else {
                  var frac = a_frac < b_frac ? 100 : a_frac > b_frac ? -100 : 0;
                  var diff = a_diff > b_diff ? 10 : a_diff < b_diff ? -10 : 0;
                  var over = a_over > b_over ? 1000 : a_over < b_over ? -1000 : 0;
                }
                console.log(over);
                return over + frac + diff + (a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
              }
            })
            .map(service => (
              <Grid item>
                <ServiceControl service={service} />
              </Grid>
            ))}
        </Grid>
      </React.Fragment>
    );
  }
};

export default DockerPage;
