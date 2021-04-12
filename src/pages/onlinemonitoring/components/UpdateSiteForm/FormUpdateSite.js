import React, { useState } from "react";
import {TextField } from "@material-ui/core";
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
import Divider from '@material-ui/core/Divider';
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


  const Departments=[
    "AERL_316",
    "Allard_482",
    "Alumni_797",
    "Angus_023",
    "Anthro_Socio_048",
    "Aquatic_Centre_213_Elec",
    "Asian_046_1",
    "Asian_046_2",
    "BRC_461",
    "Baseball_862",
    "Beaty_314",
    "Bio_South_068",
    "Bio_West_065",
    "Bookstore_NCE_081",
    "Brimacombe_020_1",
    "Brimacombe_020_2",
    "Brock_Hall_112",
    "Buchanan_ABC_121",
    "Buchanan_DE_122",
    "Buchanan_Twr_120",
    "CBH_465",
    "CCM_057",
    "CEME_306",
    "CEME_Labs_307",
    "CIRS_633",
    "Chan_130_1",
    "Chan_130_2",
    "Chan_Gunn_438",
    "Chem_bio_eng_300",
    "Chem_centre_132",
    "Chem_east_144",
    "Chem_north_136",
    "Chem_phys_447",
    "Chem_south_148",
    "Choi_478",
    "Cunningham_624",
    "David_Lam_490",
    "Doug_Mitchell_868",
    "EDC_WWW_301",
    "EOS_Main_402",
    "ESB_225",
    "Exchange_773_Elec",
    "FNH_449",
    "First_Nations_337",
    "Forest_353_1",
    "Forest_353_2",
    "Forward_562",
    "Freddy_wood_376",
    "Freidman_523",
    "Geography_401",
    "Hennings_652",
    "ICICS_165",
    "ICICS_Addn_166",
    "IKBLC_516",
    "IRC_473",
    "Jack_bell_750",
    "Kaiser_313",
    "Kenny_732",
    "Klinck_308_1",
    "Klinck_308_2",
    "Koerner_Lib_515",
    "LMRS_022",
    "Lasserre_028",
    "Life_529_A",
    "Life_529_B",
    "Life_529_C",
    "Liu_496",
    "MOA_570",
    "MacDonald_198",
    "MacMillan_386",
    "Macleod_312",
    "Math_518",
    "Medical_C_523",
    "Michael_Smith_083",
    "Music_575",
    "NSDC_UBC",
    "NSDC_WFC",
    "NSUB_795",
    "Orchard_557",
    "Osborne_431",
    "Pharmacy_527_TX-DCA",
    "Pharmacy_527_TX-DCB",
    "Pharmacy_527_TX-PA",
    "Pharmacy_527_TX-PB",
    "Ponderosa_East_903",
    "Ponderosa_North_905",
    "Ponderosa_West_904",
    "Pulp_paper_747",
    "Ritsumeikan_745",
    "SPPH_513",
    "SRC_774",
    "SUB_790",
    "Scarfe_232",
    "Sing_Tao_212",
    "Strangway_199",
    "Swing_901",
    "Tall_Wood_114",
    "Thea_Koerner_408",
    "Totem_Infill_II_541_ELEC",
    "USB_641",
    "Uni_Ctr_344",
    "WLIB_536",
    "War_Mem_Gym_428",
    "Wesbrook_864"
  ]

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
    const NewDept = {...props.filterDept, department:event.target.value};
    props.setFilterDept(NewDept);

  };

  const handleChangeBuilding = (event) => {
    const builNew = {...props.clickedSite,  building: event.target.value};
    props.setClickedSite(builNew);

  };

  const handleDateChangeFrom = (date) => {
    const dateformat=date.toISOString();
    const DateFromNew = {...props.filterDept, startdate:dateformat};
    props.setFilterDept(DateFromNew);
  };

  const handleDateChangeTo = (date) => {
    const dateformat=date.toISOString();
    const DateToNew = {...props.filterDept, enddate: dateformat};
    props.setFilterDept(DateToNew);
  };

  const handleChangeDepartment = (event) => {
    const NewDept = {...props.filterDept, department:event.target.value};
    props.setFilterDept(NewDept);
  };
  const handleChangeSubject = (event) => {
    const NewSub = {...props.filterDept, subject:event.target.value};
    props.setFilterDept(NewSub);
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
        <div className={classes.textFieldFormStyle}   >
          <FormControl variant="outlined" className={classes.formControl}  >
            <InputLabel id="demo-simple-select-outlined-label"  >Sensor or Smart Meter</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={props.clickedSite.sensorOrmeter}
              onChange={handleChangesensorOrmeter}
              label="Sensor or Smart Meter"
            >

              <MenuItem value={"Sensor"}>Sensor</MenuItem>
              <MenuItem value={"Meter"}>Smart Meter</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      <div style={{float:'left', width:'22%' , marginBottom:'2rem'}}>
      {/* <div className={classes.textFieldFormStyle}   >
          <FormControl variant="outlined" className={classes.formControl}  >
            <InputLabel id="department"  >Department</InputLabel>
            <Select

              labelId="select department"
              id="select department"
              value={props.filterDept.department}
              onChange={handleChangeDepartment}
              label="Department"
            >
              {
              Departments.map(item=><MenuItem value={item}>{item}</MenuItem>)
              }
            </Select>
          </FormControl>
        </div> */}

        <div className={classes.textFieldFormStyle}   >
          <FormControl variant="outlined" className={classes.formControl}  >
            <InputLabel  id="Subject"  >Power or Energy or Water</InputLabel>
            <Select

              labelId="select subject"
              id="select subject"
              value={props.filterDept.subject}
              onChange={handleChangeSubject}
              label="Power or Energy or Water"
            >
              <MenuItem value={"elec_power"}>Electric Power</MenuItem>
              <MenuItem value={"elec_energy"}>Electric Energy</MenuItem>
              <MenuItem value={"water_volume"}>Water</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className={classes.textFieldFormStyle} style={{marginTop:'-0.3rem'}}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="outline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="From"
            value={props.filterDept.startdate}
            onChange={handleDateChangeFrom}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          </MuiPickersUtilsProvider>
        </div>
        <div className={classes.textFieldFormStyle} style={{marginTop:'-0.3rem'}}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="outline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="To"
            value={props.filterDept.enddate}
            onChange={handleDateChangeTo}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          </MuiPickersUtilsProvider>
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
      <img src={update} alt="logo" style={{height:'19rem', marginLeft:'2rem', marginTop:'-1rem', marginBottom:'-3rem'}} />
      </div>
  
    </div>



    
    
  );
};

export default FormUpdateSite;