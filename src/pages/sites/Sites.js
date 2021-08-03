import React, { useState, useEffect } from "react";
import PageTitle from "../../components/PageTitle";
import { toast } from "react-toastify";
import useStyles from "./styles";
import { MapContainer, Circle, Tooltip, Marker, Popup, TileLayer, useMap, useMapEvent, useMapEvents, ZoomControl } from "react-leaflet";
import TabMenu from "./components/TabMenu/TabMenu";
import SiteTree from "./components/SiteListBar/SiteTree";
import Typography from '@material-ui/core/Typography';
import iconmarker from './markers/markernotadd.svg'
import iconmarkerclicked from './markers/markerclicked.svg'
import iconmarkeroriginal from './markers/normal.svg'
import iconmarkerhover from './markers/normal_hover.svg'
import iconmarkeralarm from './markers/alarm.svg'
import iconmarkeralarmhover from './markers/alarm_hover.svg'
import iconmarkernull from './markers/null.svg'
import iconmarkernullhover from './markers/null_hover.svg'
import LinearProgress from '@material-ui/core/LinearProgress';
import { Icon } from "leaflet";
import { getSensorsType, getSensorsList } from "../../api/api_sensors";
import { filterSites, groupByCity } from "../../api/api_sites";
import { popup } from "leaflet";
import {
  Button
} from "@material-ui/core";
import { Redirect, Route, Link } from 'react-router-dom';
import { selectedSiteClicked, selectedSiteStore } from "./redux";
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

const Sites = () => {
  const classes = useStyles();
  const [filterSite, setFilterSite] = useState({ siteName: "", city: "", VisitFrom: null, VisitTo: null, waterOrWaste: "", wellOrSurface: "", status: null });
  const [sites, setSites] = useState([])
  const [cities, setCities] = useState([])
  const [clickedSite, setClickedSite] = useState({ id: null, siteName: "", city: "", locationX: "", locationY: "", waterOrWaste: "", wellOrSurface: "" })
  const [center, setCenter] = useState([51.505, -0.09])
  const [toggleMapCenter, setToggleMapCenter] = useState(false)
  const [selectedSiteId, setSelectedSiteId] = useState();
  const [sensorsType, setSensorsType] = useState([]);
  const [flagSensorsType, setFlagSensorsType] = useState(true);
  const [updateSensorIndex, setUpdateSensorIndex] = React.useState(-1);
  useEffect(() => {

    if (flagSensorsType == true) {


      filterSites(filterSite, (isOk, data) => {
        if (!isOk) {
          // return toast.error("Server is not responding for filtering!");
        }
        else {
          setSites(data);
          groupByCity(filterSite, (isOk, data1) => {
            if (!isOk) {
              return toast.error("Server is not responding for grouping!");
            }
            else {
              setCities(data1);
            }
          })
        }
      })
    }
  }, [flagSensorsType]);





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


  function MySiteMAp() {
    const map = useMap()
    return (
      <>
        {
          sites.map(item =>
            <>
              {console.log(String(item.operators))}
              <Marker position={[item.locationY, item.locationX]} icon={item.status == "OK" ? originalicon : item.status == "notOK" ? alarmicon : nullicon}
                eventHandlers={{
                  click: (e) => {
                    const lat_clicked = e.latlng.lat;
                    const long_clicked = e.latlng.lng;
                    if (e.target._popup != null) {
                      const IDstr = e.target._popup.options.children[1].props.children[0];
                      e.target.setIcon(hovericon)
                      setSelectedSiteId(parseInt(IDstr.slice(16), 10))
                      const clickedSiteTemp = sites.find(element => element.locationY == lat_clicked && element.locationX == long_clicked);
                      selectedSiteStore.dispatch(selectedSiteClicked(String(clickedSiteTemp.id)))
                      localStorage.setItem("clickedSiteID", clickedSiteTemp.id);
                    }
                  },
                  mouseover: (e) => {
                    e.target.setIcon(item.status == "OK" ? hovericon : item.status == "notOK" ? alarmhovericon : nullhovericon)
                  },
                  mouseout: (e) => {
                    e.target.setIcon(item.status == "OK" ? originalicon : item.status == "notOK" ? alarmicon : nullicon)
                  },
                }} >

                <Popup minWidth={350} opacity={1}>
                  <Typography variant="h6" gutterBottom>
                    {item.siteName}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {"Located in:  "}  <em>{item.city}</em> <br />
                    {"Water/Waste:  "} <em>{item.waterOrWaste}</em><br />
                    {"Well/Surface:  "} <em>{item.wellOrSurface}</em> <br />
                    {"Status:  "} <em>{item.status == "notOK" ? "Alert" : "Normal"}</em><br />
                    {"Operators:  "} <em>{String(item.operators)}</em>
                    <br />
                    {"Observers:   "} <em>{String(item.observes)}</em>
                    <Link to={"/app/systems"} style={{ color: "white", width: "100%", textDecoration: 'none', height: '120%' }}>
                      <Button
                        style={{ fontSize: '0.85vw', height: '2.2vw', width: '99%', marginTop: '1.5vh', }}
                        size="large"
                        variant="contained"
                        color="primary"
                        fullWidth
  
                      >
                        <Typography>
                          Click to Check System
                        </Typography>

                      </Button>
                    </Link>
                  </Typography>
                </Popup>

              </Marker></>)
        }

      </>
    )
  }


  let formProps = {
    sites: sites,
    sitesDataSet: setSites,
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
    selectedSiteId: selectedSiteId,
    setSelectedSiteId: setSelectedSiteId,
  }
  return (
    <>
      <div className={classes.wrapperStyle}>
        <TabMenu {...formProps}></TabMenu>
        <div className={classes.formDivStyle}>
          <div className={classes.formDivStyle2}>
            <SiteTree {...formProps} />
          </div>
          <div style={{ float: 'right', width: '79%', borderWidth: '0px' }}>

            <div className={classes.mapDivStyle} >
              <MapContainer
                center={[53.21411033981582, -123.16340390171604]}
                zoomControl={false}
                zoom={6} scrollWheelZoom={true}
                style={{
                  width: '100%', height: '78vh', borderRadius: '0.5rem', marginTop: "-0px", webkitBoxShadow: '0px 0.5px 1px 0.1px rgba(0,0,0,0.43)',
                  mozBoxShadow: '0px 0.5px 1px 0.1px rgba(0,0,0,0.43)',
                  boxShadow: '0px 0.5px 1px 0.1px rgba(0,0,0,0.43)',
                }}
                doubleClickZoom={false}
              >

                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ZoomControl style={{ '& .leaflet-left': { left: '5vh !important' } }} />
                {/* <LatLongComponent /> */}
                <LocateMArkeronMap />
                {/* <AddMarkerToClick /> */}
                <MySiteMAp />

              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sites;
