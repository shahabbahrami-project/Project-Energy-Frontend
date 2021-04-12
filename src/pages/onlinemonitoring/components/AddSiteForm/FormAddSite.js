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
import add from "./add.svg";

const FormAddSite = (props) => {
  const classes = useStyles();
  // const [selectedDate, setSelectedDate] = useState(new Date('2020-12-31T21:11:54'));
  // const [water, setWater] = React.useState('');
  // const [well, setWell] = React.useState('');
  // const [lat, setLat] = React.useState('');
  // const [long, setLong] = React.useState('');

  const handleChangeSensorOrMeter = (event) => {
    const sensemeter = { ...props.addSite, features: { ...props.addSite.features, sensorOrmeter: event.target.value } };
    props.addSiteSet(sensemeter);

  };

  const handleChangeWellSurface = (event) => {
    const wellSurface = { ...props.addSite, features: { ...props.addSite.features, wellOrSurface: event.target.value } };
    props.addSiteSet(wellSurface);

  };

  const handleChangeLat = (event) => {
    const latNew = { ...props.addSite, features: { ...props.addSite.features, locationY: event.target.value } };
    props.addSiteSet(latNew);

  };

  const handleChangeLong = (event) => {
    const longNew = { ...props.addSite, features: { ...props.addSite.features, locationX: event.target.value } };
    props.addSiteSet(longNew);

  };

  const handleChangeSiteName = (event) => {
    const nameNew = { ...props.addSite, features: { ...props.addSite.features, name: event.target.value } };
    props.addSiteSet(nameNew);

  };

  const handleChangeBuilding = (event) => {
    const buildNew = { ...props.addSite, features: { ...props.addSite.features, building: event.target.value } };
    props.addSiteSet(buildNew);

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
                root: classes.rootText,
                underline: classes.textFieldUnderline,
                input: classes.textField,
              },
            }}
            value={props.addSite.features.locationY}
            onChange={handleChangeLat}
            margin="normal"
            label={"Latitude"}
            InputLabelProps={{
              ...({ shrink: true })
            }}
            type="email"
            fullWidth
          />
        </div>
        <div className={classes.textFieldFormStyle}>
          <TextField
            id="Long"
            variant="outlined"
            InputProps={{
              classes: {
                root: classes.rootText,
                underline: classes.textFieldUnderline,
                input: classes.textField,
              },
            }}
            value={props.addSite.features.locationX}
            onChange={handleChangeLong}
            margin="normal"
            label={"Longitude"}
            InputLabelProps={{
              ...({ shrink: true })
            }}
            type="email"
            fullWidth
          />
        </div>
      </div>

      <div style={{ float: 'left', width: '22%', marginBottom: '2rem' }}>
        <div className={classes.textFieldFormStyle}>
          <TextField
            id="Name"
            variant="outlined"
            InputProps={{
              classes: {
                root: classes.rootText,
                underline: classes.textFieldUnderline,
                input: classes.textField,
              },
            }}

            value={props.addSite.features.name}
            onChange={handleChangeSiteName}
            margin="normal"
            label={"Name or Reference"}
            InputLabelProps={{
              ...({ shrink: true })
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
                root: classes.rootText,
                underline: classes.textFieldUnderline,
                input: classes.textField,
              },
            }}
            value={props.addSite.features.building}
            onChange={handleChangeBuilding}
            margin="normal"
            label={"Building"}
            InputLabelProps={{
              ...({ shrink: true })
            }}
            type="text"
            fullWidth
          />
        </div>
      </div>

      <div style={{ float: 'left', width: '22%', marginBottom: '2rem' }}>
        <div className={classes.textFieldFormStyle}   >
          <FormControl variant="outlined" className={classes.formControl}  >
            <InputLabel id="demo-simple-select-outlined-label"  >Sensor or Smart Meter</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={props.addSite.features.sensorOrmeter}
              onChange={handleChangeSensorOrMeter}
              label="Sensor or Smart Meter"
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
              value={props.addSite.features.wellOrSurface}
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
      <div style={{ float: 'left', width: '22%', marginBottom: '2rem', }}>
        <img src={add} alt="logo" style={{ height: '17.5rem', marginLeft: '2rem', marginTop: '-3rem', marginBottom: '-3rem' }} />
      </div>
    </div>
  );
};

export default FormAddSite;