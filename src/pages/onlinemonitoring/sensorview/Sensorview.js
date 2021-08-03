import React, { useState, useEffect } from "react";
import PageTitle from "../../../components/PageTitle/PageTitle";
import { toast } from "react-toastify";
import useStyles from "./styles";
import { MapContainer, Circle, Tooltip, Marker, TileLayer, useMap, useMapEvents } from "react-leaflet";
import TabMenu from "./components/TabMenu/TabMenu";
import SiteTree from "./components/SiteListBar/SiteTree";
import SensorsListRight from "./components/SensorListRight/SensorListRight";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import iconmarker from './markers/markernotadd.svg'
import iconmarkeroriginal from './markers/normal.svg'
import iconmarkerhover from './markers/normal_hover.svg'
import iconmarkeralarm from './markers/alarm.svg'
import iconmarkeralarmhover from './markers/alarm_hover.svg'
import iconmarkernull from './markers/null.svg'
import iconmarkernullhover from './markers/null_hover.svg'
import LinearProgress from '@material-ui/core/LinearProgress';
import { Icon } from "leaflet";
import { getDevicesType, retrieveDevicesList } from "../../../api/api_devices_energy";
import { getSensorsType, retrieveSensorsList } from "../../../api/api_sensors_energy";
import { allSites } from "../../../api/api_sites_energy";
import { getUserID } from "../../../api/api_user_energy";
import TrainInput from "./components/TrainModal/trainInput";
import HistoryInput from "./components/HistoricalModal/historyInput";
import smarthome from "./smarthomeupdate.svg";
import GaugeChart from 'react-gauge-chart'

//Markers on map
const custommarker = new Icon({
  iconUrl: iconmarker,
  iconSize: [30, 30],
  iconAnchor: [15, 28],
  popupAnchor: [0, -30]
});

const alarmicon = new Icon({
  iconUrl: iconmarkeralarm,
  iconSize: [75, 75],
  iconAnchor: [37, 62],
  popupAnchor: [2, -40]
})

const alarmhovericon = new Icon({
  iconUrl: iconmarkeralarmhover,
  iconSize: [75, 75],
  iconAnchor: [37, 62],
  popupAnchor: [2, -40]
})


const nullicon = new Icon({
  iconUrl: iconmarkernull,
  iconSize: [75, 75],
  iconAnchor: [37, 62],
  popupAnchor: [2, -40]
})

const nullhovericon = new Icon({
  iconUrl: iconmarkernullhover,
  iconSize: [75, 75],
  iconAnchor: [37, 62],
  popupAnchor: [2, -40]
})

const originalicon = new Icon({
  iconUrl: iconmarkeroriginal,
  iconSize: [75, 75],
  iconAnchor: [37, 62],
  popupAnchor: [2, -40]
})

const hovericon = new Icon({
  iconUrl: iconmarkerhover,
  iconSize: [75, 75],
  iconAnchor: [37, 62],
  popupAnchor: [0, -40]
})


//Main component for edit sites page
const Sensorview = (props) => {
  const classes = useStyles();
  const user_id = Number(localStorage.getItem('user_id'))
  var dateNowTemp = new Date();
  var dateNow = dateNowTemp.toJSON()
  //States 
  const [addSite, setAddSite] = useState({ features: { name: "", user: user_id, sensors: [], devices: [], locationX: "", locationY: "", link: "", timezone: "", created_at: dateNow, image: null }, markers: [] });
  const [sites, setSites] = useState([])
  const [sensorsType, setSensorsType] = useState([]);
  const [sensors, setSensors] = useState([]);
  const [devicesType, setDevicesType] = useState([]);
  const [devices, setDevices] = useState([]);
  const [clickedSite, setClickedSite] = useState({ id: null, name: "", user: user_id, sensors: [], devices: [], locationX: "", locationY: "", link: "", timezone: "", created_at: dateNow, image: null })
  const [openTrainModal, setOpenTrainModal] = useState(false);
  const [openHistoryModal, setOpenHistoryModal] = useState(false);

  const [filterSite, setFilterSite] = useState({ siteName: "", city: "", VisitFrom: null, VisitTo: null, waterOrWaste: "", wellOrSurface: "", status: null });
  const [cities, setCities] = useState([])

  const [center, setCenter] = useState([49.261198465253926, -123.24898713262935])
  const [toggleMapCenter, setToggleMapCenter] = useState(false)
  const [addSensor, setAddSensor] = useState({ sensorCode: "", description: "", sensorTypeId: "", siteId: null, alertConditions: "", sensorValue: null, status: null, fromLeft: null, fromTop: null, isDeleted: false });

  const [addSensorUpdate, setAddSensorUpdate] = useState({ sensorCode: "", description: "", sensorTypeId: '', siteId: null, alertConditions: "" });
  const [sensorsUpdate, setSensorsUpdate] = useState([]);
  const [selectedSiteId, setSelectedSiteId] = useState();
  const [flagSensorsType, setFlagSensorsType] = useState(true);
  const [updateSensorIndex, setUpdateSensorIndex] = React.useState(-1);
  const [progress, setProgress] = React.useState(0);

  const [clickedDevice, setClickedDevice] = useState({ id: null, name: "", user: user_id, sensors: [], numberofSensors: null, sensorsName: [] })

  let formProps = {
    ...props,

    filterSite: filterSite,
    setFilterSite: setFilterSite,
    cities: cities,
    setCities: setCities,
    center: center,
    setCenter: setCenter,
    toggleMapCenter: toggleMapCenter,
    setToggleMapCenter: setToggleMapCenter,
    clickedSite: clickedSite,
    setClickedSite: setClickedSite,
    addSensor: addSensor,
    setAddSensor: setAddSensor,

    updateSensorIndex: updateSensorIndex,
    setUpdateSensorIndex: setUpdateSensorIndex,
    sensorsUpdate: sensorsUpdate,
    setSensorsUpdate: setSensorsUpdate,
    addSensorUpdate: addSensorUpdate,
    setAddSensorUpdate: setAddSensorUpdate,
    selectedSiteId: selectedSiteId,
    setSelectedSiteId: setSelectedSiteId,

    sites: sites,
    setSites: setSites,
    addSiteSet: setAddSite,
    addSite: addSite,
    devicesType: devicesType,
    setDevicesType: setDevicesType,
    devices: devices,
    setDevices: setDevices,
    sensors: sensors,
    setSensors: setSensors,
    sensorsType: sensorsType,
    setSensorsType: setSensorsType,
    openTrainModal: openTrainModal,
    setOpenTrainModal: setOpenTrainModal,
    openHistoryModal: openHistoryModal,
    setOpenHistoryModal: setOpenHistoryModal,
    clickedDevice: clickedDevice,
    setClickedDevice: setClickedDevice,

  };


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////// Main funtionss to work with map //////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (flagSensorsType === true) {
      getUserID((isOk, data) => {
        if (!isOk) {
          return toast.error("Server is not responding for getting user id!");
        }
        else {
          localStorage.setItem('user_id', data.id)
        }
      })
      getSensorsType((isOk, data) => {
        if (!isOk) {
          return toast.error("Server is not responding for getting sensors types!");
        }
        else {
          setSensorsType(data)
        }
      })

      getDevicesType((isOk, data) => {
        if (!isOk) {
          return toast.error("Server is not responding for getting sensors types!");
        }
        else {
          setDevicesType(data)
        }
      })
      allSites((isOk, data) => {
        if (!isOk) {
          return toast.error("Server is not responding for getting sensors types!");
        }
        else {
          setSites(data)
        }
      })
    }
  }, [flagSensorsType]);

  //useEffect for progress loading bar on top of the page
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 100);
    return () => {
      clearInterval(timer);
    };
  }, []);


  //component for markers on map when clicking for new site




  function findDeviceType(id) {
    var parameter = "";
    if (devicesType) {
      devicesType.forEach(element => {
        if (element.id == id) {
          parameter = String(element.name);
        }
      });
      return parameter
    }

  }


  const retrieveSensorsListHandle = (e) => {
    retrieveSensorsList((isOk, data) => {
      if (!isOk) {
        return toast.error("Server is not responding for getting sensors list!");
      }
      else {
        var filtered = []
        if (props.clickedDevice) {
          const sensorids = props.clickedDevice.sensors
          filtered = data.map(item => { if (sensorids.includes(item.id)) { return item } })
          console.log("filtered", filtered)
          var filteredwithoutNull = filtered.filter(item => item)
          setSensors(filteredwithoutNull)
        }
        else {
          console.log(filtered)
          setSensors(data)
        }
        return toast.success("Sensors list is imported from database!");
      }
    })
  }

  return (
    <>

      <div className={classes.wrapperStyle}>

        <div className={classes.formDivStyle}>
          {/*           
          <div className={classes.formDivStyle2}>  
            <SiteTree {...formProps} />
          </div>

            <div>
              <TrainInput {...formProps} />
            </div>
            <div>
              <HistoryInput {...formProps} />
            </div> */}

          <div style={{ float: 'left', width: '50%', borderWidth: '0px', marginLeft: "1vw" }}>
            <div className={classes.mapDivStyle} >   {/* The map and its markers */}
              <div style={{ float: 'left', width: '50%', marginBottom: '0vw', }}>
                <img src={smarthome} alt="logo" style={findDeviceType(props.clickedDevice.type) === 'HVAC' ? { marginTop: '0vh', height: '36vw', marginLeft: '0vw', marginBottom: '0vw' } : { display: "none" }} />
              </div>
            </div>
          </div>
          <div className={classes.formDivStyleRightGraph} style={findDeviceType(props.clickedDevice.type) === 'HVAC' ? {} : { display: "none" }}>
          <div
              style={{ float: "left", width: "100%", marginBottom: "2rem", overflow: "auto", maxHeight: 596, }}
            >
          <GaugeChart id="gauge-chart1"
            nrOfLevels={20}
            percent={props.data.length!=0?0.01*props.data[props.data.length-1][0].indoorTempManual.toFixed(2):0}
            textColor={'black'}
            formatTextValue={value => value + '°C'}
          />
          <Typography style={{marginLeft:'5vw', padding:'2vw'}}>
            Indoor Temperature
          </Typography>
          </div>
          </div>

          <div className={classes.formDivStyleRight} id="systemFormDivRight">
            <div
              style={{ float: "right", width: "100%", marginBottom: "2rem", overflow: "auto", maxHeight: 596, }}
            >
              <div>
                <Button variant="contained" color="Secondary" style={{ width: '100%', height: '4vh', fontSize: '0.8vw', minWidth: 0, marginTop: '1.5vh' }}
                  onClick={e => retrieveSensorsListHandle(e)}
                >
                  Refresh Sensors List Now!
                </Button>
              </div>
              <div>
                <Typography variant="h6" style={{ padding: '1vw' }} color="primary">
                  List of Sensors for  {props.clickedDevice.name}
                </Typography>
              </div>
              <SensorsListRight {...formProps}></SensorsListRight>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sensorview;
