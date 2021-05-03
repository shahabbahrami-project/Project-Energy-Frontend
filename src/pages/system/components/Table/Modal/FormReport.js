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
import { addReport } from "../../../../../api/api_sites";
import { toast } from "react-toastify";
import reportPic from "./report.svg";
import Divider from '@material-ui/core/Divider';



const FormReport = (props) => {
  const classes = useStyles();

  const [reportInputs2, setReportInputs2] = useState({
    siteId: "",
    alertId: "",
    subject: "",
    action: "",
    addedAmount: null,
    actionDate: null,
    actionTime: null,
    MTime: null,
    MTimeMin: null,
    cost: "",
  });

  const handleDateChange = (date) => {
    try {
      const dateformat = date.toISOString();
      const DateFromNew = { ...reportInputs2, actionDate: dateformat };
      setReportInputs2(DateFromNew);
    }
    catch (err) {
      const DateFromNew = { ...reportInputs2, actionDate: null };
      setReportInputs2(DateFromNew);
    }
  };


  const handleTimeChange = (date) => {
    try {
      const dateformat = date.toISOString();
      const DateFromNew = { ...reportInputs2, actionTime: dateformat };
      setReportInputs2(DateFromNew);
    }
    catch (err) {
      const DateFromNew = { ...reportInputs2, actionTime: null };
      setReportInputs2(DateFromNew);
    }
  };
  const handleChangeAdd = (event) => {
    const addNew = { ...reportInputs2, addedAmount: event.target.value };
    setReportInputs2(addNew);
  };

  const handleChangeAction = (event) => {
    const actionNew = { ...reportInputs2, action: event.target.value };
    setReportInputs2(actionNew);
  };
  const handleChangeMTime = (event) => {
    let value = parseInt(String(event.target.value).replace(/^[0|\D]*/, ''), 10);
    const MTimeNew = { ...reportInputs2, MTime: value };
    console.log(MTimeNew)
    setReportInputs2(MTimeNew);
  };
  const handleChangeMTimeMin = (event) => {

    let value = parseInt(String(event.target.value).replace(/^[0|\D]*/, ''), 10);
    if (value > 60) {
      value = 60
    }
    const MTimeminNew = { ...reportInputs2, MTimeMin: value };
    console.log(MTimeminNew)
    setReportInputs2(MTimeminNew);
  };
  const handleChangeCost = (event) => {
    const costNew = { ...reportInputs2, cost: event.target.value };
    setReportInputs2(costNew);
  };


  const handleSubmitReport = (e) => {
    // console.log(reportInputs2.actionDate.split("T")[0])
    // console.log(reportInputs2.actionTime.split("T")[1])
    // console.log(reportInputs2.actionDate.split("T")[0]+"T"+reportInputs2.actionTime.split("T")[1])
    let Hour = "0"
    let Min = "0"
    if (reportInputs2.MTime == null) {
      Hour = "0"
    }
    else {
      Hour = String(reportInputs2.MTime)
    }
    if (reportInputs2.MTimeMin == null) {
      Min = "0"
    }
    else {
      Min = String(reportInputs2.MTimeMin)
    }
    const reportNew = { ...props.reportInputs, subject: reportInputs2.subject, action: reportInputs2.action, actionDateTime: reportInputs2.actionDate.split("T")[0] + "T" + reportInputs2.actionTime.split("T")[1], maintenanceTime: Hour + ":" + Min, cost: parseFloat(reportInputs2.cost) };
    props.setReportInputs(reportNew);
    addReport(reportNew, (isOk, data) => {
      if (!isOk) {
        // return toast.error("Server is not responding!");
        return toast.error("could not send report!!!!!!");
      } else {
        return toast.success("Report is added");



      }
    });
  }

  return (

    <div className={classes.formDivStyle}>
      <div className={classes.containerstyle}>

        {/* <FormControl className={classes.textField0} variant="outlined">
          <InputLabel htmlFor="subject" classes={{ root: classes.textField1, shrink: classes.textField3 }} >Subject</InputLabel>
          <OutlinedInput
            classes={{ root: classes.textField2 }}
            id="outlined-adornment-Subject"
            type={'text'}
            value={reportInputs2.subject}

            onChange={handleChangeSubject}
            label={"Subject"}

          />
        </FormControl> */}

        <FormControl variant="outlined" className={classes.textField0}  >
          <InputLabel id="demo-simple-select-outlined-label" classes={{ root: classes.textField1, shrink: classes.textField3 }}>Action</InputLabel>
          <Select
            classes={{ root: classes.selectField2 }}
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={reportInputs2.action}
            type={'text'}
            onChange={handleChangeAction}
            label="Action"
          >
            <MenuItem value="fixed">
              Fixed
            </MenuItem>
            <MenuItem value={"replaced"}>Replaced</MenuItem>
            <MenuItem value={"Refilled"}>Refilled</MenuItem>
          </Select>
        </FormControl>
        <img src={reportPic} alt="logo" style={{ height: '14vw', marginLeft: '6vw', marginBottom: '-3vw' }} />


      </div>

      <div style={{ float: 'left', width: '25%', marginBottom: '2rem' }}>
        <FormControl className={classes.textField0} variant="outlined">
          <InputLabel htmlFor="add" classes={{ root: classes.textField1, shrink: classes.textField3 }} >Amount (Liter)</InputLabel>
          <OutlinedInput
            classes={{ root: classes.textField2 }}
            id="outlined-adornment-Add"
            type={'text'}
            value={reportInputs2.addedAmount}
            disabled={reportInputs2.action == "Refilled" ? false : true}
            onChange={handleChangeAdd}
            label={"Amount (Liter)"}

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
              value={reportInputs2.actionDate}
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
              value={reportInputs2.actionTime}
              onChange={handleTimeChange}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </MuiPickersUtilsProvider>
        </FormControl>

        <FormControl className={classes.textField0} variant="outlined">
          <InputLabel htmlFor="time" classes={{ root: classes.textField1, shrink: classes.textField3 }} >Maintenance Time (Hours)</InputLabel>
          <OutlinedInput
            classes={{ root: classes.textField2 }}
            id="outlined-adornment-MtimeHour"
            type={'number'}
            value={reportInputs2.MTime}

            onChange={handleChangeMTime}
            label={"Maintenance Time (Hours)"}

          />

        </FormControl>
        <FormControl className={classes.textField0} variant="outlined">
          <InputLabel htmlFor="time2" classes={{ root: classes.textField1, shrink: classes.textField3 }} >Maintenance Time (Minutes)</InputLabel>
          <OutlinedInput
            classes={{ root: classes.textField2 }}
            id="outlined-adornment-MtimeMin"
            type={'number'}
            value={reportInputs2.MTimeMin}
            onChange={handleChangeMTimeMin}
            inputProps={{ min: "0", max: "60", step: "1" }}
            label={"Maintenance Time (Minutes)"}

          />
        </FormControl>
        <Divider style={{ marginTop: '2vh', marginBottom: '2vh' }} />
        <FormControl className={classes.textField0} variant="outlined">
          <InputLabel htmlFor="cost" classes={{ root: classes.textField1, shrink: classes.textField3 }} >Cost (CAD)</InputLabel>
          <OutlinedInput
            classes={{ root: classes.textField2 }}
            id="outlined-adornment-Cost"
            type={'text'}
            value={reportInputs2.cost}
            onChange={handleChangeCost}
            label={"Cost (CAD)"}

          />
        </FormControl>

        <Button
          onClick={(e) => {
            handleSubmitReport(e)
          }
          }
          style={{ fontSize: '0.85vw', height: '2.2vw', width: '95.2%', marginTop: '10.5vh' }}
          size="large"
          variant="contained"
          color="primary"
          fullWidth
        >
          Add to Reports
        </Button>


      </div>





    </div>
  );
};

export default FormReport;