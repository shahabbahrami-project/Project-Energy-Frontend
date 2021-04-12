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
import update from "./update.svg";

const FormUpdateSite = (props) => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(new Date('2020-12-31T21:11:54'));
  const handleDateChange = (date) => {
    setSelectedDate(date);
    // const dateNew = {...props.addSite, features: {...props.addSite.features, lastVisit: date.toDateString()}};
    // props.addSiteSet(dateNew);
  };
  // const [water, setWater] = React.useState('');
  // const [well, setWell] = React.useState('');
  // const [lat, setLat] = React.useState('');
  // const [long, setLong] = React.useState('');

  const handleChangesensorOrmeter = (event) => {
    const sensemeter = {...props.clickedSite,  sensorOrmeter: event.target.value};
    props.setClickedSite(sensemeter);
  };

  const handleChangeWellSurface = (event) => {
    const wellSurface = {...props.clickedSite,  wellOrSurface: event.target.value};
    props.setClickedSite(wellSurface);
  };

  const handleChangeLat = (event) => {
    const latNew = {...props.clickedSite, locationY: event.target.value};
     props.setClickedSite(latNew);
  };

  const handleChangeLong = (event) => {
    const longNew = {...props.clickedSite, locationX: event.target.value};
    props.setClickedSite(longNew);
  };

  const handleChangeSiteName = (event) => {
    const nameNew = {...props.clickedSite, name: event.target.value};
    props.setClickedSite(nameNew);

  };

  const handleChangeBuilding = (event) => {
    const builNew = {...props.clickedSite,  building: event.target.value};
    props.setClickedSite(builNew);
  };
  return (
    <div className={classes.formDivStyle}>
      <div className={classes.containerstyle}>
        <div className={classes.textFieldFormStyle}>
          <TextField
            id="Lat"
            variant="outlined"
            InputProps={{
              classes: {
                root:classes.rootText,
                underline: classes.textFieldUnderline,
                input: classes.textField,
              },
            }}
            value={props.clickedSite.locationY}
            onChange={handleChangeLat}
            margin="normal"
            label={"Latitude"}
            InputLabelProps={{
              ...({shrink:true})
            }}
            type="text"
            fullWidth
          />
        </div>
        <div className={classes.textFieldFormStyle}>
          <TextField
            id="Long"
            variant="outlined"
            InputProps={{
              classes: {
                root:classes.rootText,
                underline: classes.textFieldUnderline,
                input: classes.textField,
              },
            }}
            value={props.clickedSite.locationX}
            onChange={handleChangeLong}
            margin="normal"
            label={"Longitude"}
            InputLabelProps={{
              ...({shrink:true})
            }}
            type="text"
            fullWidth
          />
        </div>
      </div>

      <div style={{float:'left', width:'22%', marginBottom:'2rem'}}>
        <div className={classes.textFieldFormStyle}>
          <TextField
            id="Name"
            variant="outlined"
            InputProps={{
              classes: {
                root:classes.rootText,
                underline: classes.textFieldUnderline,
                input: classes.textField,
              },
            }}

            value={props.clickedSite.name}
            onChange={handleChangeSiteName}
            margin="normal"
            label={"Name or Reference"}
            InputLabelProps={{
              ...({shrink:true})
            }}
            type="text"
            fullWidth
          />
        </div>
        <div className={classes.textFieldFormStyle}>
          <TextField
            id="Lat"
            variant="outlined"
            InputProps={{
              classes: {
                root:classes.rootText,
                underline: classes.textFieldUnderline,
                input: classes.textField,
              },
            }}
            value={props.clickedSite.building}
            onChange={handleChangeBuilding}
            margin="normal"
            label={"Building"}
            InputLabelProps={{
              ...({shrink:true})
            }}
            type="text"
            fullWidth
          />
        </div>
      </div>

      <div style={{float:'left', width:'22%' , marginBottom:'2rem'}}>
        <div className={classes.textFieldFormStyle}   >
          <FormControl variant="outlined" className={classes.formControl}  >
            <InputLabel id="demo-simple-select-outlined-label"  >Sensor or Smart Meter</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={props.clickedSite.sensorOrmeter}
              onChange={handleChangesensorOrmeter}
              label="Water or Waste"
            >

              <MenuItem value={"Sensor"}>Sensor</MenuItem>
              <MenuItem value={"Meter"}>Smart Meter</MenuItem>
            </Select>
          </FormControl>
        </div>
        {/* <div className={classes.textFieldFormStyle}   >
          <FormControl variant="outlined" className={classes.formControl}  >
            <InputLabel id="demo-simple-select-outlined-label"  >Well or Surface</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={props.clickedSite.wellOrSurface}
              onChange={handleChangeWellSurface}
              label="Well or Surface"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"Well"}>Well</MenuItem>
              <MenuItem value={"Surface"}>Surface</MenuItem>
            </Select>
          </FormControl>
        </div> */}
      </div>
      <div style={{float:'left', width:'22%' , marginBottom:'2rem', }}>
      <img src={update} alt="logo" style={{height:'17.5rem', marginLeft:'2rem', marginTop:'-3rem', marginBottom:'-3rem'}} />
      </div>
    </div>
  );
};

export default FormUpdateSite;