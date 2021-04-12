import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import useStyles from "../styles";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import search from "./search.svg";








const Form = (props) => {
  // var dateFormat = require("dateformat");
  const classes = useStyles();
  const handleDateChangeFrom = (date) => {
    const dateformat = date.toISOString();
    const DateFromNew = { ...props.filterSite, VisitFrom: dateformat };
    props.setFilterSite(DateFromNew);
  };


  const handleDateChangeTo = (date) => {
    const dateformat = date.toISOString();
    const DateToNew = { ...props.filterSite, VisitTo: dateformat };
    props.setFilterSite(DateToNew);
  };



  const handleChangeName = (event) => {
    const NameNew = { ...props.filterSite, siteName: event.target.value };
    props.setFilterSite(NameNew);
  };

  const handleChangeCity = (event) => {
    const CityNew = { ...props.filterSite, city: event.target.value };
    props.setFilterSite(CityNew);
  };

  const handleChangeWellorSurface = (event) => {
    const wellOrSurfaceNew = { ...props.filterSite, wellOrSurface: event.target.value };
    props.setFilterSite(wellOrSurfaceNew);
  };

  const handleChangeWaterorWaste = (event) => {
    const waterOrWasteNew = { ...props.filterSite, waterOrWaste: event.target.value };
    props.setFilterSite(waterOrWasteNew);
  };

  const handleChangeStatus = (event) => {
    const statusNew = { ...props.filterSite, status: [event.target.value] };
    props.setFilterSite(statusNew);
  };


  return (

    <div className={classes.formDivStyle}>
      <div style={{ float: 'left', width: '22%', marginBottom: '2rem' }}>
        <div className={classes.textFieldFormStyle}>
          <TextField
            id="SiteName"
            variant="outlined"
            // error={usernameLoginBool}
            InputProps={{
              classes: {
                root: classes.rootText,
                underline: classes.textFieldUnderline,
                input: classes.textField,
              },
            }}
            value={props.filterSite.siteName}
            onChange={handleChangeName}
            margin="normal"
            label={"Site Name"}
            InputLabelProps={{
              ...({ shrink: true })
            }}
            fullWidth
          />
        </div>
        <div className={classes.textFieldFormStyle}>
          <TextField
            id="City"
            variant="outlined"
            // error={usernameLoginBool}

            InputProps={{
              classes: {
                root: classes.rootText,
                underline: classes.textFieldUnderline,
                input: classes.textField,
              },
            }}
            value={props.filterSite.city}
            // error={passwordLoginBool}
            onChange={handleChangeCity}
            margin="normal"
            label={"City"}
            InputLabelProps={{
              ...({ shrink: true })
            }}
            type="email"
            fullWidth
          />
        </div>
        <div className={classes.textFieldFormStyle} style={{ marginTop: '-0.3rem' }}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="outline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Last Visit (From)"
              value={props.filterSite.VisitFrom}
              onChange={handleDateChangeFrom}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
      </div>

      <div style={{ float: 'left', width: '22%', marginBottom: '2rem' }}>
        <div className={classes.textFieldFormStyle}   >
          <FormControl variant="outlined" className={classes.formControl}  >
            <InputLabel id="demo-simple-select-outlined-label"  >Water or Waste</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={props.filterSite.waterOrWaste}
              onChange={handleChangeWaterorWaste}
              label="Water or Waste"
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              <MenuItem value={"Water"}>Water</MenuItem>
              <MenuItem value={"Waste"}>Waste</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={classes.textFieldFormStyle}   >
          <FormControl variant="outlined" className={classes.formControl}  >
            <InputLabel id="demo-simple-select-outlined-label"  >Well or Surface</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={props.filterSite.wellOrSurface}
              onChange={handleChangeWellorSurface}
              label="Well or Surface"
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              <MenuItem value={"Well"}>Well</MenuItem>
              <MenuItem value={"Surface"}>Surface</MenuItem>

            </Select>
          </FormControl>
        </div>

        <div className={classes.textFieldFormStyle} style={{ marginTop: '-0.3rem' }}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="outline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Last Visit (To)"
              value={props.filterSite.VisitTo}
              onChange={handleDateChangeTo}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
      </div>

      <div style={{ float: 'left', width: '22%', marginBottom: '2rem' }}>

        <div className={classes.textFieldFormStyle}   >
          <FormControl variant="outlined" className={classes.formControl}  >
            <InputLabel id="demo-simple-select-outlined-label"  >Status</InputLabel>
            <Select

              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={props.filterSite.status}
              onChange={handleChangeStatus}
              label="Status"
            >
              <MenuItem value={0}>
                <em>0</em>
              </MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>

            </Select>
          </FormControl>
        </div>
        <div className={classes.textFieldFormStyle}   >

        </div>
      </div>
      <div style={{ float: 'left', width: '22%', marginBottom: '2rem', }}>
        <img src={search} alt="logo" style={{ height: '18.5rem', marginLeft: '1rem', marginBottom: '-5rem' }} />
      </div>
    </div>
  );
};

export default Form;