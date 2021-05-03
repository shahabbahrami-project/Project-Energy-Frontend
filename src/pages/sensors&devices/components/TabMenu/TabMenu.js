import React from 'react';
import useStyles from "./styles";
import { toast } from "react-toastify";
import clsx from 'clsx';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { addNewSite, deleteSite, updateSite, filterSites, groupByCity } from "../../../../api/api_sites";
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
import { addSensorsList } from "../../../../api/api_sensors";
import FormAddSensor from '../FormAddSensor/FormAddSensor';





export default function TabMenu(props2) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(true);
  const [loadingSearch, setLoadingSearch] = React.useState(false);
  const [successSearch, setSuccessSearch] = React.useState(false);
  const [loadingAdd, setLoadingAdd] = React.useState(false);
  const [successAdd, setSuccessAdd] = React.useState(false);
  const [loadingUpdate, setLoadingUpdate] = React.useState(false);
  const [successUpdate, setSuccessUpdate] = React.useState(false);
  const [loadingDelete, setLoadingDelete] = React.useState(false);
  const [successDelete, setSuccessDelete] = React.useState(false);
  const timer = React.useRef();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : true);
  };
  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);


  const handleButtonClickFilter = () => {
    setSuccessSearch(false);
    setLoadingSearch(true);
    filterSites(props2.filterSite, (isOk, data) => {
      if (!isOk) {
        setSuccessSearch(false);
        setLoadingSearch(false);
        return toast.error("Server is not responding for filtering!");
      }
      else {
        toast.success("Data Received After Filtering!");
        props2.sitesDataSet(data);
        setSuccessSearch(true);
        groupByCity(props2.filterSite, (isOk, data1) => {
          if (!isOk) {
            return toast.error("Server is not responding for grouping!");
          }
          else {
            // toast.success("Data Received After Grouping!");
            props2.setCities(data1);
            setSuccessSearch(false);
            setLoadingSearch(false);
          }
        })      
      }
    })
  };

  const handleButtonClickAdd = () => {
    setSuccessAdd(false);
    setLoadingAdd(true);
    addNewSite(props2.addSite.features, (isOk, data) => {
      if (!isOk) {
        setSuccessAdd(false);
        setLoadingAdd(false);
        return toast.error("Server is not responding to Add New Site!");
      }
      else {
        toast.success("Data for New Site is Sent!");
        const sitesNew = [...props2.sites, data];
        props2.sitesDataSet(sitesNew);
        setSuccessAdd(true);
        const emptyForm = { ...props2.addSite, features: { siteName: "", city: "", locationX: "", locationY: "", waterOrWaste: "", wellOrSurface: "",PumpEnergy:"", NumberOfHomes:"", People:"", VolumeOfTanks:"", TimeZoneInfoID:"" } };
        props2.addSiteSet(emptyForm);
        groupByCity(props2.filterSite, (isOk, data1) => {
          if (!isOk) {
            setSuccessAdd(false);
            setLoadingAdd(false);
            return toast.error("Server is not responding!");

          }
          else {
           // toast.success("Sites List has been Updated!");
            props2.setCities(data1); 
            const sensorsListwithSiteId=[]
            props2.sensors.forEach(element => {sensorsListwithSiteId.push({...element, siteId:data.id})            
            });  
            // console.log(sensorsListwithSiteId)
            addSensorsList(sensorsListwithSiteId, (isOk, data2) => {
              if (!isOk) {
                setSuccessAdd(false);
                setLoadingAdd(false);
                return toast.error("Server is not responding for adding sensors list!");
              }
              else {
                props2.setSensors([]);
                //toast.success("Sensors List is Sent!");              
                setSuccessAdd(false);
                setLoadingAdd(false);                
              }
            })
          }
        })        
      }
    })

  };

  const handleButtonClickUpdate = () => {
    setSuccessUpdate(false);
    setLoadingUpdate(true);
    updateSite(props2.clickedSite, (isOk, data) => {
      if (!isOk) {
        setSuccessUpdate(false);
        setLoadingUpdate(false);
        return toast.error("Server is not responding!");
      }
      else {
        toast.success("Updated Data is Sent to Server!");      
        setSuccessUpdate(true);
        filterSites(props2.filterSite, (isOk, data) => {
          if (!isOk) {
            return toast.error("Server is not responding for filtering!");
          }
          else {
           // toast.success("Data Received After Filtering!");
            props2.sitesDataSet(data);
            groupByCity(props2.filterSite, (isOk, data1) => {
              if (!isOk) {
                return toast.error("Server is not responding for grouping!");
              }
              else {
                //toast.success("Data Received After Grouping!");
                props2.setCities(data1);
                setLoadingUpdate(false);
                setSuccessUpdate(false);
              }
            })
          }
        })
      }
    })
  };



  const handleButtonClickDelete = () => {
    setSuccessDelete(false);
    setLoadingDelete(true);
    deleteSite(props2.clickedSite, (isOk, data) => {
      if (!isOk) {
        setSuccessDelete(false);
        setLoadingDelete(false);
        return toast.error("Server is not responding!");
      }
      else {
        toast.success("Site has been deleted from database!");
        setSuccessDelete(true);
        props2.setClickedSite({ id: null, siteName: "", city: "", locationX: "", locationY: "", waterOrWaste: "", wellOrSurface: "" })
        props2.setSensorsUpdate([]);
        filterSites(props2.filterSite, (isOk, data) => {
          if (!isOk) {
            return toast.error("Server is not responding for filtering!");
          }
          else {
         //   toast.success("Data Received After Filtering!");
            props2.sitesDataSet(data);
            groupByCity(props2.filterSite, (isOk, data1) => {
              if (!isOk) {
                return toast.error("Server is not responding for grouping!");
              }
              else {
           //     toast.success("Data Received After Grouping!");
                props2.setCities(data1);
                setSuccessDelete(false);
                setLoadingDelete(false);
              }
            })
          }
        })
      }
    })  
  };


  return (
    <div className={classes.root}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <AddLocationIcon />
          <Typography className={classes.heading}>Add Sensors and Devices</Typography>
        </AccordionSummary>
        <AccordionDetails
        classes={{ root: classes.accordionRoot}} 
        >
          <FormAddSensor {...props2}></FormAddSensor>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}