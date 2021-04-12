import React, { useState, useRef, Component, useEffect } from "react";
import PageTitle from "../../components/PageTitle";
import useStyles from "./styles";
import { MapContainer, Circle, Marker, Popup, TileLayer, useMap, useMapEvent, useMapEvents, LayersControl } from "react-leaflet";
// import HeatmapLayer from 'react-leaflet-heatmap-layer';
import TabMenu from "./components/TabMenu/TabMenu";
import SiteTree from "./components/SiteListBar/SiteTree";
import Typography from '@material-ui/core/Typography';
import iconmarker from './markers/markernotadd.svg'
import iconmarkerclicked from './markers/markerclicked.svg'
import iconmarkeroriginal from './markers/sensor4_white.png'
import iconmarkerhover from './markers/sensor4_hover.png'
import L from "leaflet";

// import Marker from 'react-leaflet-enhanced-marker'

import GaugeChart from 'react-gauge-chart'


import { Icon } from "leaflet";
import { SettingsInputComponent } from "@material-ui/icons";
import { heatLayer } from "leaflet";
// import HeatmapLayer from "react-google-maps/lib/components/visualization/HeatmapLayer";


import "leaflet.heat"


const custommarker = new Icon({
  iconUrl: iconmarker,
  iconSize: [30, 30],
  iconAnchor: [15, 28],
  popupAnchor: [0, -30]
});

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
  popupAnchor: [2, -40]
})

const custommarkerclicked = new Icon({
  iconUrl: iconmarkerclicked,
  iconSize: [40, 40],
  iconAnchor: [19, 40],
  popupAnchor: [3, -30]
});
const Sites = (props) => {




  // const [icon, setIcon] = useState(0)
  const classes = useStyles();
  // const [addSite, setAddSite] = useState({ features: { name: "", building: "", locationX: null, locationY: null, sensorOrmeter: "" }, markers: [] });
  // const [filterSite, setFilterSite] = useState({ name: "", building: "", sensorOrmeter: "" });
  // const [sites, setSites] = useState([])
  // const [cities, setCities] = useState([])
  // const [clickedSite, setClickedSite] = useState({ id: null, name: "", building: "", locationX: null, locationY: null, sensorOrmeter: "" })
  // const [center, setCenter] = useState([49.261405231193415, -123.24899945696026])
  // const [toggleMapCenter, setToggleMapCenter] = useState(false)
  // const[heat, setHeat]=useState(false)





  // const [dept, setDept] = useState([])
  // const [filterDept, setFilterDept] = useState({ department: "CIRS_633", subject: "elec_power", startdate: "2020-01-06", enddate: "2020-01-07" })

  // const [sensorData, setSensorData] = useState([])

  // let graphProps = {
  //   dept: dept,
  //   setDept: setDept,
  //   filterDept: filterDept,
  //   setFilterDept: setFilterDept
  // }











  function LatLongComponent() {
    const map = useMapEvents({
      click(e) {
        const newMarker = e.latlng
        const newmarkerlist = props.addSite.markers.slice(0, -1)
        const latNew = { ...props.addSite, features: { ...props.addSite.features, locationX: newMarker.lng, locationY: newMarker.lat }, markers: [...newmarkerlist, newMarker] };
        props.setAddSite(latNew);
        // console.log(latNew)
      },
    })
    return null
  }


  const fillBlueOptions = { color: 'red', fillColor: 'red' }

  function LocateMArkeronMap() {
    const map = useMap()
    console.log(props.center)
    // if (toggleMapCenter === true) { setToggleMapCenter(false);map.flyTo(center);}
    return (
      <>
        <Circle center={props.center} pathOptions={fillBlueOptions} radius={60}></Circle>
      </>
    )
  }




  function AddMarkerToClick() {
    const map = useMapEvents({
      dblclick(e) {
        const newMarker = e.latlng
        const newmarkerlist = props.addSite.markers.slice(0, -1)
        const latNew = { ...props.addSite, features: { ...props.addSite.features, locationY: newMarker.lat, locationX: newMarker.lng }, markers: [...newmarkerlist, newMarker] };
        props.setAddSite(latNew);
      },
    })
    return (
      <>
        {props.addSite.markers.map(marker =>
          <Marker position={marker} icon={custommarker}>
            <Popup minWidth={360} >
              <Typography variant="h6" gutterBottom>
                Sensors Information
                      </Typography>
              <Typography variant="boddy1" gutterBottom>
                {"Name: " + props.addSite.features.name}<br />
                {"Building: " + props.addSite.features.building}<br />
                {"Location: " + "[" + " X: " + props.addSite.features.locationX + ", Y: " + props.addSite.features.locationY + " ]"}<br />
                {"Sensor or Smart Meter: " + props.addSite.features.sensorOrmeter}
              </Typography>

            </Popup>
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

          props.sites.map(item =>
            <Marker position={[item.locationY, item.locationX]} icon={originalicon}
              eventHandlers={{
                click: (e) => {
                  const lat_clicked = e.latlng.lat;
                  const long_clicked = e.latlng.lng;
                  e.target.setIcon(hovericon)
                  props.setClickedSite(props.sites.find(element => element.locationY == lat_clicked && element.locationX == long_clicked));
                },
                mouseover: (e) => {
                  e.target.setIcon(hovericon)
                },
                mouseout: (e) => {
                  e.target.setIcon(originalicon)
                },
              }} >
              <Popup minWidth={360} >

                <Typography variant="h6" gutterBottom>
                  Measurement Site Information
                      </Typography>

                <Typography variant="boddy1" gutterBottom>
                  {"ID in Database: " + item.id}<br />
                  {"Name: " + item.name}<br />
                  {"Building: " + item.building}<br />
                  {"Location: " + "[" + " X: " + item.locationX + ", Y: " + item.locationY + " ]"}<br />
                  {"Sensor or Smart Meter: " + item.sensorOrmeter}
                </Typography>
                <GaugeChart id="gauge-chart1"
                  nrOfLevels={20}
                  percent={0.86}
                  textColor={'black'}
                  formatTextValue={value => value / 4 + '°C'}
                />
              </Popup>

            </Marker>)
        }

      </>
    )
  }


  // let formProps = {
  //   sites: sites,
  //   sitesDataSet: setSites,
  //   addSiteSet: setAddSite,
  //   addSite: addSite,
  //   filterSite: filterSite,
  //   setFilterSite: setFilterSite,
  //   cities: cities,
  //   setCities: setCities,
  //   center: center,
  //   setCenter: setCenter,
  //   toggleMapCenter: toggleMapCenter,
  //   setToggleMapCenter: setToggleMapCenter,
  //   clickedSite: clickedSite,
  //   setClickedSite: setClickedSite,
  //   heat:heat,
  //   setHeat:setHeat,

  //   dept: dept,
  //   setDept: setDept,
  //   filterDept: filterDept,
  //   setFilterDept: setFilterDept,
  //   sensorData:sensorData,
  //   setSensorData:setSensorData
  // }


  function Map() {
    const map = useMap()
      if (props.heat==true){
      // const points = addressPoints
      const points = props.sites.map((p) => {
            return [p.locationY, p.locationX, 1];
           })
  //       : [];
      props.setHeat(false)
      L.heatLayer(points,  {radius: 50, gradient:{0.4: 'green', 0.65: 'yellow', 1: 'red'}}).addTo(map)
     }
    //  var map = L.map("map").setView([49.261405231193415, -123.24899945696026], 12);

    return null
  }

 

  return (
    <>
      
      <div className={classes.wrapperStyle}>
        <TabMenu {...props}></TabMenu>
        <div className={classes.formDivStyle}>
          <div className={classes.formDivStyle2}>
            <SiteTree {...props} />
          </div>
          <div style={{ float: 'right', width: '79%', borderWidth: '0px' }}>

            <div className={classes.mapDivStyle} >
              <MapContainer

                center={[49.261405231193415, -123.24899945696026]}
                zoom={15} scrollWheelZoom={true}
                style={{
                  width: '100%', height: '78.5vh', borderRadius: '0.5rem', marginTop: "-0px", webkitBoxShadow: '0px 0.5px 1px 0.1px rgba(0,0,0,0.43)',
                  mozBoxShadow: '0px 0.5px 1px 0.1px rgba(0,0,0,0.43)',
                  boxShadow: '0px 0.5px 1px 0.1px rgba(0,0,0,0.43)',
                }}
                doubleClickZoom={false}
              >
                <LayersControl>
                  <LayersControl.BaseLayer name="Base" checked>
                    <TileLayer
                      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                  </LayersControl.BaseLayer>
                  <LayersControl.Overlay name="Heatmap" checked>

                  </LayersControl.Overlay>
                </LayersControl>
                <Map/>
                <LatLongComponent />
                <LocateMArkeronMap />
                <AddMarkerToClick />
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


