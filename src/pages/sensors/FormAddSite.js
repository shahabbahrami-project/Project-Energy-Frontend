import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import useStyles from "./styles";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import FloatingActionButtonZoom from "./TabFilter";
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


const FormAddSite = (props) => {
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

  const handleChangeWaterWaste = (event) => {
    const waterWaste = {...props.addSite, features: {...props.addSite.features, waterOrWaste: event.target.value}};
    props.addSiteSet(waterWaste);
    console.log(props.addSite)
  };

  const handleChangeWellSurface = (event) => {
    const wellSurface = {...props.addSite, features: {...props.addSite.features, wellOrSurface: event.target.value}};
    props.addSiteSet(wellSurface);
    console.log(props.addSite)
  };

  const handleChangeLat = (event) => {
    const latNew = {...props.addSite, features: {...props.addSite.features, locationX: event.target.value}};
     props.addSiteSet(latNew);
    console.log(props.addSite)
  };

  const handleChangeLong = (event) => {
    const longNew = {...props.addSite, features: {...props.addSite.features, locationY: event.target.value}};
    props.addSiteSet(longNew);

    console.log(props.addSite)
  };

  const handleChangeSiteName = (event) => {
    const nameNew = {...props.addSite, features: {...props.addSite.features, siteName: event.target.value}};
    props.addSiteSet(nameNew);

    console.log(props.addSite)
  };

  const handleChangeCity = (event) => {
    const cityNew = {...props.addSite, features: {...props.addSite.features, city: event.target.value}};
    props.addSiteSet(cityNew);

    console.log(props.addSite)
  };
  return (

    <div className={classes.formDivStyle}>
      <div style={{float:'left', width:'22%' , marginBottom:'2rem'}}>
        <div className={classes.textFieldFormStyle}>
          <TextField
            id="Lat"
            variant="outlined"
            // error={usernameLoginBool}

            InputProps={{
              classes: {
                root:classes.rootText,
                underline: classes.textFieldUnderline,
                input: classes.textField,
              },
            }}

            value={props.addSite.features.locationX}

            // error={passwordLoginBool}
            onChange={handleChangeLat}
            margin="normal"
            label={"Latitude"}
            InputLabelProps={{
              ...({shrink:true})
            }}
            type="email"
            fullWidth
          />
        </div>
        <div className={classes.textFieldFormStyle}>
          <TextField
            id="Long"
            variant="outlined"
            // error={usernameLoginBool}

            InputProps={{
              classes: {
                root:classes.rootText,
                underline: classes.textFieldUnderline,
                input: classes.textField,
              },
            }}
            value={props.addSite.features.locationY}

            // error={passwordLoginBool}
            onChange={handleChangeLong}
            margin="normal"
            label={"Longitude"}
            InputLabelProps={{
              ...({shrink:true})
            }}
            type="email"
            fullWidth
          />
        </div>
      </div>

      <div style={{float:'left', width:'22%', marginBottom:'2rem'}}>
        <div className={classes.textFieldFormStyle}>
          <TextField
            id="Site Name"
            variant="outlined"
            // error={usernameLoginBool}

            InputProps={{
              classes: {
                root:classes.rootText,
                underline: classes.textFieldUnderline,
                input: classes.textField,
              },
            }}

            value={props.addSite.features.siteName}

            // error={passwordLoginBool}
            onChange={handleChangeSiteName}
            margin="normal"
            label={"Site Name"}
            InputLabelProps={{
              ...({shrink:true})
            }}
            type="email"
            fullWidth
          />
        </div>
        <div className={classes.textFieldFormStyle}>
          <TextField
            id="Lat"
            variant="outlined"
            // error={usernameLoginBool}

            InputProps={{
              classes: {
                root:classes.rootText,
                underline: classes.textFieldUnderline,
                input: classes.textField,
              },
            }}
            value={props.addSite.features.city}

            // error={passwordLoginBool}
            onChange={handleChangeCity}
            margin="normal"
            label={"City"}
            InputLabelProps={{
              ...({shrink:true})
            }}
            type="email"
            fullWidth
          />
        </div>
      </div>

      <div style={{float:'left', width:'22%' , marginBottom:'2rem'}}>
        <div className={classes.textFieldFormStyle}   >
          <FormControl variant="outlined" className={classes.formControl}  >
            <InputLabel id="demo-simple-select-outlined-label"  >Water or Waste</InputLabel>
            <Select

              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={props.addSite.features.waterOrWaste}
              onChange={handleChangeWaterWaste}
              label="Water or Waste"
            >
              <MenuItem value="">
                <em>None</em>
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
        </div>
      </div>
      <div style={{float:'left', width:'22%' , marginBottom:'2rem'}}>
        <div className={classes.textFieldFormStyle}>
          <TextField
            id="Lat"
            variant="outlined"
            // error={usernameLoginBool}

            InputProps={{
              classes: {
                root:classes.rootText,
                underline: classes.textFieldUnderline,
                input: classes.textField,
              },
            }}

            value={props.lat}

            // error={passwordLoginBool}
            onChange={e => props.latSet(e.target.value)}
            margin="normal"
            label={"Status"}
            InputLabelProps={{
              ...({shrink:true})
            }}
            type="email"
            fullWidth
          />
        </div>
        <div className={classes.textFieldFormStyle} style={{marginTop:'-0.3rem'}}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="outline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Last Visit"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
      </div>
    </div>
  );
};

export default FormAddSite;