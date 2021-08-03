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
import { getSensorsType } from "../../../api/api_sensors_energy";
import { getDevicesType, retrieveDevicesList } from "../../../api/api_devices_energy";
import { allSites } from "../../../api/api_sites_energy";
import { getUserID } from "../../../api/api_user_energy";
import TrainInput from "./components/TrainModal/trainInput";
import HistoryInput from "./components/HistoricalModal/historyInput";

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
const Sitesview = (props) => {
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

  // const [clickedDevice, setClickedDevice] = useState({ id: null, name: "", user: user_id, sensors: [], numberofSensors:null, sensorsName:[]})

  let formProps = {...props,

    filterSite: filterSite,
    setFilterSite: setFilterSite,
    cities: cities,
    setCities: setCities,
    center: center,
    setCenter: setCenter,
    toggleMapCenter: toggleMapCenter,
    setToggleMapCenter: setToggleMapCenter,

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
    openTrainModal:openTrainModal,
    setOpenTrainModal:setOpenTrainModal,
    openHistoryModal:openHistoryModal,
    setOpenHistoryModal:setOpenHistoryModal,


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
  function LatLongComponent() {
    const map = useMapEvents({
      click(e) {
        const newMarker = e.latlng
        const newmarkerlist = addSite.markers.slice(0, -1)
        const latNew = { ...addSite, features: { ...addSite.features, locationX: newMarker.lng, locationY: newMarker.lat }, markers: [...newmarkerlist, newMarker] };
        setAddSite(latNew);
      },
    })
    return null
  }

  // Red circle around markers when clicking on list of sites
  const fillBlueOptions = { color: 'red', fillColor: 'red' }
  function LocateMArkeronMap() {
    const map = useMap()
    if (toggleMapCenter === true) { setToggleMapCenter(false); map.flyTo(center); }
    return (
      <>
        <Circle center={center} pathOptions={fillBlueOptions} radius={60}></Circle>
      </>
    )
  }

  //Add marker when clicking on map
  function AddMarkerToClick() {
    const map = useMapEvents({
      dblclick(e) {
        const newMarker = e.latlng
        const newmarkerlist = addSite.markers.slice(0, -1)
        const latNew = { ...addSite, features: { ...addSite.features, locationY: newMarker.lat, locationX: newMarker.lng }, markers: [...newmarkerlist, newMarker] };
        setAddSite(latNew);
      },
    })
    return (
      <>
        {addSite.markers.map(marker =>
          <Marker position={marker} icon={custommarker}>
            <Tooltip minWidth={360} >
              <Typography variant="h6" gutterBottom>
                Site Information
                      </Typography>
              <Typography variant="boddy1" gutterBottom>
                {"Site Name: " + addSite.features.name}<br />
                {"Location: " + "[" + " X: " + String(addSite.features.locationX) + ", Y: " + String(addSite.features.locationY) + " ]"}
              </Typography>
            </Tooltip>
          </Marker>
        )
        }
      </>
    )
  }


  function MySiteMAp() {
    const map = useMap()
    return (
      <>
        {
          sites.map(item =>
            <>
              {/* {console.log(String(item.operators))} */}
              <Marker draggable={false} position={[item.locationY, item.locationX]} icon={originalicon}
                // icon={item.status === "OK" ? originalicon : item.status === "notOK" ? alarmicon : nullicon}
                eventHandlers={{
                  click: (e) => {
                    // setClickedSite({ id: null, siteName: "", city: "", locationX: "", locationY: "", waterOrWaste: "", wellOrSurface: "", pumpEnergy:"", numberOfHomes:"", people:"", volumeOfTanks:"", timeZoneInfoId:"" })
                    const lat_clicked = e.latlng.lat;
                    const long_clicked = e.latlng.lng;
                    if (e.target._tooltip != null) {
                      const IDstr = e.target._tooltip.options.children[1].props.children[0];
                      e.target.setIcon(hovericon)
                      setSelectedSiteId(parseInt(IDstr.slice(16), 10))
                      let clickedSiteTemp = sites.find(element => element.locationY === lat_clicked && element.locationX === long_clicked)
                      Object.keys(clickedSiteTemp).forEach(function (key) {
                        if (clickedSiteTemp[key] === null) {
                          clickedSiteTemp[key] = "";
                        }
                      })
                      props.setClickedSite(clickedSiteTemp);
                      console.log(clickedSiteTemp)
                    }
                  },
                  mouseover: (e) => {
                    e.target.setIcon(hovericon)
                  },
                  mouseout: (e) => {
                    e.target.setIcon(originalicon)
                  },
                }} >
                <Tooltip minWidth={360} direction="right" opacity={1} offset={[25, 0]} sticky>
                  <Typography variant="h6" gutterBottom>
                    Site Information
                      </Typography>
                  <Typography variant="boddy1" gutterBottom>
                    {"ID in Database: " + item.id}<br />
                    {"Site Name: " + item.name}<br />
                    {"Location: " + "[" + " X: " + String(item.locationX) + ", Y: " + String(item.locationY) + " ]"}
                  </Typography>
                </Tooltip>
              </Marker></>)
        }
      </>
    )
  };



  const retrieveDevicesListHandle = (e) => {
    retrieveDevicesList((isOk, data) => {
      if (!isOk) {
        return toast.error("Server is not responding for getting devices list!");
      }
      else {
        var filtered=[]
        if (props.clickedSite){
          const deviceids= props.clickedSite.devices
          filtered= data.map(item=>{if(deviceids.includes(item.id)){return item}})
          console.log("filtered",filtered)
          var filteredwithoutNull=filtered.filter(item => item)
          setDevices(filteredwithoutNull)
        }
        else{
          console.log(filtered)
          setDevices(data)
        }     
         return toast.success("Devices list is imported from database!");
      }
    })
  }


  return (
    <>




      <div className={classes.wrapperStyle}>

        {/* <TabMenu {...formProps}></TabMenu>  All tabs for filter, add site, update sites are here...see the component TabMenu */}

        <div className={classes.formDivStyle}>
          <div className={classes.formDivStyle2}>  {/* The list of sites on the left of the map */}
            <SiteTree {...formProps} />
          </div>

            <div>
              <TrainInput {...formProps} />
            </div>
            <div>
              <HistoryInput {...formProps} />
            </div>
          <div style={{ float: 'left', width: '55%', borderWidth: '0px', marginLeft: "1vw" }}>

            <div className={classes.mapDivStyle} >   {/* The map and its markers */}
              <MapContainer
                center={[49.261198465253926, -123.24898713262935]}
                zoom={15}
                scrollWheelZoom={true}
                style={{
                  width: '100%', height: '60vh', borderRadius: '0.5rem', marginTop: "-0px", webkitBoxShadow: '0px 0.5px 1px 0.1px rgba(0,0,0,0.43)',
                  mozBoxShadow: '0px 0.5px 1px 0.1px rgba(0,0,0,0.43)',
                  boxShadow: '0px 0.5px 1px 0.1px rgba(0,0,0,0.43)',
                }}
                doubleClickZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LatLongComponent />
                <LocateMArkeronMap />
                <AddMarkerToClick />
                <MySiteMAp />
              </MapContainer>
            </div>
          </div>

          <div className={classes.formDivStyleRight} id="systemFormDivRight">
            <div
              style={{ float: "left", width: "100%", marginBottom: "2rem", overflow: "auto", maxHeight: 596, }}
            >
              <div>
                <Button variant="contained" color="primary" style={{ width: '100%', height: '4vh', fontSize: '0.8vw', minWidth: 0, marginTop: '1.5vh' }}
                   onClick={e => retrieveDevicesListHandle(e)}
                >
                  Refresh Devices List Now!
                </Button>
              </div>
              <div>
                <Typography variant="h6" style={{ padding: '1vw' }} color="primary">
                  List of Devices in  {props.clickedSite.name}
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

export default Sitesview;
