import React from "react";
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
const Form = (props) => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(new Date('2020-12-31T21:11:54'));
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [water, setWater] = React.useState('');

  const handleChange = (event) => {
    setWater(event.target.value);
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

            value={props.lat}

            // error={passwordLoginBool}
            onChange={e => props.latSet(e.target.value)}
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
            value={props.long}

            // error={passwordLoginBool}
            onChange={e => props.longSet(e.target.value)}
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
            value={props.long}

            // error={passwordLoginBool}
            onChange={e => props.longSet(e.target.value)}
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
              value={water}
              onChange={handleChange}
              label="Water or Waste"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"Water"}>Well</MenuItem>
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
              value={water}
              onChange={handleChange}
              label="Well or Surface"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"Well"}>Well</MenuItem>
              <MenuItem value={"Surface"}>Waste</MenuItem>

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

export default Form;