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
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import { filterDepts, getAllDepartments } from "../../../../api/api_sensors";
import { toast } from "react-toastify";
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

const Options=["Power", "Energy", "Water"]


const Form = (props) => {
  const classes = useStyles();

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
  
  // const [selectedDateFrom, setSelectedDateFrom] = React.useState(new Date('2021-01-01T21:11:54'));
  // const handleDateChangeFrom = (date) => {
  //   setSelectedDateFrom(date);
  // };

  // const [selectedDateTo, setSelectedDateTo] = React.useState(new Date('2021-01-05T21:11:54'));
  // const handleDateChangeTo = (date) => {
  //   setSelectedDateTo(date);
  // };

  const handleFilterButton=()=>{
    getAllDepartments((isOk, data) => {
      if (!isOk) {
        return toast.error("Server is not responding!");
      }
      else {
        toast.success("Data Received After Filtering!");
        // props.setDept(data);
        console.log(data)
        // props2.setToggleMapCenter(true)
        // props2.setCenter([data[0].locationX, data[0].locationY])
        // console.log(props.center)
      }
    })

    filterDepts(props.filterDept,(isOk, data) => {
      if (!isOk) {
        return toast.error("Server is not responding!");
      }
      else {
        toast.success("Data Received After Filtering!");
        // props.setDept(data);
        console.log(data)
        // props2.setToggleMapCenter(true)
        // props2.setCenter([data[0].locationX, data[0].locationY])
        // console.log(props.center)
      }
    })

  }



 
    
  return (

     <div className={classes.formDivStyle}>
       
      <div style={{float:'left', width:'22%', marginBottom:'2rem'}}>
        <div className={classes.textFieldFormStyle}   >
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
        </div>
      </div>
      <div style={{float:'left', width:'22%', marginBottom:'2rem'}}>
        <div className={classes.textFieldFormStyle}   >
          <FormControl variant="outlined" className={classes.formControl}  >
            <InputLabel id="Subject"  >Power or Energy or Water</InputLabel>
            <Select

              labelId="select subject"
              id="select subject"
              value={props.filterDept.subject}
              onChange={handleChangeSubject}
              label="Power/Energy/Water"
            >
              <MenuItem value={"elec_power"}>Power</MenuItem>
              <MenuItem value={"elec_energy"}>Energy</MenuItem>
              <MenuItem value={"water_volume"}>Water</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div style={{float:'left', width:'22%' , marginBottom:'2rem'}}>
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
      </div>
      <div style={{float:'left', width:'22%' , marginBottom:'2rem'}}>
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
      </div>
      
      
      <Button
        variant="contained"
        color="primary"
        className={classes.buttonFilter}
        endIcon={<SearchIcon>Filter</SearchIcon>}
        onClick={(e)=>handleFilterButton()}
      >
        Filter
      </Button>
    </div>

  );
};

export default Form;