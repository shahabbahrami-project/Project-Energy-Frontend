import React, { useState, useEffect } from "react";
import useStyles from "./styles";

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import search from "./search.svg";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import {
  Button,
} from "@material-ui/core";
// import { addReport } from "../../../../../api/api_sites";
import { toast } from "react-toastify";
import reportPic from "./report.svg";
import Divider from '@material-ui/core/Divider';
import { getSensorsBySiteId, updateSensorValue } from "../../../../api/api_sensors";



const FormSensor = (props) => {
  const classes = useStyles();

  const [sensorUpdateDataTmp, setSensorUpdateDataTmp] = useState({
    actionDate: null,
    actionTime: null,
    value: null,
    sensorCode: null
  });

  const handleDateChange = (date) => {
    try {
      const dateformat = date.toISOString();
      const DateFromNew = { ...sensorUpdateDataTmp, actionDate: dateformat };
      setSensorUpdateDataTmp(DateFromNew);
    }
    catch (err) {
      const DateFromNew = { ...sensorUpdateDataTmp, actionDate: null };
      setSensorUpdateDataTmp(DateFromNew);
    }
  };


  const handleTimeChange = (date) => {
    try {
      const dateformat = date.toISOString();
      const DateFromNew = { ...sensorUpdateDataTmp, actionTime: dateformat };
      setSensorUpdateDataTmp(DateFromNew);
    }
    catch (err) {
      const DateFromNew = { ...sensorUpdateDataTmp, actionTime: null };
      setSensorUpdateDataTmp(DateFromNew);
    }
  };

  const handleChangeValue = (event, sensorCode) => {
    const NewValue = { ...sensorUpdateDataTmp, value: Number(event.target.value), sensorCode: sensorCode };
    setSensorUpdateDataTmp(NewValue);
  };

  // const handleChangeValue = (event, sensorCode) => {
  //   const New = { ...props.sensorDataUpdate, sensors:[{sensorCode:sensorCode, sensorValue:Number(event.target.value)}]};
  //   props.setSensorDataUpdate(New);
  // };


  const handleSubmitSensorValue = (e) => {
    const NewSensorValue = { ...props.sensorDataUpdate, reportDateTime: sensorUpdateDataTmp.actionDate.split("T")[0] + "T" + sensorUpdateDataTmp.actionTime.split("T")[1], sensors: [{ sensorCode: sensorUpdateDataTmp.sensorCode, sensorValue: sensorUpdateDataTmp.value }] };
    props.setSensorDataUpdate(NewSensorValue)
    updateSensorValue(NewSensorValue, (isOk, data) => {
      if (!isOk) {
        return toast.error("Check format of sensor value! Write a numerical value only!");
      } else {

        getSensorsBySiteId(props.site.id, (isOk, data) => {
          if (!isOk) {
            return toast.error("Could not update sensors list!");
          } else {
            if (data) {
              props.setSensors(data);
            }
            else {
              return toast.error("No sensors found for this site!");
            }
          }
        })
        return toast.success("New value is set");
      }
    });
  }

  return (

    <div className={classes.formDivStyle}>
      <div className={classes.containerstyle}>

        <FormControl className={classes.textField0} variant="outlined">
          <InputLabel htmlFor="subject" classes={{ root: classes.textField1, shrink: classes.textField3 }} >Value (ppm)</InputLabel>
          <OutlinedInput
            classes={{ root: classes.textField2 }}
            id="outlined-adornment-Subject"
            type={'text'}
            // value={props.sensorDataUpdate.sensors[0].sensorValue}
            value={sensorUpdateDataTmp.value}
            onChange={e => handleChangeValue(e, props.sensorDataUpdate.sensors[0].sensorCode)}
            label={"Value (ppm)"}

          />
        </FormControl>


      </div>


      <div style={{ float: 'left', width: '25%', marginBottom: '2rem' }}>

        <FormControl className={classes.textField0} variant="outlined">
          <MuiPickersUtilsProvider utils={DateFnsUtils} className={classes.datePickerText}>
            <KeyboardDatePicker
              classes={{ root: classes.datePickerText2 }}

              variant="outline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date"
              value={sensorUpdateDataTmp.actionDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </FormControl>



      </div>





      <div style={{ float: 'left', width: '25%', marginBottom: '2rem' }}>
        <FormControl className={classes.textField0} variant="outlined">
          <MuiPickersUtilsProvider utils={DateFnsUtils} className={classes.datePickerText}>
            <KeyboardTimePicker
              classes={{ root: classes.datePickerText2 }}
              variant="outline"
              margin="normal"
              id="date-picker-inline"
              label="Time"
              value={sensorUpdateDataTmp.actionTime}
              onChange={handleTimeChange}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </MuiPickersUtilsProvider>
        </FormControl>

      </div>



      <div style={{ float: 'right', width: '25%', marginBottom: '2rem' }}>


        <Button
          onClick={(e) => {
            handleSubmitSensorValue(e)
          }
          }
          style={{ fontSize: '0.85vw', height: '2.9vw', width: '95.2%', marginTop: '1.5vh' }}
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

export default FormSensor;