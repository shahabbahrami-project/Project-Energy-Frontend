import React from "react";
import { Typography } from "@material-ui/core";
import useStyles from "./styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import sensorIcon from "./sensor.svg";
import tempIcon from "./tempicon.png";
import hvacIcon from "./hvac.png";
import pumpIcon from "./pump.png";
import humidityIcon from "./humidity.png";
import spaceIcon from "./space.png";
import motionIcon from "./motion-sensor.png";
import lightIcon from "./light.png";
import lightingIcon from "./lighting.png";
import phevIcon from "./phev.png";
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
import Checkbox from '@material-ui/core/Checkbox';
import { toast } from "react-toastify";
import { parseISO, format } from "date-fns";

import { retrieveSensorsList, addSensor, updateSensor, deleteSensor } from "../../../../api/api_sensors_energy";
import { retrieveDevicesList, addDevice, updateDevice, deleteDevice } from "../../../../api/api_devices_energy";
const FormAddSensor = (props) => {

  var dateNowTemp = new Date();
  var dateNow = dateNowTemp.toJSON()
  const classes = useStyles();
  const user_id = Number(localStorage.getItem('user_id'))



  /////////////////////////////////////////////////////////////////////////
  /////////////////////// Sensors Functions //////////////////////////////
  ////////////////////////////////////////////////////////////////////////

  const [updateSensorIndex, setUpdateSensorIndex] = React.useState(-1);
  const [addSensorTemp, setAddSensorTemp] = React.useState({ name: "", type: "", user: user_id, lastRealValue: 0, lastAlgoValue: 0, lastTimeValue: dateNow, created_at: dateNow });
  const [sensorID, setSensorID] = React.useState()


  const handleChangeSensorCode = (event) => {
    const nameNew = { ...addSensorTemp, name: event.target.value };
    setAddSensorTemp(nameNew);
  };

  const handleChangeSensorType = (event) => {
    const sensorType = { ...addSensorTemp, type: event.target.value };
    setAddSensorTemp(sensorType);
  };

  const handleCancelButton = (e) => {
    setAddSensorTemp({ name: "", type: "", user: user_id, lastRealValue: 0, lastAlgoValue: 0, lastTimeValue: dateNow, created_at: dateNow })
    setUpdateSensorIndex(-1)
  }

  const handleAddSensorButton = (e) => {
    if (updateSensorIndex == -1) {
      const newSensor = { name: addSensorTemp.name, type: findSensorTypeID(addSensorTemp.type), user: addSensorTemp.user, lastRealValue: 0, lastAlgoValue: 0, lastTimeValue: dateNow, created_at: dateNow }
      addSensor(newSensor, (isOk, data) => {
        if (!isOk) {
          return toast.error("Server is not responding for adding device!");
        }
        else {
          retrieveSensorsList((isOk, data) => {
            if (!isOk) {
              return toast.error("Server is not responding for getting devices list!");
            }
            else {
              props.setSensors(data)
              return toast.success("Sensors list is imported from database!");
            }
          })
          return toast.success("Sensors list has been updated in database!");
        }
      })

      setAddSensorTemp({ name: "", type: "", user: user_id, lastRealValue: 0, lastAlgoValue: 0, lastTimeValue: dateNow, created_at: dateNow })
    }
    else {

      const updatedSensor = { name: addSensorTemp.name, type: findSensorTypeID(addSensorTemp.type), user: addSensorTemp.user, lastRealValue: addSensorTemp.lastRealValue, lastAlgoValue: addSensorTemp.lastAlgoValue, lastTimeValue: addSensorTemp.lastTimeValue, created_at: addSensorTemp.created_at }
      console.log(updatedSensor)
      updateSensor(updatedSensor, deviceID, (isOk, data) => {
        if (!isOk) {
          return toast.error("Server is not responding for updating device!");
        }
        else {
          retrieveSensorsList((isOk, data) => {
            if (!isOk) {
              return toast.error("Server is not responding for updating devices list!");
            }
            else {
              props.setSensors(data)
              return toast.success("Sensors list is imported from database!");
            }
          })
          return toast.success("Sensors list has been updated in database!");
        }
      })
      setAddSensorTemp({ name: "", type: "", user: user_id, lastRealValue: 0, lastAlgoValue: 0, lastTimeValue: dateNow, created_at: dateNow })
      setUpdateSensorIndex(-1)
    }
  }


  const handleEditSensorButton = (e, index, id) => {
    setSensorID(id)
    setAddSensorTemp({ name: props.sensors[index].name, type: findSensorParameter(props.sensors[index].type), user: props.sensors[index].user, lastRealValue: props.sensors[index].lastRealValue, lastAlgoValue: props.sensors[index].lastAlgoValue, lastTimeValue: props.sensors[index].lastTimeValue, created_at: props.sensors[index].created_at })
    setUpdateSensorIndex(index);
  }


  const handleDeleteSensorButton = (e, index, id) => {
    deleteSensor(id, (isOk, data) => {
      if (!isOk) {
        return toast.error("Server is not responding for deleting device!");
      }
      else {
        retrieveSensorsList((isOk, data) => {
          if (!isOk) {
            return toast.error("Server is not responding for deleting devices list!");
          }
          else {
            props.setSensors(data)
            return toast.success("Sensors list is imported from database!");
          }
        })
        return toast.success("Sensors list has been updated in database!");
      }
    })
    setAddSensorTemp({ name: "", type: "", user: user_id, lastRealValue: 0, lastAlgoValue: 0, lastTimeValue: dateNow, created_at: dateNow })
    setUpdateSensorIndex(-1)
  }


  function findSensorParameter(id) {
    var parameter = "";
    props.sensorsType.forEach(element => {
      if (element.id == id) {
        parameter = String(element.name);
      }
    });
    return parameter
  }

  function findSensorTypeID(name) {
    var id = "";
    props.sensorsType.forEach(element => {
      if (element.name == name) {
        id = Number(element.id);
      }
    });
    return id
  }

  function convertDate(date) {
    const Date2 = format(parseISO(date), "yyy-MM-dd hh:mm:ss");
    return Date2;
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


  /////////////////////////////////////////////////////////////////////////
  /////////////////////// Devices Functions //////////////////////////////
  ////////////////////////////////////////////////////////////////////////

  const [updateDeviceIndex, setUpdateDeviceIndex] = React.useState(-1);
  const [addDeviceTemp, setAddDeviceTemp] = React.useState({ name: "", type: "", user: user_id, sensors: [], stateReal: "On", stateAlgo: "On", lastRealPowerValue: 12.0, lastAlgoPowerValue: 12.0, costReal: 0, costAlgo: 0, lastTimeValue: dateNow, created_at: dateNow });
  const [deviceID, setDeviceID] = React.useState()

  const [checked, setChecked] = React.useState([]);
  const [checkedSensors, setCheckedSensors]=React.useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    // console.log(checked)
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    var sensorsCheckedArray=[]
    const sensorsIDs= props.sensors.map(item=>item.id)
    sensorsCheckedArray=newChecked.map(Index => sensorsIDs[Index])
    setCheckedSensors(sensorsCheckedArray)
    const sensorsNew = { ...addDeviceTemp, sensors: sensorsCheckedArray };
    setAddDeviceTemp(sensorsNew);
    // console.log(sensorsCheckedArray)
  };






  const handleChangeDeviceCode = (event) => {
    const nameNew = { ...addDeviceTemp, name: event.target.value };
    setAddDeviceTemp(nameNew);
  };

  const handleChangeDeviceType = (event) => {
    const devicetType = { ...addDeviceTemp, type: event.target.value };
    setAddDeviceTemp(devicetType);
  };

  const handleCancelDeviceButton = (e) => {
    setAddDeviceTemp({ name: "", type: "", user: user_id, sensors: [], stateReal: "On", stateAlgo: "On", lastRealPowerValue: 12.0, lastAlgoPowerValue: 12.0, costReal: 0, costAlgo: 0, lastTimeValue: dateNow, created_at: dateNow  })
    setChecked([])
    setUpdateDeviceIndex(-1)
  }
  const handleAddDeviceButton = (e) => {
    if (updateDeviceIndex == -1) {
      const newDevice = { name: addDeviceTemp.name, type: findDeviceTypeID(addDeviceTemp.type), user: addDeviceTemp.user, sensors: addDeviceTemp.sensors, stateReal: "On", stateAlgo: "On", lastRealPowerValue: 12.0, lastAlgoPowerValue: 12.0, costReal: 0, costAlgo: 0, lastTimeValue: dateNow, created_at: dateNow} 
      addDevice(newDevice, (isOk, data) => {
        if (!isOk) {
          return toast.error("Server is not responding for adding device!");
        }
        else {
          retrieveDevicesList((isOk, data) => {
            if (!isOk) {
              return toast.error("Server is not responding for getting devices list!");
            }
            else {
              props.setDevices(data)
              return toast.success("Devices list is imported from database!");
            }
          })
          return toast.success("Devices list has been updated in database!");
        }
      })

      setAddDeviceTemp({ name: "", type: "", user: user_id, sensors: [], stateReal: "On", stateAlgo: "On", lastRealPowerValue: 12.0, lastAlgoPowerValue: 12.0, costReal: 0, costAlgo: 0, lastTimeValue: dateNow, created_at: dateNow })
      setChecked([])
    }
    else {

      const updatedDevice = { name: addDeviceTemp.name, type: findDeviceTypeID(addDeviceTemp.type), user: addDeviceTemp.user, sensors: addDeviceTemp.sensors, stateReal: addDeviceTemp.stateReal, stateAlgo: addDeviceTemp.stateAlgo, lastRealPowerValue: addDeviceTemp.lastRealPowerValue, lastAlgoPowerValue: addDeviceTemp.lastAlgoPowerValue, costReal: addDeviceTemp.costReal, costAlgo: addDeviceTemp.costAlgo, lastTimeValue: addDeviceTemp.lastTimeValue, created_at: addDeviceTemp.created_at}
      console.log(updatedDevice)
      updateDevice(updatedDevice, deviceID, (isOk, data) => {
        if (!isOk) {
          return toast.error("Server is not responding for updating device!");
        }
        else {
          retrieveDevicesList((isOk, data) => {
            if (!isOk) {
              return toast.error("Server is not responding for updating devices list!");
            }
            else {
              props.setDevices(data)
              return toast.success("Devices list is imported from database!");
            }
          })
          return toast.success("Devices list has been updated in database!");
        }
      })
      setAddDeviceTemp({name: "", type: "", user: user_id, sensors: [], stateReal: "On", stateAlgo: "On", lastRealPowerValue: 12.0, lastAlgoPowerValue: 12.0, costReal: 0, costAlgo: 0, lastTimeValue: dateNow, created_at: dateNow })
      setUpdateDeviceIndex(-1)
    }
  }


  function findDeviceParameter(id) {
    var parameter = "";
    props.devicesType.forEach(element => {
      if (element.id == id) {
        parameter = String(element.name);
      }
    });
    return parameter
  }

  function findDeviceTypeID(name) {
    var id = "";
    props.devicesType.forEach(element => {
      if (element.name == name) {
        id = Number(element.id);
      }
    });
    return id
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

  /////////////////////////////////////////////////////////////////////////
  /////////////////////// Main Return //////////////////////////////////
  ////////////////////////////////////////////////////////////////////////


  return (
    <div className={classes.formDivStyle}>

      <div style={{ float: 'left', width: '16%', marginBottom: '2rem', }}>

        <FormControl className={classes.textField0} variant="outlined">
          <InputLabel htmlFor="deviceName" classes={{ root: classes.textField1, shrink: classes.textField3 }} >Sensor Name</InputLabel>
          <OutlinedInput
            classes={{ root: classes.textField2 }}
            id="outlined-adornment-deviceCode"
            type={'text'}
            value={addSensorTemp.name}
            onChange={handleChangeSensorCode}
            label={"Sensor Name"}
          />
        </FormControl>

        <FormControl variant="outlined" className={classes.textField0}  >
          <InputLabel id="demo-simple-select-outlined-label" classes={{ root: classes.textField1, shrink: classes.textField3 }}  >Sensor Type</InputLabel>
          <Select
            classes={{ root: classes.selectField2 }}
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={addSensorTemp.type}
            onChange={handleChangeSensorType}
            label="Sensor Type"
          >

            {props.sensorsType.map(item => (<MenuItem value={item.name}> {item.name}  </MenuItem>))}
          </Select>
        </FormControl>
        <div>
          <Button variant="contained" color="primary" style={{ width: '94%', height: '4vh', fontSize: '0.8vw', minWidth: 0, marginTop: '2vh' }}
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

      <div style={{ float: 'left', width: '30%', marginBottom: '2rem', overflow: 'auto', maxHeight: 610, marginRight: '3vw' }}>
        <div>
          <Button variant="contained" color="primary" style={{ width: '100%', height: '4vh', fontSize: '0.8vw', minWidth: 0, marginTop: '1.5vh' }}
            onClick={e => retrieveSensorsListHandle(e)}
          >
            Referesh Sensors List Now!
          </Button>
        </div>
        <List dense={true}>
          {props.sensors.map((item, index) => (
            <>
              <ListItem label={index}>
                <ListItemAvatar>
                  <Avatar variant="square" src={findSensorParameter(item.type) == "Temperature" ? tempIcon : findSensorParameter(item.type) == "Light" ? lightIcon : findSensorParameter(item.type) == "Humidity" ? humidityIcon : findSensorParameter(item.type) == "Space" ? spaceIcon : motionIcon}>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={<><Typography style={{ fontSize: '0.8vw' }}>{item.name}</Typography></>}
                  secondary={<><Typography style={{ fontSize: '0.6vw' }}>{findSensorParameter(item.type)} <br /> {convertDate(item.created_at)}  </Typography></>}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label={"edit" + String(index)} onClick={e => handleEditSensorButton(e, index, item.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label={"delete" + String(index)} style={{ marginLeft: '1rem' }} onClick={e => handleDeleteSensorButton(e, index, item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </>
          ))}
        </List>
      </div>



      <div style={{ float: 'left', width: '16%', marginBottom: '2rem', }}>

        <FormControl className={classes.textField0} variant="outlined">
          <InputLabel htmlFor="deviceName" classes={{ root: classes.textField1, shrink: classes.textField3 }} >Device Name</InputLabel>
          <OutlinedInput
            classes={{ root: classes.textField2 }}
            id="outlined-adornment-deviceCode"
            type={'text'}
            value={addDeviceTemp.name}
            onChange={handleChangeDeviceCode}
            label={"device Name"}
          />
        </FormControl>

        <FormControl variant="outlined" className={classes.textField0}  >
          <InputLabel id="demo-simple-select-outlined-label" classes={{ root: classes.textField1, shrink: classes.textField3 }}  >Device Type</InputLabel>
          <Select
            classes={{ root: classes.selectField2 }}
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={addDeviceTemp.type}
            onChange={handleChangeDeviceType}
            label="Device Type"
          >

            {props.devicesType.map(item => (<MenuItem value={item.name}> {item.name}  </MenuItem>))}
          </Select>
        </FormControl>

        <div style={{ float: 'left', width: '100%', marginBottom: '2rem', overflow: 'auto', maxHeight: 500 }}>
          <div>
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







        </div>
        <div>
            <Button variant="contained" color="primary" style={{ width: '94%', height: '4vh', fontSize: '0.8vw', minWidth: 0, marginTop: '2vh' }}
              onClick={e => handleAddDeviceButton(e)}
            >
              {updateDeviceIndex != -1 ? "Update Device" : "Add DEvice"}
            </Button>
            <Button variant="contained" color="secondary" style={updateDeviceIndex != -1 ? { width: '19%', height: '4vh', fontSize: '0.8vw', minWidth: 0 } : { display: 'none' }}
              onClick={e => handleCancelDeviceButton(e)}
            >
              {"X"}
            </Button>
          </div>
      </div>

      <div style={{ float: 'left', width: '30%', marginBottom: '2rem', overflow: 'auto', maxHeight: 610 }}>
        <div>
          <Button variant="contained" color="primary" style={{ width: '100%', height: '4vh', fontSize: '0.8vw', minWidth: 0, marginTop: '1.5vh' }}
            onClick={e => retrieveDevicesListHandle(e)}
          >
            Referesh Devices List Now!
         </Button>
        </div>
        <List dense={true}>
          {props.devices.map((item, index) => (
            <>
              <ListItem label={index}>
                <ListItemAvatar>
                  <Avatar variant="square" src={findDeviceParameter(item.type) == "HVAC" ? hvacIcon : findDeviceParameter(item.type) == "Lighting" ? lightingIcon : pumpIcon}>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={<><Typography style={{ fontSize: '0.8vw' }}>{item.name}</Typography></>}
                  secondary={<><Typography style={{ fontSize: '0.6vw' }}>{findDeviceParameter(item.type)} <br /> {convertDate(item.created_at)}  </Typography></>}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label={"edit" + String(index)} onClick={e => handleEditSensorButton(e, index, item.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label={"delete" + String(index)} style={{ marginLeft: '1rem' }} onClick={e => handleDeleteSensorButton(e, index, item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </>
          ))}
        </List>
      </div>








    </div >
  );
};



export default FormAddSensor;