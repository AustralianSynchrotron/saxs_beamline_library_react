import React, { Component } from 'react';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class FilterBank extends Component {
  constructor(props) {
    super(props)
    const size = parseInt(props.size);
    this.state = {
      size: size,
      filters: [],
      number: 0,
      transmission: 1
    }
    this.filterGroup = this.createFilters(this.props.size, this.state.filters);
  }

  setNumber = (filters) => {
    var number = 0;
    filters.forEach((num) => {
      number += Math.pow(2, num);
    })
    this.setState({number});
  }

  setFilters = (number) => {
    var filtArray = [];
    const bin = (number).toString(2);
    [...bin].slice().reverse().forEach((bit, index) => {
      if (bit === "1") { filtArray.push(index)}
    });
    this.setState({ filters: filtArray });
  }

  handleFilterChange = (event, filters) => {
    this.setState( {filters} );
    this.setNumber(filters);
  }

  handleNumberChange = (event) => {
    var number = parseInt(event.target.value);
    if (isFinite(number) !== true) { number = 0};
    this.setState( {number} );
    this.setFilters(number);
  }

  handleTransmissionChange = (event, transmission) => {
    this.setState( {transmission} );
  }

  handleIncrementFilter = (direction) => (event) => {
    var number = this.state.number;
    if (direction === "increase"){
      ++number;
    } else if (direction === "decrease") {
      --number;
    }
    this.setState( {number} );
    this.setFilters(number);
  }

  createFilters = (number, filters) => {
    let filterGroup = [];
    for (let i = 0; i <= number - 1; i++) {
        filterGroup.push(<ToggleButton value={i} key={i}>{i}</ToggleButton>);
    }
    return filterGroup;
  }

  render() {
    return (
      <div>
        <TextField
          label="Transmission"
          value={this.state.transmission}
          onChange={this.handleTransmissionChange}
        />
        <Button onClick={this.handleIncrementFilter("decrease")}>
          <FontAwesomeIcon icon="caret-square-left" size="2x"/>
        </Button>
        <ToggleButtonGroup value={this.state.filters} onChange={this.handleFilterChange}>
          {this.filterGroup}
        </ToggleButtonGroup>
        <Button onClick={this.handleIncrementFilter("increase")}>
          <FontAwesomeIcon icon="caret-square-right" size="2x"/>
        </Button>
        <TextField
          label="Number"
          value={this.state.number}
          onChange={this.handleNumberChange}
        />
      </div>
    )
  }
}

export default FilterBank;

