import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { toast } from "react-toastify";
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
import { sensorsdata } from "../../../../../api/api_devices_energy";




const FormHistory = (props) => {
  const classes = useStyles();


  // const [historyGraph, setHistoryGraph] = useState({
  //   period: null,
  //   type: null,
  // });

  const handlePlotHistoricalGraphs= (e) => {
    props.setHistoryGraphSelect(true);
    // props.setHistoryGraphProp(historyGraph);
    sensorsdata(props.historyGraphProp, (isOk, data) => {
      if (!isOk) {
        return toast.error("Server is not responding for graphs!");
      }
      else {
        toast.success("Data Received for Graphs!");
        console.log('alldata', data)
        props.setSensorData(data)
        props.updateData([data[0]])
        console.log('sensordata',props.sensorData)
        console.log('time', new Date(new Date(data[0][0].time).getTime()- new Date().getTimezoneOffset()*60000))
      }
    })
  }
  

  const handleChangeTimePeriod = (event) => {
    const periodnew = { ...props.historyGraphProp, period: event.target.value };
    props.setHistoryGraphProp(periodnew);
  };
  const handleChangeGraphType = (event) => {
    const typenew = { ...props.historyGraphProp, type: event.target.value };
    props.setHistoryGraphProp(typenew);
  };


  return (

    <div className={classes.formDivStyle}>
      <div className={classes.containerstyle}>

      <FormControl variant="outlined" className={classes.textField0}  >
          <InputLabel id="demo-simple-select-outlined-label" classes={{ root: classes.textField1, shrink: classes.textField3 }} >Time Period</InputLabel>
          <Select
            classes={{ root: classes.selectField2 }}
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={props.historyGraphProp.period}
            onChange={handleChangeTimePeriod}
            label="Time Period"
          >
            <MenuItem value={"1 Day"}>1 Day</MenuItem>
            <MenuItem value={"1 Week"}>1 Week</MenuItem>
            <MenuItem value={"1 Month"}>1 Month</MenuItem>
            <MenuItem value={"3 Months"}>3 Months</MenuItem>
            <MenuItem value={"6 Months"}>6 Months</MenuItem>
            <MenuItem value={"1 Year"}>1 Year</MenuItem>
          </Select>
        </FormControl>

      </div>


      <div style={{ float: 'left', width: '50%', marginBottom: '2rem' }}>


      <FormControl variant="outlined" className={classes.textField0}  >
          <InputLabel id="demo-simple-select-outlined-label" classes={{ root: classes.textField1, shrink: classes.textField3 }} >Graph Properties</InputLabel>
          <Select
            classes={{ root: classes.selectField2 }}
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={props.historyGraphProp.type}
            onChange={handleChangeGraphType}
            label="Graph Properties"
          >
            <MenuItem value={"History"}>Only Historical Data</MenuItem>
            <MenuItem value={"MA"}>Historical Data with Moving Average</MenuItem>
            <MenuItem value={"Forecast"}>Historical Data with Forecasting</MenuItem>

          </Select>
        </FormControl>

      </div>







      <div style={{ float: 'right', width: '25%', marginBottom: '2rem' }}>


        <Button
          onClick={(e) => {
            handlePlotHistoricalGraphs(e)
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
          Plot Charts
        </Button>


      </div>





    </div>
  );
};

export default FormHistory;