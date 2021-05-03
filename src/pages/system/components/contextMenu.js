import React from "react";
import useStyles from "../styles";
import { updateSensor } from "../../../api/api_sensors";
import { toast } from "react-toastify";

const ContextMenu = (props) => {
  const classes = useStyles();
  const x = props.x;
  const y = props.y;
  return (
    <div
      className={classes.contextMenu}
      style={{
        top: `${y}%`,
        left: `${x}%`,
      }}
    >
      {props.disableSensors.length > 0
        ? props.disableSensors.map(function (s) {         
            return (
              <div
                className={classes.contextMenuItem}
                onClick={() =>{
                  console.log(s)
                    let disableSensors = props.disableSensors;
                    let enableSensors = props.enableSensors;
                    s.fromLeft = Number(props.x.toFixed(0));
                    s.fromTop = Number(props.y.toFixed(0));  
                    s.description = "null" ;                 
                    updateSensor(s, (isOk, data) => {
                    if (!isOk) {
                        // return toast.error("Server is not responding!");
                        return toast.error("context Menu!");
                    } else {
                        enableSensors.push(s);
                        disableSensors = disableSensors.filter(
                        (d) => d.id !== s.id,
                        );
                        props.setDisableSensors(disableSensors);
                        props.setEnableSensors(enableSensors);
                    }
                    });
          
                    props.setContextMenu(false);
                }}
              >
                {s.sensorCode}
              </div>
            );
          })
        : (<div className={classes.contextMenuItem} onClick={()=>props.setContextMenu(false)}>No sensors found</div>)}
    </div>
  );
};

export default ContextMenu;
