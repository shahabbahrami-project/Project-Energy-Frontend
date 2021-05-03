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
import { filterSites, groupByCity } from "../../../../api/api_sites";
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SearchIcon from '@material-ui/icons/Search';
import ApexLineChart from './ApexLineChart';
import Widget from "../../../../components/Widget/Widget";
import { Grid } from "@material-ui/core"
import FormGraph from '../FormGraph/FormGraph';
import ChartIcon from '@material-ui/icons/Timeline';
import { PinDropSharp } from '@material-ui/icons';
import { getSensorDataFilter } from '../../../../api/api_sensors';
export default function TabGraph(props2) {
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
    const filter={
      "sensorId": props2.sensorDataFilter.sensorID,
      "reportDateTimeStart": props2.sensorDataFilter.startDate,
      "reportDateTimeEnd": props2.sensorDataFilter.endDate
    }
    getSensorDataFilter(filter, (isOk, data) => {
      if (!isOk) {
        setSuccessSearch(false);
        setLoadingSearch(false);
          return toast.error("could not get sensor data!");
      } else {
        setSuccessSearch(true);
          console.log(data)
          props2.setSensorData(data)
          setSuccessSearch(false);
          setLoadingSearch(false);
      }
    });
 

   
  };



  return (
    <div className={classes.root}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <ChartIcon />
          <Typography className={classes.heading}>Graphs</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* <FormFilterSite {...props2}></FormFilterSite> */}
          <Grid container direction={'column'} >
            <Grid item>
              <Widget title={"Sensor Code: "+props2.sensorDataFilter.sensorCode} upperTitle noBodyPadding disableWidgetMenu >



                <ApexLineChart {...props2}/>




              </Widget>
            </Grid>
            <Grid item style={{marginTop:'4vh'}}>

            <FormGraph {...props2}></FormGraph>
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
            </Grid>
          </Grid>


        </AccordionDetails>
      </Accordion>
    </div>
  );
}