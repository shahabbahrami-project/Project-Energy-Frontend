import React, { useEffect, useRef, useState } from "react";
import PageTitle from "../../components/PageTitle";
import { Button, TextField } from "@material-ui/core";
import MyMap from "../../components/MyMap/MyMap";
import useStyles from "./styles";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent, useMapEvents } from "react-leaflet";
import Grid from "@material-ui/core/Grid";
import Form from "./Form";
import FloatingActionButtonZoom from "./TabFilter";

const Sensors = () => {
  const classes = useStyles();
  const [addSite, setAddSite] = useState(  {features:{siteName:"",city:"", locationX:null, locationY:null, waterOrWaste:"", wellOrSurface:""}, markers:[]});
  const [sites,setSites]=useState([])

  function LatLongComponent() {
    const map = useMapEvents({
      click(e) {
        const newMarker = e.latlng
        // setLatValue(newMarker.lat);
        const latNew = {...addSite, features: {...addSite.features, locationX: newMarker.lat, locationY: newMarker.lng}};
        // const latNew = {...addSite, locationX: newMarker.lat, locationY: newMarker.lng};
        setAddSite(latNew);
        console.log(addSite)
      },
    })
    return null
  }
  const [latValue,setLatValue]=useState(0)

  const [longValue,setLongValue]=useState(0)
 


  const locations=sites.map(item=>[item.locationX,item.locationY])
  const [markers, setMarkers] = useState([]);
  function AddMarkerToClick() {
    const map = useMapEvents({
      dblclick(e) {
        const newMarker = e.latlng
        const latNew = {...addSite, features: {...addSite.features, locationX: newMarker.lat, locationY: newMarker.lng}, markers:[...addSite.markers, newMarker]};
        setAddSite(latNew);
        // console.log(addSite)
        //
        // setMarkers([...markers, newMarker]);
        //setLatValue(newMarker.lat);
      },
    })
    // const list = [
    //   { date: '12/1/2011', reading: 3, id: 20055 },
    //   { date: '13/1/2011', reading: 5, id: 20053 },
    //   { date: '14/1/2011', reading: 6, id: 45652 }
    // ];
    // {const locations=list.map(item=>[item.reading,item.id])
      console.log(locations)
    return (
      <>
        {addSite.markers.map(marker =>
          <Marker position={marker}>
            <Popup>Marker is at </Popup>
          </Marker>
        )
        }
      </>
    )
  }

  let formProps = {
    lat:latValue,
    latSet: setLatValue,
    long:longValue,
    longSet: setLongValue,
    sitesDataSet:setSites,
    addSiteSet:setAddSite,
    addSite:addSite
  }


  // {const locations=sites.map(item =>
  //     [item.locationX,item.locationY]
  // )
  // }


  return (

    <>
      <PageTitle title="Sensors Registration" button={<Button
        variant="contained"
        size="medium"
        color="secondary"
      >
        Latest Reports
      </Button>} />
  <div className={classes.wrapperStyle}>
    <FloatingActionButtonZoom {...formProps}></FloatingActionButtonZoom>

  {/*<Form {...formProps}>*/}
  {/*</Form>*/}
  <div className={classes.mapDivStyle} >
    <MapContainer
      center={[49.261193734044916, -123.24923027772962]}
      zoom={16} scrollWheelZoom={true}
      style={{width:'100%', height:'100vh', borderRadius:'1rem'}}
      doubleClickZoom= {false}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LatLongComponent/>
      {/*<LatComponent/>*/}
      {/*<LongComponent/>*/}
      {/*<LatComponentForm/>*/}
      {/*<LongComponentForm/>*/}
      <Marker position={[49.261193734044916, -123.24923027772962]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <AddMarkerToClick />
      {locations.map(marker =>
        <Marker position={marker}>
          <Popup>new Marker is at </Popup>
        </Marker>
      )
      }
    </MapContainer>
  </div>

</div>


      {/*<div style={{width: '80%', float:'left', height:'100px', background:'gray', margin:'10px'}}>*/}

      {/*</div>*/}
      {/*<div style={{width: '20%', float:'right', height:'100px', background:'gray', margin:'10px'}}>*/}


      {/*</div>*/}

    </>
  );
};

export default Sensors;
