import React, {useRef, useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import useStyles from "./styles";
import { toast } from "react-toastify";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import tempIcon from "./images/tempicon.png";
import hvacIcon from "./images/hvac.png";
import pumpIcon from "./images/pump.png";
import humidityIcon from "./images/humidity.png";
import spaceIcon from "./images/space.png";
import motionIcon from "./images/motion-sensor.png";
import lightIcon from "./images/light.png";
import lightingIcon from "./images/lighting.png";
import phevIcon from "./images/phev.png";
import Checkbox from '@material-ui/core/Checkbox';
import { parseISO, format } from "date-fns";
import { retrieveDevicesList } from "../../../../../api/api_devices_energy";
import { retrieveSensorsList } from "../../../../../api/api_sensors_energy";



const FormUpdateSite = (props) => {
  const classes = useStyles();

  const inputRef = useRef();
  const [imageFile, setImageFile] = useState();
  const [imagePath, setImagePath] = useState();


 

  const handleChangeLat = (event) => {
    const latNew = { ...props.clickedSite, locationY: event.target.value };
    props.setClickedSite(latNew);
  };

  const handleChangeLong = (event) => {
    const longNew = { ...props.clickedSite, locationX: event.target.value };
    props.setClickedSite(longNew);
  };

  const handleChangeSiteName = (event) => {
    const nameNew = { ...props.clickedSite, name: event.target.value };
    props.setClickedSite(nameNew);
  };

  const handleChangeTimeZone = (event) => {
    const timezoneNew = { ...props.clickedSite, timezone: event.target.value };
    props.setClickedSite(timezoneNew);
  };



  const handleChangeLink = (event) => {
    const linkNew = { ...props.clickedSite, link: event.target.value };
    props.setClickedSite(linkNew);
  };



  
  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0])
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePath(e.target.result);
        console.log(e.target.result)
      };
      reader.readAsDataURL(e.target.files[0]);
      const imageNew = { ...props.clickedSite,  image: e.target.files[0] };
      props.setClickedSite(imageNew);
    }
  };


  const [checked, setChecked] = React.useState([]);
  const [checkedSensors, setCheckedSensors] = React.useState([]);



  useEffect(() => {
    if (props.clickedSite.sensors.length === 0) {
      setChecked([])
    }
    else{
      const array = props.sensors.map((item, index)=>{if (props.clickedSite.sensors.includes(item.id)){
        return index
      }})
      setChecked(array)
    }

    if (props.clickedSite.devices.length === 0) {
      setCheckedDev([])
    }
    else{
      const array2 = props.devices.map((item, index)=>{if (props.clickedSite.devices.includes(item.id)){
        return index
      }})
      setCheckedDev(array2)
    }
  }, [props.clickedSite]);










  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    
    var sensorsCheckedArray = []
    const sensorsIDs = props.sensors.map(item => item.id)
    sensorsCheckedArray = newChecked.map(Index => sensorsIDs[Index])
    
    var sensorsCheckedArrayWithoutNull= sensorsCheckedArray.filter(item => item);
    console.log(sensorsCheckedArrayWithoutNull)
    setCheckedSensors(sensorsCheckedArrayWithoutNull)
    const sensorsNew = { ...props.clickedSite,  sensors: sensorsCheckedArrayWithoutNull  };
    props.setClickedSite(sensorsNew);
  };



  function findSensorParameter(id) {
    var parameter = "";
    props.sensorsType.forEach(element => {
      if (element.id == id) {
        parameter = String(element.name);
      }
    });
    return parameter
  }




  const retrieveSensorsListHandle = (e) => {
    retrieveSensorsList((isOk, data) => {
      if (!isOk) {
        return toast.error("Server is not responding for getting devices list!");
      }
      else {
        props.setSensors(data)
        return toast.success("Sensors list is imported from database!");
      }
    })
  }




  const [checkedDev, setCheckedDev] = React.useState([]);
  const [checkedDevices, setCheckedDevices] = React.useState([]);

  const handleToggleDev = (value) => () => {
    const currentIndex = checkedDev.indexOf(value);
    const newChecked = [...checkedDev];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setCheckedDev(newChecked);
    var devicesCheckedArray = []
    const devicesIDs = props.devices.map(item => item.id)
    devicesCheckedArray = newChecked.map(Index => devicesIDs[Index])
    var devicesCheckedArrayWithoutNull= devicesCheckedArray.filter(item => item);
    setCheckedDevices(devicesCheckedArrayWithoutNull)
    const devicesNew = { ...props.clickedSite,  devices: devicesCheckedArrayWithoutNull };
    props.setClickedSite(devicesNew);
  };

  function findDeviceParameter(id) {
    var parameter = "";
    props.devicesType.forEach(element => {
      if (element.id == id) {
        parameter = String(element.name);
      }
    });
    return parameter
  }

  

  const retrieveDevicesListHandle = (e) => {
    retrieveDevicesList((isOk, data) => {
      if (!isOk) {
        return toast.error("Server is not responding for getting devices list!");
      }
      else {
        props.setDevices(data)
        return toast.success("Sensors list is imported from database!");
      }
    })
  }




  return (
    <div className={classes.formDivStyle}>
      <div className={classes.containerstyle}>
        <FormControl className={classes.textField0} variant="outlined">
          <InputLabel htmlFor="Lat" classes={{ root: classes.textField1, shrink: classes.textField3 }} >Latitude</InputLabel>
          <OutlinedInput
            classes={{ root: classes.textField2 }}
            id="outlined-adornment-Lat"
            type={'text'}
            value={props.clickedSite.locationY}
            onChange={handleChangeLat}
            label={"Latitude"}
          />
        </FormControl>

        <FormControl className={classes.textField0} variant="outlined">
          <InputLabel htmlFor="Long" classes={{ root: classes.textField1, shrink: classes.textField3 }} >Longitude</InputLabel>
          <OutlinedInput
            classes={{ root: classes.textField2 }}
            id="outlined-adornment-long"
            type={'text'}
            value={props.clickedSite.locationX}
            onChange={handleChangeLong}
            label={"Longitude"}
          />
        </FormControl>

        <FormControl variant="outlined" className={classes.textField0}  >
          <InputLabel id="demo-simple-select-outlined-label" classes={{ root: classes.textField1, shrink: classes.textField3 }} >Time Zone</InputLabel>
          <Select
            classes={{ root: classes.selectField2 }}
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={props.clickedSite.timezone}
            onChange={handleChangeTimeZone}
            label="Time Zone"
          >
            <MenuItem value={"Pacific Standard Time"}>(GMT-08:00) Pacific Time (US & Canada)</MenuItem>
            <MenuItem value={"Mountain Standard Time"}>(GMT-07:00) Mountain Time (US & Canada)</MenuItem>
            <MenuItem value={"Central Standard Time"}>(GMT-06:00) Central Time (US & Canada)</MenuItem>
            <MenuItem value={"Eastern Standard Time"}>(GMT-05:00) Eastern Time (US & Canada)</MenuItem>
            <MenuItem value={"Atlantic Standard Time"}>(GMT-04:00) Atlantic Time (Canada)</MenuItem>
            <MenuItem value={"Newfoundland Standard Time"}>(GMT-03:30) Newfoundland</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div style={{ float: 'left', width: '18%', marginBottom: '2rem' }}>

        <FormControl className={classes.textField0} variant="outlined">
          <InputLabel htmlFor="SiteName" classes={{ root: classes.textField1, shrink: classes.textField3 }} >Site Name</InputLabel>
          <OutlinedInput
            classes={{ root: classes.textField2 }}
            id="outlined-adornment-sitename"
            type={'text'}
            value={props.clickedSite.name}
            onChange={handleChangeSiteName}
            label={"Site Name"}
          />
        </FormControl>

        <FormControl className={classes.textField0} variant="outlined">
          <InputLabel htmlFor="Link" classes={{ root: classes.textField1, shrink: classes.textField3 }} >Link</InputLabel>
          <OutlinedInput
            classes={{ root: classes.textField2 }}
            id="outlined-adornment-link"
            type={'text'}
            value={props.clickedSite.link}
            onChange={handleChangeLink}
            label={"Link"}
          />
        </FormControl>

       
        <FormControl className={classes.textField0} variant="outlined">
          <Typography
            className={classes.profileMenuLink}
            color="primary"
            onClick={() => {
              inputRef.current.click();
            }}
          >
            Select a Photo for This Site
            </Typography>
          <input ref={inputRef} type={'file'} onChange={handleAvatarChange} style={{ marginLeft: '3rem' }} />
        </FormControl>


        <IconButton
          aria-haspopup="true"
          color="inherit"
          className={classes.headerMenuButton}
          aria-controls="profile-menu"
        >
          <img src={props.clickedSite.image} style={{ width: '10vw', height:'8vw', borderRadius: '1rem' }} classes={{ root: classes.headerIcon }} />
        </IconButton>
      </div>

      <div style={{ float: 'left', width: '25%', marginBottom: '2rem', marginRight: '3vw'  }}>
      <div>
          <Button variant="contained" color="primary" style={{ width: '100%', height: '4vh', fontSize: '0.8vw', minWidth: 0, marginTop: '1.5vh' }}
            onClick={e => retrieveSensorsListHandle(e)}
          >
            Refresh Sensors List Now!
         </Button>
        </div>
        <List dense className={classes.rootDevices} >
          {props.sensors.map((item, index) => {
            const labelId = `checkbox-list-secondary-label-${index}`;
            return (
              <ListItem key={index} button>
                <ListItemAvatar>
                  <Avatar variant="square" src={findSensorParameter(item.type) == "Temperature" ? tempIcon : findSensorParameter(item.type) == "Light" ? lightIcon : findSensorParameter(item.type) == "Humidity" ? humidityIcon : findSensorParameter(item.type) == "Space" ? spaceIcon : motionIcon}>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText id={labelId}
                  primary={<><Typography style={{ fontSize: '0.8vw' }}>{item.name}</Typography></>}
                  secondary={<><Typography style={{ fontSize: '0.6vw' }}>{findSensorParameter(item.type)}   </Typography></>}
                />
                <ListItemSecondaryAction>
                  <Checkbox
                    edge="end"
                    onChange={handleToggle(index)}
                    checked={checked.indexOf(index) !== -1}
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
        
      </div>

      <div style={{ float: 'left', width: '25%', marginBottom: '2rem', }}>

      <div>
          <Button variant="contained" color="primary" style={{ width: '100%', height: '4vh', fontSize: '0.8vw', minWidth: 0, marginTop: '1.5vh' }}
            onClick={e => retrieveDevicesListHandle(e)}
          >
            Refresh Devices List Now!
         </Button>
        </div>
        <List dense className={classes.rootDevices} >
          {props.devices.map((item, index) => {
            const labelId = `checkbox-list-secondary-label-${index}`;
            return (
              <ListItem key={index} button>
                <ListItemAvatar>
                  <Avatar variant="square" src={findDeviceParameter(item.type) == "HVAC" ? hvacIcon : findDeviceParameter(item.type) == "Lighting" ? lightingIcon : findDeviceParameter(item.type) == "Pump" ? pumpIcon : phevIcon}>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText id={labelId}
                  primary={<><Typography style={{ fontSize: '0.8vw' }}>{item.name}</Typography></>}
                  secondary={<><Typography style={{ fontSize: '0.6vw' }}>{findDeviceParameter(item.type)}   </Typography></>}
                />
                <ListItemSecondaryAction>
                  <Checkbox
                    edge="end"
                    onChange={handleToggleDev(index)}
                    checked={checkedDev.indexOf(index) !== -1}
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>

      </div>



    </div>
  );
};

export default FormUpdateSite;