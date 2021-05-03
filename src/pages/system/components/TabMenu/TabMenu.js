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
import {  filterSites, groupByCity } from "../../../../api/api_sites";
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SearchIcon from '@material-ui/icons/Search';


export default function TabMenu(props2) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [loadingSearch, setLoadingSearch] = React.useState(false);
  const [successSearch, setSuccessSearch] = React.useState(false);
 
  const timer = React.useRef();
  const buttonClassnameSearch = clsx({
    [classes.buttonSuccess]: successSearch,
  });

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
            toast.success("Data Received After Grouping!");
            props2.setCities(data1);
            setSuccessSearch(false);
            setLoadingSearch(false);
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
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <SearchIcon />
          <Typography className={classes.heading}>Filter Sites</Typography>
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
    </div>
  );
}