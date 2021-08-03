import React from 'react';
import useStyles from "./styles";
import { toast } from "react-toastify";
import clsx from 'clsx';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormAddSite from "../AddSiteForm/FormAddSite";
import FormUpdateSite from "../UpdateSiteForm/FormUpdateSite";
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import AddIcon from '@material-ui/icons/Add';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import AutorenewSharpIcon from '@material-ui/icons/AutorenewSharp';
import EditLocationIcon from '@material-ui/icons/EditLocation';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { addSite, updateSite, allSites, deleteSite } from '../../../../../api/api_sites_energy';


export default function TabMenu(props2) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [loadingSearch, setLoadingSearch] = React.useState(false);
  const [successSearch, setSuccessSearch] = React.useState(false);
  const [loadingAdd, setLoadingAdd] = React.useState(false);
  const [successAdd, setSuccessAdd] = React.useState(false);
  const [loadingUpdate, setLoadingUpdate] = React.useState(false);
  const [successUpdate, setSuccessUpdate] = React.useState(false);
  const [loadingDelete, setLoadingDelete] = React.useState(false);
  const [successDelete, setSuccessDelete] = React.useState(false);
  const timer = React.useRef();
  const user_id = Number(localStorage.getItem('user_id'))
  var dateNowTemp = new Date();
  var dateNow = dateNowTemp.toJSON()
  
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
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





  const handleButtonClickAdd = () => {
    setSuccessAdd(false);
    setLoadingAdd(true);
    addSite(props2.addSite.features, (isOk, data) => {
      if (!isOk) {
        setSuccessAdd(false);
        setLoadingAdd(false);
        return toast.error("Server is not responding to add new site!");
      }
      else {
        toast.success("New Site is Added!");
        const sitesNew = [...props2.sites, data];
        props2.sitesDataSet(sitesNew);
        setSuccessAdd(true);
        const emptyForm = { ...props2.addSite, features: { name: "",user: user_id, sensors:[], devices:[], locationX: "", locationY: "", link: "", timezone:"", created_at: dateNow, image:null} };
        props2.addSiteSet(emptyForm);
        setSuccessAdd(false);
        setLoadingAdd(false);  
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
        allSites((isOk, data) => {
          if (!isOk) {
            return toast.error("Server is not responding for getting sensors types!");
          }
          else {
            props2.setSites(data)
            setLoadingUpdate(false);
            setSuccessUpdate(false);
          }
        })
      }

          }
        )
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
        props2.setClickedSite({ id: null, name: "",user: user_id, sensors:[], devices:[], locationX: "", locationY: "", link: "", timezone:"", created_at: dateNow, image:null })
        props2.setSensorsUpdate([]);
        allSites((isOk, data) => {
          if (!isOk) {
            return toast.error("Server is not responding for getting sensors types!");
          }
          else {
            props2.setSites(data)
            setSuccessDelete(false);
            setLoadingDelete(false);
          }
        })
      }
    })  
  };


  return (
    <div className={classes.root}>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <AddLocationIcon />
          <Typography className={classes.heading}>Add New Site</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormAddSite {...props2}></FormAddSite>
          <div className={classes.wrapper} style={{marginTop:'20rem', marginLeft:'-9px'}}>
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
          <EditLocationIcon/>
          <Typography className={classes.heading}>Update Sites Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormUpdateSite {...props2}></FormUpdateSite>
          <div className={classes.wrapper} style={{marginTop:'20rem', marginLeft:'-9px'}}>
            <Fab
            style={{backgroundColor:'#B638D1', color:'white'}}
              aria-label="update"
              // backgroundColor='#B638D1'
              className={buttonClassnameUpdate}
              onClick={handleButtonClickUpdate}
            >
              {successUpdate ? <CheckIcon /> : <AutorenewSharpIcon />}
            </Fab>
            {loadingUpdate && <CircularProgress size={68} className={classes.fabProgress} />}
          </div>
          <div className={classes.wrapper} style={{marginTop:'20rem', marginLeft:'0px'}}>
            <Fab
            style={{backgroundColor:'#CE3A00', color:'white'}}
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