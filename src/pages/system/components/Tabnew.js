import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Form from "./Form";
import { toast } from "react-toastify";
import { addNewSite, getAllSites, filterSites, groupByCity } from "../../../api/api_sites";
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SearchIcon from '@material-ui/icons/Search';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom: '2rem',
    borderRadius: '1rem'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },

  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',

  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));





export default function TabMenu(props2) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [loadingSearch, setLoadingSearch] = React.useState(false);
  const [successSearch, setSuccessSearch] = React.useState(false);
  const timer = React.useRef();
  const buttonClassname = clsx({
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
        return toast.error("Server is not responding!");
      }
      else {
        toast.success("Data Received After Filtering!");
        props2.sitesDataSet(data);
        // props2.setCenter({"lat":data[0].locationX, "lng":data[0].locationY})
        props2.setToggleMapCenter(true)
        props2.setCenter([data[0].locationX, data[0].locationY])
        console.log(props2.center)
        setSuccessSearch(true);
        setLoadingSearch(false);
      }
      timer.current = window.setTimeout(() => {
        props2.setToggleMapCenter(false);
      }, 5000);
    })
    groupByCity(props2.filterSite, (isOk, data1) => {
      if (!isOk) {
        setSuccessSearch(false);
        setLoadingSearch(false);
        return toast.error("Server is not responding!");
      }
      else {
        toast.success("Data Received After Grouping!");
        props2.setCities(data1);
        console.log(data1)
        setSuccessSearch(true);
        setLoadingSearch(false);
      }
    })

    timer.current = window.setTimeout(() => {
      setSuccessSearch(false);
    }, 5000);
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
          <Form {...props2}></Form>
          <div className={classes.wrapper} style={{ marginTop: '14rem' }}>
            <Fab
              aria-label="save"
              color="primary"
              className={buttonClassname}
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