import React, { useState, useEffect} from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import { toast } from "react-toastify";
import useStyles from "./styles";
import TabMenu from "./components/TabMenu/TabMenu";
import LinearProgress from '@material-ui/core/LinearProgress';
import { getSensorsType } from "../../api/api_sensors_energy";
import { getDevicesType } from "../../api/api_devices_energy";
import { getUserID } from "../../api/api_user_energy";



//Main component for edit sites page
const EditSensorDevices = () => {
  const classes = useStyles();

  //States 
  const [addSite, setAddSite] = useState({ features: { siteName: "", city: "", locationX: "", locationY: "", waterOrWaste: "", wellOrSurface: "", PumpEnergy:"", NumberOfHomes:"", People:"", VolumeOfTanks:"", TimeZoneInfoID:"" }, markers: [] });
  const [filterSite, setFilterSite] = useState({ siteName: "", city: "", VisitFrom: null, VisitTo: null, waterOrWaste: "", wellOrSurface: "", status: null });
  const [sites, setSites] = useState([])
  const [cities, setCities] = useState([])
  const [clickedSite, setClickedSite] = useState({ id: null, siteName: "", city: "", locationX: "", locationY: "", waterOrWaste: "", wellOrSurface: "", pumpEnergy:"", numberOfHomes:"", people:"", volumeOfTanks:"", timeZoneInfoId:"" })
  const [center, setCenter] = useState([50.216872398532615, -121.58339659225832])
  const [toggleMapCenter, setToggleMapCenter] = useState(false)
  
  
  const [addSensorUpdate, setAddSensorUpdate] = useState({sensorCode: "", description:"", sensorTypeId: '', siteId: null, alertConditions: ""});
  const [sensorsUpdate, setSensorsUpdate] = useState([]);
  const [selectedSiteId, setSelectedSiteId] = useState();
  
  const [flagSensorsType, setFlagSensorsType] = useState(true);
  const [updateSensorIndex, setUpdateSensorIndex] = React.useState(-1);
  const [progress, setProgress] = React.useState(0);

  const [sensorsType, setSensorsType] = useState([]);
  const [addSensor, setAddSensor] = useState({name: "", type:null, user:"", lastRealValue:null, lastAlgoValue:null, lastTimeValue:null, created_at:null});
  const [sensors, setSensors] = useState([]);


  const [devicesType, setDevicesType] = useState([]); 
  const [devices, setDevices] = useState([]);

  let formProps = {
    sites: sites,
    sitesDataSet: setSites,
    addSiteSet: setAddSite,
    addSite: addSite,
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
    sensors: sensors,
    setSensors: setSensors,
    sensorsType: sensorsType,
    setSensorsType: setSensorsType,
    updateSensorIndex: updateSensorIndex,
    setUpdateSensorIndex: setUpdateSensorIndex,
    sensorsUpdate: sensorsUpdate,
    setSensorsUpdate: setSensorsUpdate,
    addSensorUpdate: addSensorUpdate,
    setAddSensorUpdate: setAddSensorUpdate,
    selectedSiteId: selectedSiteId,
    setSelectedSiteId: setSelectedSiteId,

    devices:devices,
    setDevices:setDevices,
    devicesType:devicesType,
    setDevicesType:setDevicesType,
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
    }
  }, [flagSensorsType]);













// Auto reload data when page starts
//   useEffect(() => {
//     if (flagSensorsType === true) {
//       filterSites(filterSite, (isOk, data) => {
//         if (!isOk) {
//           return toast.error("Server is not responding for filtering sistes!");
//         }
//         else {
//           setSites(data);
//           groupByCity(filterSite, (isOk, data1) => {
//             if (!isOk) {
//               return toast.error("Server is not responding for grouping cities and sites!");
//             }
//             else {
//               setCities(data1);
//               getSensorsType((isOk, data) => {
//                 if (!isOk) {
//                   return toast.error("Server is not responding for getting sensors types!");
//                 }
//                 else {
//                   setSensorsType(data)
//                 }
//               })
//             }
//           })
//         }
//       })
//     }
//   }, [flagSensorsType]);


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

  return (
    <>
    
      <div >   {/* progress bar on top of the page */} 
        <LinearProgress color="secondary" variant="determinate" value={progress} style={progress < 100 ? { display: 'flex', height: '1vh' } : { display: 'none' }} />
      </div>

      <PageTitle title="Sensors & Devices" />  {/* Page title on top */}
      
      
      <div className={classes.wrapperStyle}>

        <TabMenu {...formProps}></TabMenu>  {/* All tabs for filter, add site, update sites are here...see the component TabMenu */}
         
      </div>
    </>
  );
};

export default EditSensorDevices;
