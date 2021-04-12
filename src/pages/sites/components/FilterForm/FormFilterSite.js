import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import useStyles from "./styles";

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


import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';





const FormFilterSite = (props) => {
  const classes = useStyles();

  //local states to enhance performance
  const [siteName, setSiteName] = useState()

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
    const NameNew = { ...props.filterSite, name: event.target.value };
    props.setFilterSite(NameNew);
  };

  const handleChangeBuilding = (event) => {
    const BuildingNew = { ...props.filterSite, building: event.target.value };
    props.setFilterSite(BuildingNew);
  };

  const handleChangeWellorSurface = (event) => {
    const wellOrSurfaceNew = { ...props.filterSite, wellOrSurface: event.target.value };
    props.setFilterSite(wellOrSurfaceNew);
  };

  const handleChangeSensorOrMeter = (event) => {
    const sensorOrmeterNew = { ...props.filterSite, sensorOrmeter: event.target.value };
    props.setFilterSite(sensorOrmeterNew);
  };

  const handleChangeStatus = (event) => {
    const statusNew = { ...props.filterSite, status: [event.target.value] };
    props.setFilterSite(statusNew);
  };


  return (

    <div className={classes.formDivStyle}>
      <div className={classes.containerstyle}>
        <div className={classes.textFieldFormStyle}>

          <TextField
            id="SensorName"
            variant="outlined"
            InputProps={{
              classes: {
                root: classes.rootText,
                underline: classes.textFieldUnderline,
                input: classes.textField,
              },
            }}
            value={props.filterSite.name}
            onChange={handleChangeName}
            margin="normal"
            label={"Name or Reference ID"}
            InputLabelProps={{
              ...({ shrink: true })
            }}
            fullWidth
          />

        </div>

        {/* <div className={classes.textFieldFormStyle}>

          <TextField
            id="Building"
            variant="outlined"
            InputProps={{
              classes: {
                root: classes.rootText,
                underline: classes.textFieldUnderline,
                input: classes.textField,
              },
            }}
            value={props.filterSite.city}
            onChange={handleChangeCity}
            margin="normal"
            label={"Building"}
            InputLabelProps={{
              ...({ shrink: true })
            }}
            type="email"
            fullWidth
          />

        </div> */}

        {/* <div className={classes.textFieldFormStyle} style={{ marginTop: '-0.3rem' }}>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="outline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Installation Date (From)"
              value={props.filterSite.VisitFrom}
              onChange={handleDateChangeFrom}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>

        </div> */}

      </div>

      <div style={{ float: 'left', width: '22%', marginBottom: '2rem' }}>
        <div className={classes.textFieldFormStyle}>

          <TextField
            id="Building"
            variant="outlined"
            InputProps={{
              classes: {
                root: classes.rootText,
                underline: classes.textFieldUnderline,
                input: classes.textField,
              },
            }}
            value={props.filterSite.building}
            onChange={handleChangeBuilding}
            margin="normal"
            label={"Building"}
            InputLabelProps={{
              ...({ shrink: true })
            }}
            type="email"
            fullWidth
          />

        </div>
        {/* <div className={classes.textFieldFormStyle}   >
          <FormControl variant="outlined" className={classes.formControl}  >
            <InputLabel id="demo-simple-select-outlined-label"  >Sensor or Smart Meter</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={props.filterSite.waterOrWaste}
              onChange={handleChangeWaterorWaste}
              label="Sensor or Smart Meter"
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              <MenuItem value={"Water"}>Sensor</MenuItem>
              <MenuItem value={"Waste"}>Smart Meter</MenuItem>
            </Select>
          </FormControl>
        </div> */}
        {/* <div className={classes.textFieldFormStyle}   >
          <FormControl variant="outlined" className={classes.formControl}  >
            <InputLabel id="demo-simple-select-outlined-label"  >Active or Deactive</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={props.filterSite.wellOrSurface}
              onChange={handleChangeWellorSurface}
              label="Active or Deactive"
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              <MenuItem value={"Well"}>Active</MenuItem>
              <MenuItem value={"Surface"}>Deactive</MenuItem>

            </Select>
          </FormControl>
        </div>  */}

        {/* <div className={classes.textFieldFormStyle} style={{ marginTop: '-0.3rem' }}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="outline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Installation Date (To)"
              value={props.filterSite.VisitTo}
              onChange={handleDateChangeTo}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </div> */}
      </div>

      <div style={{ float: 'left', width: '22%', marginBottom: '2rem' }}>
      <div className={classes.textFieldFormStyle}   >
          <FormControl variant="outlined" className={classes.formControl}  >
            <InputLabel id="demo-simple-select-outlined-label"  >Sensor or Smart Meter</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={props.filterSite.sensorOrmeter}
              onChange={handleChangeSensorOrMeter}
              label="Sensor or Smart Meter"
            >
              <MenuItem value="All">
                <em>All</em>
              </MenuItem>
              <MenuItem value={"Sensor"}>Sensor</MenuItem>
              <MenuItem value={"Meter"}>Smart Meter</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* <div className={classes.textFieldFormStyle}   >
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
                <em>Any</em>
              </MenuItem>
              <MenuItem value={1}>Green</MenuItem>
              <MenuItem value={2}>Red</MenuItem>
            </Select>
          </FormControl>
        </div> */}
      </div>
      <div style={{ float: 'left', width: '22%', marginBottom: '0rem', marginTop:'-2rem'}}>
        <img src={search} alt="logo" style={{ height: '18.5rem', marginLeft: '1rem', marginBottom: '-5rem' }} />
      </div>
    </div>
  );
};

export default FormFilterSite;