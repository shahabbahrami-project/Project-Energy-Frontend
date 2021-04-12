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
import { filterSensors, getAllSensors,addNewSensor, deleteSensor,updateSensor } from '../../../../api/api_sensors';


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
  const [loadingDelete, setLoadingDelete] = React.useState(false);
  const [successDelete, setSuccessDelete] = React.useState(false);
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





  const handleButtonClickFilter2 = () => {
    setSuccessSearch(false);
    setLoadingSearch(true);
    getAllSensors((isOk, data) => {
      if (!isOk) {
        setSuccessSearch(false);
        setLoadingSearch(false);
        return toast.error("Server is not responding for filtering!");
      }
      else {
        toast.success("Data Received After Filtering!");
        props2.sitesDataSet(data);
        // props2.setToggleMapCenter(true)
        // props2.setCenter([ data[0].locationY, data[0].locationX])
        setSuccessSearch(true);
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

  const handleButtonClickAdd = () => {
    setSuccessAdd(false);
    setLoadingAdd(true);
    addNewSensor(props2.addSite.features, (isOk, data) => {
      if (!isOk) {
        setSuccessAdd(false);
        setLoadingAdd(false);
        console.log(props2.addSite.features)
        return toast.error("Server is not responding to Add New Site!");
      }
      else {
        toast.success("Data for New Site is Sent!");
        const sitesNew = [...props2.sites, data];
        props2.sitesDataSet(sitesNew);
        setSuccessAdd(true);
        setSuccessAdd(false);
        setLoadingAdd(false);
        // groupByCity(props2.filterSite, (isOk, data1) => {
        //   if (!isOk) {
        //     return toast.error("Server is not responding!");
        //   }
        //   else {
        //     toast.success("Sites List has been Updated!");
        //     props2.setCities(data1);
        //     setSuccessAdd(false);
        //     setLoadingAdd(false);
        //   }
        // })

      }
    })

  };

  const handleButtonClickUpdate = () => {
    setSuccessUpdate(false);
    setLoadingUpdate(true);
    console.log(props2.clickedSite)
    updateSensor(props2.clickedSite, (isOk, data) => {
      if (!isOk) {
        setSuccessUpdate(false);
        setLoadingUpdate(false);
        return toast.error("Server is not responding!");
      }
      else {
        toast.success("Updated Data is Sent to Server!");
        setSuccessUpdate(true);
        filterSensors(props2.filterSite, (isOk, data) => {
          if (!isOk) {
            return toast.error("Server is not responding for filtering!");
          }
          else {
            toast.success("Data Received After Filtering!");
            props2.sitesDataSet(data);
            setLoadingUpdate(false);
            setSuccessUpdate(false);           
            // groupByCity(props2.filterSite, (isOk, data1) => {
            //   if (!isOk) {
            //     return toast.error("Server is not responding for grouping!");
            //   }
            //   else {
            //     toast.success("Data Received After Grouping!");
            //     props2.setCities(data1);
            //     setLoadingUpdate(false);
            //     setSuccessUpdate(false);
            //   }
            // })
          }
        })
      }
    })
  };



  const handleButtonClickDelete = () => {
    setSuccessDelete(false);
    setLoadingDelete(true);
    deleteSensor(props2.clickedSite, (isOk, data) => {
      if (!isOk) {
        setSuccessDelete(false);
        setLoadingDelete(false);
        return toast.error("Server is not responding!");
      }
      else {
        toast.success("Site has been deleted from database!");
        setSuccessDelete(true);
        filterSensors(props2.filterSite, (isOk, data) => {
          if (!isOk) {
            return toast.error("Server is not responding for filtering!");
          }
          else {
            toast.success("Data Received After Filtering!");
            props2.sitesDataSet(data);
            setSuccessDelete(false);
            setLoadingDelete(false);
            // groupByCity(props2.filterSite, (isOk, data1) => {
            //   if (!isOk) {
            //     return toast.error("Server is not responding for grouping!");
            //   }
            //   else {
            //     toast.success("Data Received After Grouping!");
            //     props2.setCities(data1);
            //     setSuccessDelete(false);
            //     setLoadingDelete(false);
            //   }
            // })
          }
        })
      }
    })
    // timer.current = window.setTimeout(() => {
    //   setSuccessUpdate(false);
    // }, 3000);


  };


















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
          <div className={classes.wrapper}>
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
     
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <AddLocationIcon />
          <Typography className={classes.heading}>Add New Endpoint to Map</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormAddSite {...props2}></FormAddSite>
          <div className={classes.wrapper}>
            <Fab
              aria-label="save"
              color="secondary"
              className={buttonClassnameAdd}
              onClick={handleButtonClickAdd}
            >
              {successAdd ? <CheckIcon /> : <AddIcon />}
            </Fab>
            {loadingAdd && <CircularProgress size={68} className={classes.fabProgress} />}
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <EditLocationIcon />
          <Typography className={classes.heading}>Update or Delete Endpoint</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormUpdateSite {...props2}></FormUpdateSite>
          <div className={classes.wrapper} >
            <Fab
              style={{ backgroundColor: '#B638D1', color: 'white' }}
              aria-label="update"
              // backgroundColor='#B638D1'
              className={buttonClassnameUpdate}
              onClick={handleButtonClickUpdate}
            >
              {successUpdate ? <CheckIcon /> : <AutorenewSharpIcon />}
            </Fab>
            {loadingUpdate && <CircularProgress size={68} className={classes.fabProgress} />}
          </div>
          <div className={classes.wrapper} >
            <Fab
              style={{ backgroundColor: '#CE3A00', color: 'white' }}
              aria-label="delete"
              // backgroundColor='#B638D1'
              className={buttonClassnameDelete}
              onClick={handleButtonClickDelete}
            >
              {successDelete ? <CheckIcon /> : <DeleteForeverIcon />}
            </Fab>
            {loadingDelete && <CircularProgress size={68} className={classes.fabProgress} />}
          </div>
        </AccordionDetails>
      </Accordion>

    </div>
  );
}