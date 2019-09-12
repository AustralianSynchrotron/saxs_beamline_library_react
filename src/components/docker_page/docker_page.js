import React from "react";
import { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputAdornment from "@material-ui/core/InputAdornment";
import Search from "@material-ui/icons/Search";
import { useSetDocker, useSubscribeDocker } from "./docker";
import { ServiceControl } from "./docker_controls";

const DockerPage = props => {
  const [filter, setFilter] = useState("");
  const dockerData = useSubscribeDocker();
  const services = dockerData.services;

  const handleFilter = event => {
    setFilter(event.target.value);
  };

  if (services === null) {
    return <CircularProgress />;
  } else {
    return (
      <Grid container direction="column" justify="center" spacing={1}>
        <Grid item>
          <Typography align="center">Docker Services</Typography>
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
          />
        </Grid>
        {services
          .filter(service => service.name.includes(filter))
          .sort((a, b) => {
            return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
          })
          .map(service => (
            <Grid item>
              <ServiceControl service={service} />
            </Grid>
          ))}
      </Grid>
    );
  }
};

export default DockerPage;
