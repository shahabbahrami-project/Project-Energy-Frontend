import React from "react";
import useStyles from "./styles";

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import search from "./search.svg";
import OutlinedInput from '@material-ui/core/OutlinedInput';







const FormAlert = (props) => {
  const classes = useStyles();

  const handleDateChangeFrom = (date) => {
    try {
      const dateformat = date.toISOString();
      const DateFromNew = { ...props.alertFilter, AlertFrom: dateformat };
      props.setAlertFilter(DateFromNew);
    }
    catch (err) {
      const DateFromNew = { ...props.alertFilter, AlertFrom: null };
      props.setAlertFilter(DateFromNew);
    }

  };


  const handleDateChangeTo = (date) => {
    try {
      const dateformat = date.toISOString();
      const DateToNew = { ...props.alertFilter, AlertTo: dateformat };
      props.setAlertFilter(DateToNew);
    }
    catch (err) {

      const DateToNew = { ...props.alertFilter, AlertTo: null};
      props.setAlertFilter(DateToNew);
    }

  };






  return (

    <div className={classes.formDivStyle}>
      <div className={classes.containerstyle}>




        {/* <FormControl className={classes.textField0} variant="outlined">
          <InputLabel htmlFor="SiteName" classes={{ root: classes.textField1, shrink: classes.textField3 }} >Site Name</InputLabel>
          <OutlinedInput
            classes={{ root: classes.textField2 }}
            id="outlined-adornment-sitename"
            type={'text'}
            value={props.filterSite.siteName}

            onChange={handleChangeName}
            label={"Site Name"}

          />
        </FormControl>

        <FormControl className={classes.textField0} variant="outlined">
          <InputLabel htmlFor="City" classes={{ root: classes.textField1, shrink: classes.textField3 }} >City</InputLabel>
          <OutlinedInput
            classes={{ root: classes.textField2 }}
            id="outlined-adornment-city"
            type={'text'}
            value={props.filterSite.city}

            onChange={handleChangeCity}
            label={"City"}

          />
        </FormControl> */}


        {/* <FormControl className={classes.textField0} variant="outlined">
          <MuiPickersUtilsProvider utils={DateFnsUtils} className={classes.datePickerText}>
            <KeyboardDatePicker
              classes={{ root: classes.datePickerText2 }}
              disableToolbar
              variant="outline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="From"
              value={props.filterSite.VisitFrom}
              onChange={handleDateChangeFrom}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </FormControl> */}
      </div>

      <div style={{ float: 'left', width: '30%', marginBottom: '-1rem' }}>

        {/* <FormControl variant="outlined" className={classes.textField0}  >
          <InputLabel id="demo-simple-select-outlined-label" classes={{ root: classes.textField1, shrink: classes.textField3 }} >Water or Waste</InputLabel>
          <Select
            classes={{ root: classes.selectField2 }}
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={props.filterSite.waterOrWaste}
            onChange={handleChangeWaterorWaste}
            label="Water or Waste"
          >
            <MenuItem value="All">
              <em>All</em>
            </MenuItem>
            <MenuItem value={"Water"}>Water</MenuItem>
            <MenuItem value={"Waste"}>Waste</MenuItem>
          </Select>
        </FormControl>


        <FormControl variant="outlined" className={classes.textField0}  >
          <InputLabel id="demo-simple-select-outlined-label" classes={{ root: classes.textField1, shrink: classes.textField3 }} >Well or Surface</InputLabel>
          <Select
            classes={{ root: classes.selectField2 }}
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={props.filterSite.wellOrSurface}
            onChange={handleChangeWellorSurface}
            label="Well or Surface"
          >
            <MenuItem value="All">
              <em>All</em>
            </MenuItem>
            <MenuItem value={"Well"}>Well</MenuItem>
            <MenuItem value={"Surface"}>Surface</MenuItem>

          </Select>
        </FormControl> */}
        <FormControl className={classes.textField0} variant="outlined">
          <MuiPickersUtilsProvider utils={DateFnsUtils} className={classes.datePickerText}>
            <KeyboardDatePicker
              classes={{ root: classes.datePickerText2 }}
              disableToolbar
              variant="outline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="From"
              value={props.alertFilter.AlertFrom}
              onChange={handleDateChangeFrom}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </FormControl>

      </div>

      <div style={{ float: 'left', width: '30%', marginBottom:'-1rem' }}>

        <FormControl className={classes.textField0} variant="outlined">
          <MuiPickersUtilsProvider utils={DateFnsUtils} className={classes.datePickerText}>
            <KeyboardDatePicker
              classes={{ root: classes.datePickerText2 }}
              disableToolbar
              variant="outline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="To"
              value={props.alertFilter.AlertTo}
              onChange={handleDateChangeTo}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </FormControl>

      </div>
      {/* <div style={{ float: 'left', width: '40%', marginBottom: '1vw', }}>
        <img src={search} alt="logo" style={{ height: '18vw', marginLeft: '6vw', marginBottom: '-3vw' }} />
      </div> */}
    </div>
  );
};

export default FormAlert;