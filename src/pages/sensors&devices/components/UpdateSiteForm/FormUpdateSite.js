import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import useStyles from "./styles";
import { toast } from "react-toastify";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import sensorIcon from "./sensor.svg";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import { addOneSensors, updateOneSensors, deleteOneSensors, updateSensor } from "../../../../api/api_sensors";


const FormUpdateSite = (props) => {
  const classes = useStyles();


  const handleChangesensorCode = (event) => {
    const nameNew = { ...props.addSensorUpdate, sensorCode: event.target.value, siteId: props.selectedSiteId };
    props.setAddSensorUpdate(nameNew);
  };
  const handleChangeSensorType = (event) => {
    const sensortType = { ...props.addSensorUpdate, sensorTypeId: event.target.value, siteId: props.selectedSiteId };
    props.setAddSensorUpdate(sensortType);
  };

  const handleChangeConstraint = (event) => {
    const sensorCondition = { ...props.addSensorUpdate, alertConditions: event.target.value, siteId: props.selectedSiteId };
    props.setAddSensorUpdate(sensorCondition);
  };

  const handleChangeDescription = (event) => {
    const sensorDescription = { ...props.addSensorUpdate, description: event.target.value, siteId: props.selectedSiteId };
    props.setAddSensorUpdate(sensorDescription);
  };


  const handleChangeWaterWaste = (event) => {
    const waterWaste = { ...props.clickedSite, waterOrWaste: event.target.value };
    props.setClickedSite(waterWaste);
  };

  const handleChangeWellSurface = (event) => {
    const wellSurface = { ...props.clickedSite, wellOrSurface: event.target.value };
    props.setClickedSite(wellSurface);
  };

  const handleChangeLat = (event) => {
    const latNew = { ...props.clickedSite, locationY: event.target.value };
    props.setClickedSite(latNew);
  };

  const handleChangeLong = (event) => {
    const longNew = { ...props.clickedSite, locationX: event.target.value };
    props.setClickedSite(longNew);
  };

  const handleChangeSiteName = (event) => {
    const nameNew = { ...props.clickedSite, siteName: event.target.value };
    props.setClickedSite(nameNew);
  };

  const handleChangeTimeZone = (event) => {
    const timezoneNew = { ...props.clickedSite, timeZoneInfoId: event.target.value };
    props.setClickedSite(timezoneNew);
  };

  const handleChangePopulation = (event) => {
    const peopleNew = { ...props.clickedSite, people: Number(event.target.value) };
    props.setClickedSite(peopleNew);
  };

  const handleChangeHome = (event) => {
    const homeNew = { ...props.clickedSite,  numberOfHomes: Number(event.target.value) };
    props.setClickedSite(homeNew);
  };

  const handleChangeTank = (event) => {
    const tankNew = { ...props.clickedSite,  volumeOfTanks: Number(event.target.value)  };
    props.setClickedSite(tankNew);
  };

  const handleChangePumpEnergy = (event) => {
    const energyNew =  { ...props.clickedSite, pumpEnergy: Number(event.target.value)  };
    props.setClickedSite(energyNew);
  };

  const handleChangeCity = (event) => {
    const cityNew = { ...props.clickedSite, city: event.target.value };
    props.setClickedSite(cityNew);
  };
  const handleCancelButton = (e) => {
    props.setAddSensorUpdate({ sensorCode: "", description: "", sensorTypeId: '', siteId: null, alertConditions: '' })
    props.setUpdateSensorIndex(-1)
  }

  const handleAddSensorButton = (e) => {
    if (props.updateSensorIndex == -1) {
      if (props.addSensorUpdate.description != "") {
        addOneSensors(props.addSensorUpdate, (isOk, data) => {
          if (!isOk) {
            return toast.error("Server is not responding for adding sensor!");
          }
          else {
            toast.success("Sensor is Added!");
            const newSensorsArray = [...props.sensorsUpdate, props.addSensorUpdate]
            props.setSensorsUpdate(newSensorsArray)
            props.setAddSensorUpdate({ sensorCode: "", description: "", sensorTypeId: '', siteId: null, alertConditions: '' })
          }
        })
      }
      else {
        toast.error("Please include a proper description for this sensor");
      }
    }

    else {
      const sensorsArray = props.sensorsUpdate
      sensorsArray[props.updateSensorIndex].sensorCode = props.addSensorUpdate.sensorCode;
      sensorsArray[props.updateSensorIndex].sensorTypeId = props.addSensorUpdate.sensorTypeId;
      sensorsArray[props.updateSensorIndex].alertConditions = props.addSensorUpdate.alertConditions;
      sensorsArray[props.updateSensorIndex].description = props.addSensorUpdate.description;
      const updatedSensor = { id: sensorsArray[props.updateSensorIndex].id, description: sensorsArray[props.updateSensorIndex].description, sensorCode: sensorsArray[props.updateSensorIndex].sensorCode, sensorTypeId: sensorsArray[props.updateSensorIndex].sensorTypeId, siteId: sensorsArray[props.updateSensorIndex].siteId, alertConditions: sensorsArray[props.updateSensorIndex].alertConditions }
      if (updatedSensor.description != "") {
        updateOneSensors(updatedSensor, (isOk, data) => {
          if (!isOk) {
            return toast.error("Server is not responding for updating sensor!");
          }
          else {
            toast.success("Sensor is Updated!");
            props.setSensorsUpdate(sensorsArray)
            props.setAddSensorUpdate({ sensorCode: "", description: "", sensorTypeId: '', siteId: null, alertConditions: '' })
            props.setUpdateSensorIndex(-1)
          }
        })
      }
      else {
        toast.error("Please include a proper description for this sensor");
      }

    }
  }


  const handleEditSensorButton = (e, index) => {
    props.setAddSensorUpdate({ sensorCode: props.sensorsUpdate[index].sensorCode, description: props.sensorsUpdate[index].description, sensorTypeId: props.sensorsUpdate[index].sensorTypeId, alertConditions: props.sensorsUpdate[index].alertConditions })
    props.setUpdateSensorIndex(index);
  }


  const handleDeleteSensorButton = (e, index) => {
    const sensorsArray = props.sensorsUpdate
    deleteOneSensors(sensorsArray[index].id, (isOk, data) => {
      if (!isOk) {
        return toast.error("Server is not responding for deleteing sensor!");
      }
      else {
        toast.success("Sensor is Deleted!");
        const updatedsensors = props.sensorsUpdate.slice(0, index).concat(props.sensorsUpdate.slice(index + 1, props.sensorsUpdate.length))
        props.setSensorsUpdate(updatedsensors)
        props.setAddSensorUpdate({ sensorCode: "", sensorTypeId: '', description: '', siteId: null, alertConditions: '' })
        props.setUpdateSensorIndex(-1)
      }
    })
  }

  function findSensorParameter(id) {
    var parameter = "";
    props.sensorsType.forEach(element => {
      if (element.id == id) {
        parameter = String(element.parameter) + " (" + String(element.unit) + ")";
      }
    });
    return parameter
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
            value={props.clickedSite.timeZoneInfoId}
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
            value={props.clickedSite.siteName}
            onChange={handleChangeSiteName}
            label={"Site Name"}
          />
        </FormControl>

        <FormControl className={classes.textField0} variant="outlined">
          <InputLabel htmlFor="City" classes={{ root: classes.textField1, shrink: classes.textField3 }} >City</InputLabel>
          <OutlinedInput
            classes={{ root: classes.textField2 }}
            id="outlined-adornment-city"
            type={'text'}
            value={props.clickedSite.city}
            onChange={handleChangeCity}
            label={"City"}
          />
        </FormControl>

        <FormControl className={classes.textField0} variant="outlined">
          <InputLabel htmlFor="population" classes={{ root: classes.textField1, shrink: classes.textField3 }} >Population</InputLabel>
          <OutlinedInput
            classes={{ root: classes.textField2 }}
            id="outlined-adornment-People"
            type={'number'}
            value={props.clickedSite.people}
            onChange={handleChangePopulation}
            label={"Population"}

          />
        </FormControl>
        <FormControl className={classes.textField0} variant="outlined">
          <InputLabel htmlFor="homes" classes={{ root: classes.textField1, shrink: classes.textField3 }} >Number of Households</InputLabel>
          <OutlinedInput
            classes={{ root: classes.textField2 }}
            id="outlined-adornment-Home"
            type={'number'}
            value={props.clickedSite.numberOfHomes}
            onChange={handleChangeHome}
            label={"Number of Households"}

          />
        </FormControl>

      </div>

      <div style={{ float: 'left', width: '18%', marginBottom: '2rem' }}>

        <FormControl variant="outlined" className={classes.textField0}  >
          <InputLabel id="demo-simple-select-outlined-label" classes={{ root: classes.textField1, shrink: classes.textField3 }} >Water or Waste</InputLabel>
          <Select
            classes={{ root: classes.selectField2 }}
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={props.clickedSite.waterOrWaste}
            onChange={handleChangeWaterWaste}
            label="Water or Waste"
          >
            <MenuItem value={"Water"}>Water</MenuItem>
            <MenuItem value={"Waste"}>Waste</MenuItem>
          </Select>
        </FormControl>


        <FormControl variant="outlined" className={classes.textField0}  >
          <InputLabel id="demo-simple-select-outlined-label" classes={{ root: classes.textField1, shrink: classes.textField3 }} >Well or Surface</InputLabel>
          <Select
            classes={{ root: classes.selectField2 }}
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={props.clickedSite.wellOrSurface}
            onChange={handleChangeWellSurface}
            label="Well or Surface"
          >
            <MenuItem value={"Well"}>Well</MenuItem>
            <MenuItem value={"Surface"}>Surface</MenuItem>
          </Select>
        </FormControl>

        <FormControl className={classes.textField0} variant="outlined">
          <InputLabel htmlFor="PumpEnergy" classes={{ root: classes.textField1, shrink: classes.textField3 }} >Energy of Pumps (kWh)</InputLabel>
          <OutlinedInput
            classes={{ root: classes.textField2 }}
            id="outlined-adornment-Energy"
            type={'number'}
            value={props.clickedSite.pumpEnergy}
            onChange={handleChangePumpEnergy}
            label={"Energy of Pumps (kWh)"}

          />
        </FormControl>
                
        <FormControl className={classes.textField0} variant="outlined">
          <InputLabel htmlFor="Tanks" classes={{ root: classes.textField1, shrink: classes.textField3 }} >Volume of Tanks (Galon)</InputLabel>
          <OutlinedInput
            classes={{ root: classes.textField2 }}
            id="outlined-adornment-Tank"
            type={'number'}
            value={props.clickedSite.volumeOfTanks}
            onChange={handleChangeTank}
            label={"Volume of Tanks (Galon)"}

          />
        </FormControl>

      </div>

      <div style={{ float: 'left', width: '14%', marginBottom: '2rem', }}>

        <FormControl className={classes.textField0} variant="outlined">
          <InputLabel htmlFor="sensorCode" classes={{ root: classes.textField1, shrink: classes.textField3 }} >Sensor Code</InputLabel>
          <OutlinedInput
            classes={{ root: classes.textField2 }}
            id="outlined-adornment-city"
            type={'text'}
            value={props.addSensorUpdate.sensorCode}
            onChange={handleChangesensorCode}
            label={"Sensor Code"}
          />
        </FormControl>


        <FormControl variant="outlined" className={classes.textField0}  >
          <InputLabel id="demo-simple-select-outlined-label" classes={{ root: classes.textField1, shrink: classes.textField3 }}  >Sensor Type</InputLabel>
          <Select
            classes={{ root: classes.selectField2 }}
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={props.addSensorUpdate.sensorTypeId}
            onChange={handleChangeSensorType}
            label="Sensor Type"
          >
            {props.sensorsType.map(item => (<MenuItem value={item.id}> {item.parameter}  </MenuItem>))}
          </Select>
        </FormControl>
        <FormControl className={classes.textField0} variant="outlined">
          <InputLabel htmlFor="logic" classes={{ root: classes.textField1, shrink: classes.textField3 }} >Alert Conditions</InputLabel>
          <OutlinedInput
            classes={{ root: classes.textField2 }}
            id="outlined-adornment-constraints"
            type={'text'}
            multiline={true}
            rows={2}
            value={props.addSensorUpdate.alertConditions}
            onChange={handleChangeConstraint}
            label="Alert Conditions"

          />
        </FormControl>


        <FormControl className={classes.textField0} variant="outlined">
          <InputLabel htmlFor="logic" classes={{ root: classes.textField1, shrink: classes.textField3 }} >Description</InputLabel>
          <OutlinedInput
            classes={{ root: classes.textField2 }}
            id="outlined-adornment-constraints"
            type={'text'}
            multiline={true}
            rows={2}
            value={props.addSensorUpdate.description}
            onChange={handleChangeDescription}
            label="Description"
          />
        </FormControl>
        <div>
          <Button variant="contained" color="primary" style={{ width: '94%', height: '4vh', fontSize: '0.8vw', minWidth: 0 }}
            onClick={e => handleAddSensorButton(e)}
          >
            {props.updateSensorIndex != -1 ? "Update Sensor" : "Add Sensor"}
          </Button>
          <Button variant="contained" color="secondary" style={props.updateSensorIndex != -1 ? { width: '19%', height: '4vh', fontSize: '0.8vw', minWidth: 0 } : { display: 'none' }}
            onClick={e => handleCancelButton(e)}
          >
            {"X"}
          </Button>
        </div>

      </div>


      <div style={{ float: 'left', width: '30%', marginBottom: '2rem', overflow: 'auto', maxHeight: 320 }}>
        <List dense={true}>
          {props.sensorsUpdate.map((item, index) => (
            <>
              <ListItem label={index}>
                <ListItemAvatar>
                  <Avatar src={sensorIcon}>
                    <sensorIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={<><Typography style={{ fontSize: '0.8vw' }}>{item.sensorCode}</Typography></>}
                  secondary={<><Typography style={{ fontSize: '0.6vw' }}>{findSensorParameter(item.sensorTypeId)} <br /> {item.alertConditions}<br /> {item.description} </Typography></>}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label={"edit" + String(index)} onClick={e => handleEditSensorButton(e, index)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label={"delete" + String(index)} style={{ marginLeft: '1rem' }} onClick={e => handleDeleteSensorButton(e, index)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </>
          ))}
        </List>
      </div>
    </div>
  );
};

export default FormUpdateSite;