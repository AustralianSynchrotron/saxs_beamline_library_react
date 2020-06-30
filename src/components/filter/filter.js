import React, { useState, useEffect } from "react";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ArrowForward from "@material-ui/icons/ArrowForward";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { OphydTextField } from "../ophyd_components/ophyd_components";

import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  number: { width: "48px" },
});

const FilterBank = (props) => {
  const classes = useStyles();

  const [filters, setFilters] = useState([]);
  const [number, setNumber] = useState(0);
  const [transmission, setTransmission] = useState(0);
  const [filterGroup, setFilterGroup] = useState();

  const _setNumber = (filters) => {
    var number = 0;
    filters.forEach((num) => {
      number += Math.pow(2, num);
    });
    setNumber(number);
  };

  const _setFilters = (number) => {
    var filtArray = [];
    const bin = number.toString(2);
    [...bin]
      .slice()
      .reverse()
      .forEach((bit, index) => {
        if (bit === "1") {
          filtArray.push(index);
        }
      });
    setFilters(filtArray);
  };

  const handleFilterChange = (event, filters) => {
    setFilters(filters);
    _setNumber(filters);
  };

  const handleNumberChange = (event) => {
    var number = parseInt(event.target.value);
    if (isFinite(number) !== true) {
      number = 0;
    }
    if (number < 0 || number > 2**props.size - 1) {
      return
    }
    setNumber(number);
    _setFilters(number);
  };

  const handleTransmissionChange = (event, transmission) => {
    setTransmission(transmission);
  };

  const handleIncrementFilter = () => {
    if (number >= 2**props.size - 1) {
      return
    }
    setNumber(number + 1);
    _setFilters(number + 1);
  };
  
  const handleDecrementFilter = () => {
    if (number == 0) {
      return
    }
    setNumber(number - 1);
    _setFilters(number - 1);
  };

  useEffect(() => {
    let _filterGroup = [];
    for (let i = 0; i <= props.size - 1; i++) {
      _filterGroup.push(
        <ToggleButton value={i} key={i}>
          {i}
        </ToggleButton>
      );
    }
    setFilterGroup(_filterGroup);
  }, []);

  return (
    <div>
      <OphydTextField
        label="Transmission"
        device="saxs_attenuators.saxs_attenuators"
        type="number"
        value={number}
        onChange={handleTransmissionChange}
        className={classes.number}
      />
      <Button onClick={handleDecrementFilter}>
        <ArrowBack />
      </Button>
      <ToggleButtonGroup value={filters} onChange={handleFilterChange}>
        {filterGroup}
      </ToggleButtonGroup>
      <Button onClick={handleIncrementFilter}>
        <ArrowForward />
      </Button>
      <TextField
        label="Number"
        type="number"
        value={number}
        onChange={handleNumberChange}
        className={classes.number}
      />
    </div>
  );
};

export default FilterBank;
