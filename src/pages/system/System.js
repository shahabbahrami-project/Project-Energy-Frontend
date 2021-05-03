import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import Tab from "./components/TabMenu/TabMenu";
import TabGraph from "./components/LineChart/TabGraph";
import SiteTree from "./components/SiteListBar/SiteTree";
import Typography from "@material-ui/core/Typography";
import Widget from "../../components/Widget";
import { Grid } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Button from "@material-ui/core/Button";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import CircularProgress from '@material-ui/core/CircularProgress';
import Sensor from "./components/sensor";
import ContextMenu from "./components/contextMenu";
import { toast } from "react-toastify";
import { getSensorsType, getSensorsBySiteId, } from "../../api/api_sensors";
import { getAllSites, setImageForSite, getSite, filterSites, groupByCity, getAlerts, getReports, removeImage, } from "../../api/api_sites";
import Loading from "../../images/loading2.gif";
import TabTable from "./components/Table/TabTable";
import { parseISO, format } from "date-fns";
import LinearProgress from "@material-ui/core/LinearProgress";
import SensorInput from "./components/SensorModal/sensorInput";
import { selectedSiteStore } from "../sites";
import SensorsListRight from "./components/SensorListRight/SensorListRight";







const System = () => {
  const classes = useStyles();
  const [filterSite, setFilterSite] = useState({ siteName: "", city: "", VisitFrom: null, VisitTo: null, waterOrWaste: "", wellOrSurface: "", status: null, });
  const [reportInputs, setReportInputs] = useState({ siteId: "", alertId: "", subject: "", action: "", addedAmount: null, actionDateTime: null, maintenanceTime: null, cost: 0, });
  const [sensorAlert, setSensorAlert] = useState("");
  const [sites, setSites] = useState([]);
  const [cities, setCities] = useState([]);
  const [site, setSite] = useState({ picture: "" });
  const [siteImage, setSiteImage] = useState();
  const [contextMenu, setContextMenu] = useState(false);
  const [sensors, setSensors] = useState([]);
  const [enableSensors, setEnableSensors] = useState([]);
  const [disableSensors, setDisableSensors] = useState([]);
  const [fullScreenImage, setFullScreenImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [sensorsType, setSensorsType] = useState([]);
  const [flagSensorsType, setFlagSensorsType] = useState(true);
  const [report, setReport] = useState([]);
  const [alert, setAlert] = useState([]);
  const [sensorData, setSensorData] = useState([]);
  const [sensorDataFilter, setSensorDataFilter] = useState({ sensorID: null, sensorCode: "", startDate: null, endDate: null, });
  const [alarmMarkers, setAlarmMarkers] = useState([]);
  var dateNow = new Date();
  var datePast = new Date();
  var dateShift = dateNow.getDate() - 30; datePast.setDate(dateShift);
  const isoDateNow = dateNow.toISOString();
  const isoDatePast = datePast.toISOString();
  const [reportFilter, setReportFilter] = useState({ SiteID: null, ReportFrom: isoDatePast, ReportTo: isoDateNow, });
  const [alertFilter, setAlertFilter] = useState({ SiteID: null, AlertFrom: isoDatePast, AlertTo: isoDateNow, });
  const [openReportModal, setOpenReportModal] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [openSensorModal, setOpenSensorModal] = React.useState(false);
  const [sensorDataUpdate, setSensorDataUpdate] = useState({ siteName: null, reportDateTime: null, sensors: [{ sensorCode: "", sensorValue: null }], });




  useEffect(() => {
    if (flagSensorsType == true) {
      filterSites(filterSite, (isOk, data) => {
        if (!isOk) {
          return toast.error("Server is not responding for filtering!");
        } else {
          setSites(data);
          groupByCity(filterSite, (isOk, data1) => {
            if (!isOk) {
              return toast.error("Server is not responding for grouping!");
            } else {
              setCities(data1);
              getSensorsType((isOk, data) => {
                if (!isOk) {
                  return toast.error(
                    "Server is not responding for sensors types!",
                  );
                } else {
                  setSensorsType(data);
                  const clickedSiteID = localStorage.getItem("clickedSiteID");
                  if (clickedSiteID != null) {
                    loadInfo(clickedSiteID);
                  }
                }
              });
            }
          });
        }
      });
    }
  }, [flagSensorsType]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 200);

    return () => {
      clearInterval(timer);
    };
  }, []);

  function convertDate(date) {
    const Date2 = format(parseISO(date), "yyy-MM-dd hh:mm:ss");
    return Date2;
  }


  let siteName = "";
  let siteId = "";
  const loadInfo = (siteID) => {
    console.log('load Info')
    getSite(siteID, (isOk, data) => {
      if (!isOk) {
        return toast.error("get site in site tree for loading!");
      } else {
        siteName = data.siteName;
        siteId = data.id;
        setSite(data);
        var reportFilterTemp = { ...reportFilter, SiteID: Number(siteID) };

        getReports(reportFilterTemp, (isOk, data) => {
          if (!isOk) {
            return toast.error("could not get report!");
          } else {
            setReport(data);
            setReportFilter(reportFilterTemp);

            getSensorsBySiteId(siteID, (isOk, data) => {
              if (!isOk) {
                return toast.error("getSensorsBySiteId site tree!");
              } else {
                let enableSensor = [];
                let disableSensor = [];
                if (data) {
                  data.map(function (s) {
                    if (s.fromLeft === null) {
                      disableSensor.push(s);
                    } else {
                      enableSensor.push(s);
                    }
                  });

                  setSensors(data);
                  setEnableSensors(enableSensor);
                  setDisableSensors(disableSensor);
                  var alertFilterTemp = {
                    ...alertFilter,
                    SiteID: Number(siteID),
                  };
                  setAlertFilter(alertFilterTemp);
                  getAlerts(alertFilterTemp, (isOk, data) => {
                    if (!isOk) {
                      return toast.error("could not get alerts!");
                    } else {
                      setTimeout(function () {
                        let alerts = data.map((item) => [
                          siteName,
                          item.sensorCode,
                          item.problem,
                          convertDate(item.startDateTime),
                          item.endDateTime == null
                            ? "--"
                            : convertDate(item.endDateTime),
                          item.endDateTime == null ? "Yes" : "No",
                          null,
                          item.id,
                          siteId,
                        ]);
                        setAlert(alerts);
                      }, 1000);
                    }
                  });
                } else {
                  return toast.error("No sensors found for this site!");
                }
              }
            });
          }
        });
      }
    });
  };

  useEffect(() => {
    getAllSites((isOk, data) => {
      if (!isOk) {
        //return toast.error("Server is not responding!");
        return toast.error("getAllSites !");
      } else {
        setSites(data);
      }
    });
  }, []);

  const clickOnSystemImage = (e) => {
    e.preventDefault();
    let img = e.target;
    let width = img.clientWidth;
    let height = img.clientHeight;
    let x = (e.nativeEvent.offsetX * 100) / width;
    let y = (e.nativeEvent.offsetY * 100) / height;
    setX(x);
    setY(y);
    setContextMenu(true);
  };

  const getImageHandle = (e) => {
    let file = e.target.files[0];
    if (
      file.type == "image/png" ||
      file.type == "image/jpg" ||
      file.type == "image/jpeg"
    ) {
      setSiteImage(file);
      // };
    } else {
      toast.error("Invalid Image type!");
    }
  };

  const imageSubmitHandle = () => {
    if (siteImage) {
      setLoading(true);
      let image = new FormData();
      image.append("siteID", site.id);
      image.append(siteImage.name, siteImage);
      console.log(...image);
      setImageForSite(image, (isOk, data) => {
        if (!isOk) {
          // return toast.error("Server is not responding!");
          return toast.error(" setImageForSite !");
        } else {
          getSite(site.id, (isOk, data) => {
            if (!isOk) {
              // return toast.error("Server is not responding!");
              return toast.error("get site in site tree !");
            } else {
              console.log(data);
              setSite(data);
            }
          });
          getSensorsBySiteId(site.id, (isOk, data) => {
            if (!isOk) {
              // return toast.error("Server is not responding!");
              return toast.error("getSensorsBySiteId site tree!");
            } else {
              let sensors = [];
              let enableSensor = [];
              let disableSensor = [];
              if (data) {
                data.map(function (s) {
                  if (s.fromLeft === null) {
                    disableSensor.push(s);
                  } else {
                    enableSensor.push(s);
                  }
                });
                setSensors(data);
                setEnableSensors(enableSensor);
                setDisableSensors(disableSensor);
                setLoading(false);
              } else {
                setLoading(false);
                return toast.error("No sensors found for this site!");
              }
            }
          });
        }
      });
    } else {
      return toast.error(" please Choose Image !");
    }
  };

  let formProps = {
    sites: sites,
    sitesDataSet: setSites,
    filterSite: filterSite,
    setFilterSite: setFilterSite,
    cities: cities,
    setCities: setCities,
    site: site,
    setSite: setSite,
    setSensors: setSensors,
    enableSensors: enableSensors,
    setEnableSensors: setEnableSensors,
    disableSensors: disableSensors,
    setDisableSensors: setDisableSensors,
    report: report,
    setReport: setReport,
    alert: alert,
    setAlert: setAlert,
    sensorData: sensorData,
    setSensorData: setSensorData,
    sensorDataFilter: sensorDataFilter,
    setSensorDataFilter: setSensorDataFilter,
    openReportModal: openReportModal,
    setOpenReportModal: setOpenReportModal,
    reportInputs: reportInputs,
    setReportInputs: setReportInputs,
    setSensorAlert: setSensorAlert,
    sensorAlert: sensorAlert,
    reportFilter: reportFilter,
    setReportFilter: setReportFilter,
    alertFilter: alertFilter,
    setAlertFilter: setAlertFilter,
    openSensorModal: openSensorModal,
    setOpenSensorModal: setOpenSensorModal,
    sensorDataUpdate: sensorDataUpdate,
    setSensorDataUpdate: setSensorDataUpdate,
    alarmMarkers: alarmMarkers,
    setAlarmMarkers: setAlarmMarkers,
    sensors: sensors,
    setSensors: setSensors,
    sensorsType: sensorsType,
    setSensorsType: setSensorsType
  };

  const contextMenuProps = {
    x: x,
    y: y,
    enableSensors: enableSensors,
    setEnableSensors: setEnableSensors,
    disableSensors: disableSensors,
    setDisableSensors: setDisableSensors,
    setContextMenu: setContextMenu,
  };

  const sensorProps = {
    sensors: sensors,
    site: site,
    setSensors: setSensors,
    enableSensors: enableSensors,
    setEnableSensors: setEnableSensors,
    disableSensors: disableSensors,
    setDisableSensors: setDisableSensors,
    setContextMenu: setContextMenu,
    setImageLoading: setImageLoading,
  };


  const deleteImage = () => {
    removeImage(site.id, (isOk, data) => {
      if (!isOk) {
        return toast.error("could not delete image!");
      } else {
        site.picture = null;
      }
    });
  }

  return (
    <>
      <div>
        <LinearProgress
          color="secondary"
          variant="determinate"
          value={progress}
          style={
            progress < 100
              ? { display: "flex", height: "1vh" }
              : { display: "none" }
          }
        />
      </div>
      <div className={classes.wrapperStyle}>
        <Tab {...formProps}></Tab>
        <Grid container spacing={2}>
          <Grid item xs={12} md={9}>
            <SensorInput {...formProps} />
          </Grid>
          <Grid item xs={12} md={9}>
            <TabGraph {...formProps}></TabGraph>
            <div className={classes.formDivStyle2}>
              <SiteTree {...formProps} />
            </div>
            <div
              style={{
                float: "right",
                width: "74%",
                marginLeft: "0.5%",
                marginBottom: "2rem",
                borderColor: "#0566773b",
                borderWidth: "1px",
                borderStyle: "solid",
                borderRadius: "0.5rem",
              }}
            >
              <div
                className={classes.mapDivStyle}
                style={
                  fullScreenImage
                    ? {
                      transform: "scale(1.5,1.5)",
                      // boxShadow: "2px 2px 49px 12px rgba(0,0,0,0.67)",
                    }
                    : {
                      transform: "none",
                      boxShadow: "none",
                    }
                }
              >
                <Widget
                  title={
                    site.siteName +
                    " (" +
                    site.city +
                    ")" +
                    " ," +
                    " Operator: " +
                    String(site.operators)
                  }
                  disableWidgetMenu
                >
                  {site.siteName ? (
                    <div className={classes.dashedBorder} style={{ position: "relative" }}>
                      {imageLoading ? (
                        <div className={classes.imageLoading}>
                          <CircularProgress />
                        </div>
                      ) : null}
                      {site.picture ? (
                        <>
                          <div className={classes.imageSystemContainerStyle}>
                            <img
                              id="systemImage"
                              src={site.picture}
                              alt="systemImage"
                              className={classes.imageSystemStyle}
                              onContextMenu={clickOnSystemImage}
                              onClick={() => setContextMenu(false)}
                            />
                            {contextMenu ? (
                              <ContextMenu {...contextMenuProps} />
                            ) : null}
                            {enableSensors.map(function (sensor) {
                              return <Sensor sensor={sensor} {...sensorProps} />;
                            })}
                            <div
                              className={classes.fullScreenImage}
                              onClick={() => {
                                let rightContainer = document.querySelector(
                                  "#systemFormDivRight",
                                );
                                if (fullScreenImage) {
                                  rightContainer.style.display = "block";
                                } else {
                                  rightContainer.style.display = "none";
                                }
                                setFullScreenImage(!fullScreenImage);
                              }}
                              title="Full Screen"
                            >
                              <FullscreenIcon color="primary" />
                            </div>
                          </div>
                          <Button variant="contained" color="primary" onClick={deleteImage}>
                            Delete Image
                        </Button>

                        </>
                      ) : (
                        <>
                          <div>No Picture Found</div>

                          <div className={classes.root}>
                            <input
                              accept="image/*"
                              style={{ display: "none" }}
                              id="siteImageInput"
                              type="file"
                              onChange={getImageHandle}
                            />
                            <label htmlFor="siteImageInput">
                              <IconButton
                                color="primary"
                                aria-label="upload picture"
                                component="span"
                              >
                                <PhotoCamera />
                                Choose Image
                              </IconButton>
                            </label>

                            <Button
                              variant="contained"
                              color="primary"
                              startIcon={<CloudUploadIcon />}
                              onClick={imageSubmitHandle}
                            >
                              Upload
                            </Button>
                          </div>
                          {siteImage ? siteImage.name : " "}
                        </>
                      )}
                    </div>
                  ) : null}
                </Widget>
              </div>
            </div>
          </Grid>
          <Grid item xs={9} md={3}>
            <div className={classes.formDivStyleRight} id="systemFormDivRight">
              <div
                style={{ float: "left", width: "100%", marginBottom: "2rem", overflow: "auto", maxHeight: 596, }}
              >
                <div>
                  <Typography variant="h6" style={{padding:'1vw'}} color="primary">
                    List of Sensors in  {site.siteName}
                  </Typography>
                </div>
                <SensorsListRight {...formProps}></SensorsListRight>
              </div>
            </div>
          </Grid>
        </Grid>

        <TabTable {...formProps}></TabTable>
      </div>
      {loading ? (
        <div className={classes.loadingStyle}>
          <img
            src={Loading}
            alt="loading"
            style={{ width: 450, height: 400, }}
          />
        </div>
      ) : null}
    </>
  );
};

export default System;
