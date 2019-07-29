import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/styles";

import Select from "react-select";

const useStyles = makeStyles({});

const selectStyles = {
  control: (styles, state) => ({ ...styles, width: "300px" }),
  option: (styles, state) => ({ ...styles, color: "black" })
};

function DeviceSelector() {
  const classes = useStyles();

  const [device, setDevice] = useState({});
  const [deviceList, setDeviceList] = useState([
    { value: "a", label: "a" },
    { value: "b", label: "b" }
  ]);
  const [deviceListRequested, setDeviceListRequested] = useState(false);
  const handleChange = device => {
    setDevice(device);
    if (this.props.onChange) {
      this.props.onChange(device);
    }
  };

  // useEffect(() => {
  //   if (!deviceListRequested) {
  //     setDeviceListRequested(true);

  //     fetch("http://localhost:8080/api/v1.0/devices", {
  //       method: "GET",
  //       mode: "cors"
  //     })
  //       .then(response => {
  //         if (response.status !== 200) {
  //           return { response: "error" };
  //         } else {
  //           return response.json();
  //         }
  //       })
  //       .then(responseData => {
  //         setDeviceList(
  //           responseData.map(device => {
  //             return { value: device.device, label: device.name };
  //           })
  //         );
  //       });
  //   }
  // });

  return (
    <React.Fragment>
      <Select
        onChange={this.handleChange}
        label="Select Device"
        options={deviceList}
        isClearable
        styles={selectStyles}
      />
    </React.Fragment>
  );
}

export default DeviceSelector;
