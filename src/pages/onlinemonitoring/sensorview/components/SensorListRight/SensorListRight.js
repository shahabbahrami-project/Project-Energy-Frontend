import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import EditIcon from "@material-ui/icons/Edit";
import AlertIcon from "@material-ui/icons/NewReleases";
import NormalIcon from "@material-ui/icons/CheckCircle";
import HelpIcon from "@material-ui/icons/Help";
import tempIcon from "./tempicon.png";
import hvacIcon from "./hvac.png";
import pumpIcon from "./pump.png";
import humidityIcon from "./humidity.png";
import spaceIcon from "./space.png";
import motionIcon from "./motion-sensor.png";
import lightIcon from "./light.png";
import lightingIcon from "./lighting.png";
import phevIcon from "./phev.png";
import ChartIcon from "@material-ui/icons/Timeline";
import { getSensorDataFilter, getSensorsBySiteId } from "../../../../../api/api_sensors";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { toast } from "react-toastify";
import TuneIcon from '@material-ui/icons/Tune';
import { sensorsdata } from "../../../../../api/api_devices_energy";
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

const SensorsListRight = (props) => {
  const classes = useStyles();

  const [data, updateData] = useState([]);
  const [count, setCount] = useState(0);








  const handleChartButton = (e, id, name, sensors, type) => {
    const newdevice = { ...props.clickedDevice, id: id, name: name, sensors: sensors, type: type }
    props.setClickedDevice(newdevice)
    props.setOpenHistoryModal(true);
    console.log("Open Historical Chart Modal for device", id);
    console.log("clicekd device", newdevice)
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
  function findSensorParameter(id) {
    var parameter = "";
    props.sensorsType.forEach(element => {
      if (element.id == id) {
        parameter = String(element.name);
      }
    });
    return parameter
  }
  function findSensorUnit(id) {
    var parameter = "";
    props.sensorsType.forEach((element) => {
      if (element.id == id) {
        parameter = String(element.unit);
      }
    });
    return parameter;
  }

  function findSensorName(id) {
    var parameter = "";
    props.clickedSite.forEach(element => {
      if (element.id == id) {
        parameter = String(element.name);
      }
    });
    return parameter
  }

  const Train = (e, id, name, sensors, type) => {
    const newdevice = { ...props.clickedDevice, id: id, name: name, sensors: sensors, type: type }
    props.setClickedDevice(newdevice)
    props.setOpenTrainModal(true);
    console.log("Open Traning Modal for device", id);
  };


  return (
    <List dense={true}>
      {props.sensors.map((item, index) => (
        <>
          <ListItem label={index}>
            <ListItemAvatar>
              <Avatar variant="square" src={findSensorParameter(item.type) == "Temperature" ? tempIcon : findSensorParameter(item.type) == "Light" ? lightIcon : findSensorParameter(item.type) == "Humidity" ? humidityIcon : findSensorParameter(item.type) == "Space" ? spaceIcon : motionIcon}>
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <>
                  <Typography style={{ fontSize: "0.8vw" }}>
                    {item.name}
                  </Typography>
                </>
              }
            // secondary={
            //   <>
            //     <Typography style={{ fontSize: "0.6vw" }}>
            //       Type: {findDeviceParameter(item.type)} <br />{" "}
            //                           Status (Real): {item.stateReal}<br />{" "}
            //                           Status (Algo): {item.stateAlgo}
            //     </Typography>
            //   </>
            // }
            />
            <ListItemSecondaryAction>
              <Button
                variant="text"
                color="primary"
                edge="end"
                aria-label={"edit" + String(index)}
                style={{ textTransform: "none", fontSize: "0.7vw" }}
              >
                {/* {item.lastRealValue == null
                  ? "(No Data)"
                  : item.lastRealValue.toFixed(2)}{" "} */}
                {props.data != null && item.name.includes("Out")
                  ? props.data[props.data.length-1][0].outdoorTemp.toFixed(2) + " " + "°C"
                  : props.data != null && item.name.includes("Ind")
                  ? props.data[props.data.length-1][0].indoorTempManual.toFixed(2) + " " + "°C"
                  : props.data != null && item.name.includes("Count")
                  ? props.data[props.data.length-1][0].occupancy + " " + "People"
                  :"(No Data)"}
              </Button>


              {/* <IconButton
                color="primary"
                edge="end"
                aria-label={"edit" + String(index)}
              // onClick={(e) =>
              //   handleChartButton(e, item.id, item.name, item.sensors, item.type)
              // }
              >
                <ChartIcon
                  style={{ width: "1.2vw", height: "1.2vw" }}
                />
              </IconButton>
              <IconButton
                color="secondary"
                edge="end"
                aria-label={"delete" + String(index)}
                style={{ marginLeft: "0.5rem" }}
                classes={{ colorSecondary: classes.colorNormal }}
              // onClick={e => Train(e, item.id, item.name, item.sensors, item.type)}
              >
                {
                  <TuneIcon
                    style={{ width: "1.2vw", height: "1.2vw" }}
                  />
                }
              </IconButton> */}
            </ListItemSecondaryAction>


          </ListItem>
        </>
      ))}
    </List>

  );
}

export default SensorsListRight;






