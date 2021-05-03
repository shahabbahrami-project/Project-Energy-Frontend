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
import ChartIcon from "@material-ui/icons/Timeline";
import { getSensorDataFilter, getSensorsBySiteId } from "../../../../api/api_sensors";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { toast } from "react-toastify";

const SensorsListRight = (props) => {
    const classes = useStyles();

    const [data, updateData] = useState([]);
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      const interval = setInterval(() => {
        getSensorsBySiteId(props.site.id, (isOk, data) => {
            if (!isOk) {
              return toast.error("Could not update sensors list!");
            } else {
              if (data) {
                props.setSensors(data);
            }
            else {
                return toast.error("No sensors found for this site!");
              }
            }
        })
      }, 300000);
      return () => {
        window.clearInterval(interval);
      };
    }, [props.sensors]);

    const handleEditSensorValue = (
        e,
        sensorID,
        sensorCode,
        sensorTypeId,
        siteId,
      ) => {
        var dateNow = new Date();
        console.log('date',dateNow)
        if (sensorTypeId == 4) {
          props.setSensorDataUpdate({
            ...props.sensorDataUpdate,
            siteName: props.site.siteName,
            reportDateTime: dateNow.toISOString(),
            sensors:[{sensorCode:sensorCode,sensorValue:null}]
          });
          console.log(props.sensorDataUpdate)
          props.setOpenSensorModal(true);
        }
      };


      const handleChartButton = (e, sensorID, sensorCode) => {
        var dateNow = new Date();
        var datePast = new Date();
        var dateShift = dateNow.getDate() - 30;
        datePast.setDate(dateShift);
        const isoDateNow = dateNow.toISOString();
        const isoDatePast = datePast.toISOString();
        const filter = {
          sensorId: sensorID,
          reportDateTimeStart: isoDatePast,
          reportDateTimeEnd: isoDateNow,
        };
        getSensorDataFilter(filter, (isOk, data) => {
          if (!isOk) {
            return toast.error("could not get sensor data!");
          } else {
            console.log(data);
            props.setSensorData(data);
            props.setSensorDataFilter({
              sensorID: sensorID,
              sensorCode: sensorCode,
              startDate: isoDatePast,
              endDate:  isoDateNow,
            });
          }
        });
      };
      function findSensorParameter(id) {
        var parameter = "";
        props.sensorsType.forEach((element) => {
          if (element.id == id) {
            parameter =
              String(element.parameter) + " (" + String(element.unit) + ")";
          }
        });
        return parameter;
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

    return (
        <List dense={true}>
            {props.sensors.map((item, index) => (
                <>
                    <ListItem label={index}>
                        <ListItemText
                            primary={
                                <>
                                    <Typography style={{ fontSize: "0.8vw" }}>
                                        {item.sensorCode}
                                    </Typography>
                                </>
                            }
                            secondary={
                                <>
                                    <Typography style={{ fontSize: "0.6vw" }}>
                                        {findSensorParameter(item.sensorTypeId)} <br />{" "}
                                        {item.description}<br />{" "}
                                        {item.alertConditions}
                                    </Typography>
                                </>
                            }
                        />
                        <ListItemSecondaryAction>
                            <Button
                                variant="text"
                                color="primary"
                                edge="end"
                                aria-label={"edit" + String(index)}
                                style={{ textTransform: "none", fontSize: "0.7vw" }}
                                startIcon={
                                    item.sensorTypeId == 4 ? (
                                        <EditIcon
                                            style={{
                                                width: "1.2vw",
                                                height: "1.2vw",
                                                marginRight: "3px",
                                            }}
                                        />
                                    ) : (
                                        false
                                    )
                                }
                                onClick={(e) =>
                                    handleEditSensorValue(
                                        e,
                                        item.id,
                                        item.sensorCode,
                                        item.sensorTypeId,
                                        item.siteId,
                                    )
                                }
                            >
                                {item.sensorValue == null
                                    ? "(No Data)"
                                    : item.sensorValue.toFixed(3)}{" "}
                                {findSensorUnit(item.sensorTypeId)}
                            </Button>

                            <IconButton
                                color="primary"
                                edge="end"
                                aria-label={"edit" + String(index)}
                                onClick={(e) =>
                                    handleChartButton(e, item.id, item.sensorCode)
                                }
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
                                classes={
                                    item.status == "OK"
                                        ? { colorSecondary: classes.colorNormal }
                                        : item.status == "notOK"
                                            ? { colorSecondary: classes.colorAlert }
                                            : { colorSecondary: classes.colorNull }
                                }
                            // onClick={e => handleDeleteSensorButton(e, index)}
                            >
                                {/* <AlertIcon style={{width:'1vw', height:'1vw'}}/> */}
                                {item.status == "OK" ? (
                                    <NormalIcon
                                        style={{ width: "1vw", height: "1vw" }}
                                    />
                                ) : item.status == "notOK" ? (
                                    <AlertIcon
                                        style={{ width: "1vw", height: "1vw" }}
                                    />
                                ) : (
                                    <HelpIcon
                                        style={{ width: "1vw", height: "1vw" }}
                                    />
                                )}
                                {/* <NormalIcon style={{ width: '1.2vw', height: '1.2vw' }} /> */}
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </>
            ))}
        </List>

    );
}

export default SensorsListRight;






