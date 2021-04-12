import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import { green } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import SearchIcon from '@material-ui/icons/Search';
import Form from "./Form";

import { toast } from "react-toastify";

import FormAddSite from "./FormAddSite";
import { addNewSite, getAllSites } from '../../../../api/api_sites';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    'aria-controls': `action-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius:'1.5rem',
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    position: 'relative',
    minHeight: 200,
    marginBottom:'2rem'
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  fabGreen: {
    color: theme.palette.common.white,

    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[600],
    },
  },
}));




export default function FloatingActionButtonZoom(props2) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const fabs = [
    {
      color: 'primary',
      className: classes.fab,
      icon: <SearchIcon />,
      label: 'Filter',
    },
    {
      color: 'secondary',
      className: classes.fab,
      icon: <EditIcon />,
      label: 'Edit',
    },
    {
      color: 'inherit',
      className: clsx(classes.fab, classes.fabGreen),
      icon: <UpIcon />,
      label: 'Expand',
    },
  ];
const fabClickHandle=(fablabel)=>{
  console.log(fablabel)
  if (fablabel==="Filter"){
    getAllSites((isOk, data) => {
      if (!isOk)
        return toast.error("Server is not responding!");
      toast.success("Data Received!");
      props2.sitesDataSet(data);
      console.log(data)
    })
  }

  
  if (fablabel==="Edit"){
    addNewSite(props2.addSite.features,(isOk, data) => {
      if (!isOk)
        return toast.error("Server is not responding!");
      toast.success("Data Sent!");

    })
  }
}

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          // variant="fullWidth"
          aria-label="action tabs example"
        >
          <Tab label="Filter" {...a11yProps(0)} />
          <Tab label="Modify" {...a11yProps(1)} />
          {/*<Tab label="Item Three" {...a11yProps(2)} />*/}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Form {...props2}></Form>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <FormAddSite {...props2}></FormAddSite>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          Item Three
        </TabPanel>
      </SwipeableViews>
      {fabs.map((fab, index) => (
        <Zoom
          key={fab.color}
          in={value === index}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`,
          }}
          unmountOnExit
        >
          <Fab aria-label={fab.label} className={fab.className} color={fab.color} onClick={() => fabClickHandle(fab.label)}>
            {fab.icon}
          </Fab>
        </Zoom>
      ))}
    </div>
  );
}