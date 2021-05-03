import React from "react";
import { Typography } from "@material-ui/core";
import useStyles from "./styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import sensorIcon from "./sensor.svg";
import OutlinedInput from '@material-ui/core/OutlinedInput';
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
import { toast } from "react-toastify";


const FormAddSite = (props) => {
  const classes = useStyles();
  const [updateSensorIndex, setUpdateSensorIndex] = React.useState(-1);


  const handleChangesensorCode = (event) => {
    const nameNew = { ...props.addSensor, sensorCode: event.target.value };
    props.setAddSensor(nameNew);
  };
  const handleChangeSensorType = (event) => {
    const sensortType = { ...props.addSensor, sensorTypeId: event.target.value };
    props.setAddSensor(sensortType);
  };

  const handleChangeConstraint = (event) => {
    const sensorCondition = { ...props.addSensor, alertConditions: event.target.value };
    props.setAddSensor(sensorCondition);
  };

  const handleChangeDescription = (event) => {
    const sensorDescription = { ...props.addSensor, description: event.target.value };
    props.setAddSensor(sensorDescription);
  };

  const handleChangeWaterWaste = (event) => {
    const waterWaste = { ...props.addSite, features: { ...props.addSite.features, waterOrWaste: event.target.value } };
    props.addSiteSet(waterWaste);
  };

  const handleChangeWellSurface = (event) => {
    const wellSurface = { ...props.addSite, features: { ...props.addSite.features, wellOrSurface: event.target.value } };
    props.addSiteSet(wellSurface);
  };

  const handleChangeLat = (event) => {
    const latNew = { ...props.addSite, features: { ...props.addSite.features, locationY: event.target.value } };
    props.addSiteSet(latNew);
  };


  const handleChangeLong = (event) => {
    const longNew = { ...props.addSite, features: { ...props.addSite.features, locationX: event.target.value } };
    props.addSiteSet(longNew);
  };

  const handleChangeTimeZone = (event) => {
    const timezone = { ...props.addSite, features: { ...props.addSite.features, TimeZoneInfoID: event.target.value } };
    props.addSiteSet(timezone);
  };
  const handleChangeSiteName = (event) => {
    const nameNew = { ...props.addSite, features: { ...props.addSite.features, siteName: event.target.value } };
    props.addSiteSet(nameNew);
  };

  const handleChangeCity = (event) => {
    const cityNew = { ...props.addSite, features: { ...props.addSite.features, city: event.target.value } };
    props.addSiteSet(cityNew);
  };

  const handleChangePumpEnergy = (event) => {
    const energyNew = { ...props.addSite, features: { ...props.addSite.features, PumpEnergy: Number(event.target.value) } };
    props.addSiteSet(energyNew);
  };

  const handleChangeTank = (event) => {
    const tankNew = { ...props.addSite, features: { ...props.addSite.features, VolumeOfTanks: Number(event.target.value) } };
    props.addSiteSet(tankNew);
  };

  const handleChangePopulation = (event) => {
    const peopleNew = { ...props.addSite, features: { ...props.addSite.features, People: Number(event.target.value) } };
    props.addSiteSet(peopleNew);
  };

  const handleChangeHome = (event) => {
    const homeNew = { ...props.addSite, features: { ...props.addSite.features, NumberOfHomes: Number(event.target.value) } };
    props.addSiteSet(homeNew);
  };

  const handleCancelButton = (e) => {
    props.setAddSensor({ sensorCode: "", sensorTypeId: '', siteId: null, alertConditions: "",description:"", sensorValue: null, status: null, fromLeft: null, fromTop: null, isDeleted: false })
    setUpdateSensorIndex(-1)
  }

  const handleAddSensorButton = (e) => {
    if (updateSensorIndex == -1) {
      if (props.addSensor.description!=""){
      const newSensorsArray = [...props.sensors, props.addSensor]
      props.setSensors(newSensorsArray)
      props.setAddSensor({ sensorCode: "", sensorTypeId: '', siteId: null, alertConditions: "", description:"", sensorValue: null, status: null, fromLeft: null, fromTop: null, isDeleted: false })
      }
      else{
        toast.error("Please include a proper description for this sensor");
      }
    }
    else {
      const sensorsArray = props.sensors
      sensorsArray[updateSensorIndex] = props.addSensor
      props.setSensors(sensorsArray)
      props.setAddSensor({ sensorCode: "", sensorTypeId: '', siteId: null, alertConditions: "",description:"", sensorValue: null, status: null, fromLeft: null, fromTop: null, isDeleted: false })
      setUpdateSensorIndex(-1)
    }
  }


  const handleEditSensorButton = (e, index) => {
    props.setAddSensor({ sensorCode: props.sensors[index].sensorCode, sensorTypeId: props.sensors[index].sensorTypeId, siteId: null, alertConditions: props.sensors[index].alertConditions,description:props.sensors[index].description, sensorValue: null, status: null, fromLeft: null, fromTop: null, isDeleted: false })
    setUpdateSensorIndex(index);
  }


  const handleDeleteSensorButton = (e, index) => {
    const updatedsensors = props.sensors.slice(0, index).concat(props.sensors.slice(index + 1, props.sensors.length))
    props.setSensors(updatedsensors)
    props.setAddSensor({ sensorCode: "", sensorTypeId: "", siteId: null, alertConditions: "", sensorValue: null, status: null, fromLeft: null, fromTop: null, isDeleted: false })
    setUpdateSensorIndex(-1)
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
            value={props.addSite.features.locationY}
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
            value={props.addSite.features.locationX}
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
            value={props.addSite.features.TimeZoneInfoID}
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
            value={props.addSite.features.siteName}
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
            value={props.addSite.features.city}
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
            value={props.addSite.features.People}
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
            value={props.addSite.features.NumberOfHomes}
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
            value={props.addSite.features.waterOrWaste}
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
            value={props.addSite.features.wellOrSurface}
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
            value={props.addSite.features.PumpEnergy}
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
            value={props.addSite.features.VolumeOfTanks}
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
            id="outlined-adornment-sensorCode"
            type={'text'}
            value={props.addSensor.sensorCode}
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
            value={props.addSensor.sensorTypeId}
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
            value={props.addSensor.alertConditions}
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
            value={props.addSensor.description}
            onChange={handleChangeDescription}
            label="Description"
          />
        </FormControl>

        <div>
          <Button variant="contained" color="primary" style={{ width: '94%', height: '4vh', fontSize: '0.8vw', minWidth: 0 }}
            onClick={e => handleAddSensorButton(e)}
          >
            {updateSensorIndex != -1 ? "Update Sensor" : "Add Sensor"}
          </Button>
          <Button variant="contained" color="secondary" style={updateSensorIndex != -1 ? { width: '19%', height: '4vh', fontSize: '0.8vw', minWidth: 0 } : { display: 'none' }}
            onClick={e => handleCancelButton(e)}
          >
            {"X"}
          </Button>
        </div>

      </div>

      <div style={{ float: 'left', width: '30%', marginBottom: '2rem', overflow: 'auto', maxHeight: 320 }}>
        <List dense={true}>
          {props.sensors.map((item, index) => (
            <>
              <ListItem label={index}>
                <ListItemAvatar>
                  <Avatar src={sensorIcon}>
                    <sensorIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={<><Typography style={{ fontSize: '0.8vw' }}>{item.sensorCode}</Typography></>}
                  secondary={<><Typography style={{ fontSize: '0.6vw' }}>{findSensorParameter(item.sensorTypeId)} <br /> {item.alertConditions} <br /> {item.description} </Typography></>}
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



export default FormAddSite;