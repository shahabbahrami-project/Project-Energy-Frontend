import React, { useState, useEffect } from "react";
import useStyles from "../styles";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import {  updateSensor } from "../../../api/api_sensors";
import WarningIcon from "@material-ui/icons/Warning";
import { toast } from "react-toastify";
import Draggable, { DraggableCore } from "react-draggable";

const Sensor = (props) => {
  const img = document.getElementById("systemImage");
  const classes = useStyles();
  const sensor = props.sensor;
  const [x, setX] = useState(props.sensor.fromLeft);
  const [y, setY] = useState(props.sensor.fromTop);
  const [visibilityClose, setVisibilityClose] = useState(false);
  const mouseEnterHandle = () => {
    setVisibilityClose(true);
  };
  const mouseLeaveHandle = () => {
    setVisibilityClose(false);
  };
  return (
    <Draggable
      bounds="parent"
      onStop={(e, ui) => {
        let width = img.clientWidth;
        let height = img.clientHeight;
        let lastX = ui.x;
        let lastY = ui.y;
        if (ui.x.toString()[0] === "-") {
          lastX = Number(lastX.toString().slice(1));
        }
        if (ui.y.toString()[0] === "-") {
          lastY = Number(lastY.toString().slice(1));
        }
        let PercentX = (lastX * 100) / width;
        let PercentY = (lastY * 100) / height;
        let newX, newY;
        if (ui.x.toString()[0] === "-") {
          newX = x - PercentX;
        } else {
          newX = x + PercentX;
        }
        if (ui.y.toString()[0] === "-") {
          newY = y - PercentY;
        } else {
          newY = y + PercentY;
        }
        if (newX.toString()[0] === "-") {
          newX = Number(newX.toString().slice(1));
        }
        if (newY.toString()[0] === "-") {
          newY = Number(newY.toString().slice(1));
        }
        let s = props.sensor;
        s.fromLeft = Number(newX.toFixed(0));
        s.fromTop = Number(newY.toFixed(0));
        s.description = "null";
        updateSensor(s, (isOk, data) => {
          if (!isOk) {
            return toast.error("Server is not responding!");
          }
        });
      }}
    >
      <div
        className={classes.sensorStyle}
        onPointerEnter={mouseEnterHandle}
        onPointerLeave={mouseLeaveHandle}
        style={{
          left: `${x}%`,
          top: `${y}%`,
        }}
      >
        {sensor.status == false ? (
          ""
        ) : (
          <WarningIcon
            color="error"
            style={{ fontSize: "1.1vw", marginLeft: "0.1vw" }}
          />
        )}
        {sensor.sensorCode}{" "}
        {visibilityClose ? (
          <CancelRoundedIcon
            style={{ fontSize: "1.1vw", cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation();
              props.setImageLoading(true) ;
              props.setEnableSensors([]);

              let disableSensors = props.disableSensors;
              let enableSensors = props.enableSensors;
              let s = props.sensor;
              s.fromLeft = null;
              s.fromTop = null;
              s.description = "null";
              updateSensor(s, (isOk, data) => {
                if (!isOk) {
                  // return toast.error("Server is not responding!");
                  return toast.error(" sensor delete!");
                } else {
                  disableSensors.push(sensor);
                  enableSensors = enableSensors.filter(
                    (d) => d.id !== sensor.id,
                  );
                  props.setDisableSensors(disableSensors);
                  props.setEnableSensors(enableSensors);
                  props.setImageLoading(false) ;

                  //   getSensorsBySiteId(props.site.id, (isOk, data) => {
                  //     if (!isOk) {
                  //       // return toast.error("Server is not responding!");
                  //       return toast.error("getSensorsBySiteId site tree!");
                  //     } else {
                  //       let sensors = [];
                  //       let enableSensors = [];
                  //       let disableSensors = [];
                  //       if (data) {
                  //         data.map(function (s) {
                  //           if (s.fromLeft === null) {
                  //             disableSensors.push(s);
                  //           } else {
                  //             enableSensors.push(s);
                  //           }
                  //         });
                  //         props.setSensors(data);
                  //         props.setEnableSensors(enableSensors);
                  //         props.setDisableSensors(disableSensors);
                  //       } else {
                  //         return toast.error("No sensors found for this site!");
                  //       }
                  //     }
                  //   });
                }
              });
              props.setContextMenu(false);
            }}
          />
        ) : null}
      </div>
    </Draggable>
  );
};

export default Sensor;
