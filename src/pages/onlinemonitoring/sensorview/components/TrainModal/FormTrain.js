import React, { useState, useEffect } from "react";
import useStyles from "./styles";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import search from "./search.svg";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { toast } from "react-toastify";
import { Button } from "@material-ui/core";
import { sensorsonlinedata } from "../../../../../api/api_devices_energy";

const FormTrain = (props) => {
  const classes = useStyles();

  const handleChangeTimeFrom = (e) => {
    const offset = e.getTimezoneOffset() / 60;
    try {
      var selectedTime = new Date(e.getTime());
      var startTime = new Date(e.getTime());
      var start = new Date(startTime.setHours(startTime.getHours() - offset));
      const dateformat = selectedTime.toISOString();
      var startSeven = new Date(start.setHours(7, 0, 0));
      let minutes = (selectedTime - startSeven) / (1000 * 60);

      var timeslot = Math.floor(minutes) / 15;
      // const timefrom=dateformat.replace(/^[^:]*([0-2]\d:[0-5]\d).*$/, "$1")
      const DateFromNew = {
        ...props.onlineGraphProp,
        from: dateformat,
        fromTimeSlot: timeslot,
      };
      props.setOnlineGraphProp(DateFromNew);
    } catch (err) {
      const DateFromNew = {
        ...props.onlineGraphProp,
        from: null,
        fromTimeSlot: null,
      };
      props.setOnlineGraphProp(DateFromNew);
    }
  };

  const handleChangeTimeTo = (e) => {
    const offset = e.getTimezoneOffset() / 60;
    try {
      var selectedTime = new Date(e.getTime());
      var startTime = new Date(e.getTime());
      var start = new Date(startTime.setHours(startTime.getHours() - offset));
      const dateformat = selectedTime.toISOString();
      var startSeven = new Date(start.setHours(7, 0, 0));
      let minutes = (selectedTime - startSeven) / (1000 * 60);
      var timeslot = Math.floor(minutes) / 15;
      // const timefrom=dateformat.replace(/^[^:]*([0-2]\d:[0-5]\d).*$/, "$1")
      const DateFromNew = {
        ...props.onlineGraphProp,
        to: dateformat,
        toTimeSlot: timeslot,
      };
      props.setOnlineGraphProp(DateFromNew);
    } catch (err) {
      const DateFromNew = {
        ...props.onlineGraphProp,
        to: null,
        toTimeSlot: null,
      };
      props.setOnlineGraphProp(DateFromNew);
    }
  };
  const handleChangeGraphType = (event) => {
    const typenew = { ...props.onlineGraphProp, type: event.target.value };
    props.setOnlineGraphProp(typenew);
  };

  const handlePlotOnlineGraphs = (e) => {
    props.setHistoryGraphSelect(false);
    sensorsonlinedata(props, (isOk, data) => {
      if (!isOk) {
        return toast.error("Server is not responding for graphs!");
      } else {
        toast.info("Background process started by Celery in the backend");
        console.log(data);
        // toast.success("Data Received for Graphs!");
        // console.log('online', data)
        // props.setSensorData(data)
        // props.updateData([data[0]])
      }
    });
  };

  // const handleSubmitSensorValue = (e) => {
  //   const NewSensorValue = { ...props.sensorDataUpdate, reportDateTime: sensorUpdateDataTmp.actionDate.split("T")[0] + "T" + sensorUpdateDataTmp.actionTime.split("T")[1], sensors: [{ sensorCode: sensorUpdateDataTmp.sensorCode, sensorValue: sensorUpdateDataTmp.value }] };
  //   props.setSensorDataUpdate(NewSensorValue)
  //   updateSensorValue(NewSensorValue, (isOk, data) => {
  //     if (!isOk) {
  //       return toast.error("Check format of sensor value! Write a numerical value only!");
  //     } else {

  //       getSensorsBySiteId(props.site.id, (isOk, data) => {
  //         if (!isOk) {
  //           return toast.error("Could not update sensors list!");
  //         } else {
  //           if (data) {
  //             props.setSensors(data);
  //           }
  //           else {
  //             return toast.error("No sensors found for this site!");
  //           }
  //         }
  //       })
  //       return toast.success("New value is set");
  //     }
  //   });
  // }

  const handleChangeDesireTemp = (event) => {
    const desirenew = { ...props.onlineGraphProp, desire: event.target.value };
    props.setOnlineGraphProp(desirenew);
  };
  return (
    <div className={classes.formDivStyle}>
      <div className={classes.containerstyle}>
        <FormControl className={classes.textField0} variant="outlined">
          <InputLabel
            htmlFor="subject"
            classes={{ root: classes.textField1, shrink: classes.textField3 }}
          >
            Desirable Temperature (°C)
          </InputLabel>
          <OutlinedInput
            classes={{ root: classes.textField2 }}
            id="outlined-adornment-Subject"
            type={"number"}
            value={props.onlineGraphProp.desire}
            onChange={(e) => handleChangeDesireTemp(e)}
            label={"Desirable Temperature (°C)"}
          />
        </FormControl>
      </div>

      <div style={{ float: "left", width: "25%", marginBottom: "2rem" }}>
        <FormControl className={classes.textField0} variant="outlined">
          <MuiPickersUtilsProvider
            utils={DateFnsUtils}
            className={classes.datePickerText}
          >
            <KeyboardTimePicker
              classes={{ root: classes.datePickerText2 }}
              variant="outline"
              margin="normal"
              id="date-picker-inline"
              label="Time (From)"
              minutesStep={15}
              value={props.onlineGraphProp.from}
              onChange={(e) => handleChangeTimeFrom(e)}
              KeyboardButtonProps={{
                "aria-label": "change time",
              }}
            />
          </MuiPickersUtilsProvider>
        </FormControl>
      </div>

      <div style={{ float: "left", width: "25%", marginBottom: "2rem" }}>
        <FormControl className={classes.textField0} variant="outlined">
          <MuiPickersUtilsProvider
            utils={DateFnsUtils}
            className={classes.datePickerText}
          >
            <KeyboardTimePicker
              classes={{ root: classes.datePickerText2 }}
              variant="outline"
              margin="normal"
              id="date-picker-inline"
              label="Time (To)"
              value={props.onlineGraphProp.to}
              onChange={(e) => handleChangeTimeTo(e)}
              KeyboardButtonProps={{
                "aria-label": "change time",
              }}
            />
          </MuiPickersUtilsProvider>
        </FormControl>
      </div>

      <div style={{ float: "right", width: "25%", marginBottom: "2rem" }}>
        <FormControl variant="outlined" className={classes.textField0}>
          <InputLabel
            id="demo-simple-select-outlined-label"
            classes={{ root: classes.textField1, shrink: classes.textField3 }}
          >
            Control Approach
          </InputLabel>
          <Select
            classes={{ root: classes.selectField2 }}
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={props.onlineGraphProp.type}
            onChange={handleChangeGraphType}
            label="Control Approach"
          >
            <MenuItem value={"manual"}>Pre-Specified Setpoint</MenuItem>
            <MenuItem value={"MPC"}>Model Predictive Control</MenuItem>
            <MenuItem value={"DRL"}>DRL-based Control</MenuItem>
            <MenuItem value={"DRLMPCManual"}>Compare All</MenuItem>
          </Select>
        </FormControl>
        <Button
          onClick={(e) => {
            handlePlotOnlineGraphs(e);
          }}
          style={{
            fontSize: "0.85vw",
            height: "2.9vw",
            width: "95.2%",
            marginTop: "1.5vh",
          }}
          size="large"
          variant="contained"
          color="primary"
          fullWidth
          // classes={{ root: classes.loginButton }}
          // onClick={() => handleChangePassword_Step2(
          //   emailPassChange,
          //   setIsLoading,
          //   setError)}
        >
          Set Value
        </Button>
      </div>
    </div>
  );
};

export default FormTrain;
