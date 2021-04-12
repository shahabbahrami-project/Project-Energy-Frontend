import React from 'react';
import useStyles from "./styles";
import { toast } from "react-toastify";
import clsx from 'clsx';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormFilterSite from "../FilterForm/FormFilterSite";
import { addNewSite, deleteSite, getAllSites, updateSite, filterSites, groupByCity } from "../../../../api/api_sites";
import FormAddSite from "../AddSiteForm/FormAddSite";
import FormUpdateSite from "../UpdateSiteForm/FormUpdateSite";
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import AutorenewSharpIcon from '@material-ui/icons/AutorenewSharp';
import EditLocationIcon from '@material-ui/icons/EditLocation';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { filterSensors, getAllSensors,addNewSensor, deleteSensor,updateSensor, filterDepts, getAllDepartments, occupancy, occupancyLocal } from '../../../../api/api_sensors';
import AssessmentIcon from '@material-ui/icons/Assessment';
import TimelineIcon from '@material-ui/icons/Timeline';
import { set } from 'date-fns';
export default function TabMenu(props2) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [loadingSearch, setLoadingSearch] = React.useState(false);
  const [successSearch, setSuccessSearch] = React.useState(false);
  const [loadingAdd, setLoadingAdd] = React.useState(false);
  const [successAdd, setSuccessAdd] = React.useState(false);
  const [loadingUpdate, setLoadingUpdate] = React.useState(false);
  const [successUpdate, setSuccessUpdate] = React.useState(false);
  const timer = React.useRef();
  const buttonClassnameSearch = clsx({
    [classes.buttonSuccess]: successSearch,
  });
  const buttonClassnameAdd = clsx({
    [classes.buttonSuccess]: successAdd,
  });
  const buttonClassnameUpdate = clsx({
    [classes.buttonSuccess]: successUpdate,
  });
  const buttonClassnameDelete = clsx({
    [classes.buttonSuccess]: successUpdate,
  });
  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);





  const handleButtonClickFilter = () => {
    setSuccessSearch(false);
    setLoadingSearch(true);
    filterSensors(props2.filterSite, (isOk, data) => {
      if (!isOk) {
        setSuccessSearch(false);
        setLoadingSearch(false);
        return toast.error("Server is not responding for filtering!");
      }
      else {
        toast.success("Data Received After Filtering!");
        props2.sitesDataSet(data);
        props2.setHeat(true);
        // props2.setToggleMapCenter(true)
        // props2.setCenter([ data[0].locationY, data[0].locationX])
        setSuccessSearch(true);
        setSuccessSearch(false);
        setLoadingSearch(false);
        // occupancyLocal((isOk, data) => {
        //   if (!isOk) {
        //     return toast.error("Server is not responding for graphs!");
        //   }
        //   else {
        //     toast.success("Data Received for Graphs!");
        //     // props.setDept(data);
        //     console.log('data',data)
        //     console.log('test',data[0][0].occupancy)
        //     props2.setSensorData(data)
        //     props2.updateData([data[0]])
        //     console.log('sensordata',props2.sensorData)
        //     // props2.setToggleMapCenter(true)
        //     // props2.setCenter([data[0].locationX, data[0].locationY])
        //     // console.log(props.center)
        //   }
        // })
        // groupByCity(props2.filterSite, (isOk, data1) => {
        //   if (!isOk) {
        //     return toast.error("Server is not responding for grouping!");
        //   }
        //   else {
        //     toast.success("Data Received After Grouping!");
        //     props2.setCities(data1);
        //     setSuccessSearch(false);
        //     setLoadingSearch(false);
        //   }
        // })

      }
    })

  };

  






  const handleGraphButton=()=>{
    occupancyLocal((isOk, data) => {
      if (!isOk) {
        return toast.error("Server is not responding for graphs!");
      }
      else {
        toast.success("Data Received for Graphs!");
        // props.setDept(data);
        console.log(data)
        const test=data.map(item => item[0].occupancy)
        console.log('test', test)
        props2.setSensorData(data)
        props2.updateData([data[0]])
        console.log('sensordata',props2.sensorData)
        // props2.setToggleMapCenter(true)
        // props2.setCenter([data[0].locationX, data[0].locationY])
        // console.log(props.center)
      }
    })

    // filterDepts(props2.filterDept,(isOk, data) => {
    //   if (!isOk) {
    //     return toast.error("Server is not responding!");
    //   }
    //   else {
    //     toast.success("Data Received After Filtering!");
    //     // props.setDept(data);
    //     console.log(data)
    //     // props2.setToggleMapCenter(true)
    //     // props2.setCenter([data[0].locationX, data[0].locationY])
    //     // console.log(props.center)
    //   }
    // })

  }












  return (
    <div className={classes.root}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <SearchIcon />
          <Typography className={classes.heading}>Filter Measurement Endpoints</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormFilterSite {...props2}></FormFilterSite>
          <div className={classes.wrapper} style={{marginTop:'9rem'}}>
            <Fab
              aria-label="save"
              color="primary"
              className={buttonClassnameSearch}
              onClick={handleButtonClickFilter}
            >
              {successSearch ? <CheckIcon /> : <SearchIcon />}
            </Fab>
            {loadingSearch && <CircularProgress size={68} className={classes.fabProgress} />}
          </div>
        </AccordionDetails>
      </Accordion>
     
     

      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <AssessmentIcon />
          <Typography className={classes.heading}>See on Graphs</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormUpdateSite {...props2}></FormUpdateSite>
          <div className={classes.wrapper} >
            <Fab
              style={{ backgroundColor: '#42f58d', color: 'white' }}
              aria-label="update"
              // backgroundColor='#B638D1'
              className={buttonClassnameUpdate}
              onClick={handleGraphButton}
            >
              {successUpdate ? <CheckIcon /> : <TimelineIcon />}
            </Fab>
            {loadingUpdate && <CircularProgress size={68} className={classes.fabProgress} />}
          </div>
        </AccordionDetails>
      </Accordion>

    </div>
  );
}