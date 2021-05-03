import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import useStyles from "./styles";
import LocationCityRoundedIcon from "@material-ui/icons/LocationCityRounded";
import Divider from "@material-ui/core/Divider";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import locationIcon from "./location.svg";
import cityIcon from "./city.svg";
import normalIcon from "./normal.svg";
import alarmIcon from "./alarm.svg";
import nullIcon from "./null.svg";
import ButtonBase from "@material-ui/core/ButtonBase";
import { getSensorsBySiteId } from "../../../../api/api_sensors";
import { getSite, getReports, getAlerts } from "../../../../api/api_sites";
import { toast } from "react-toastify";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
// import format from 'date-fns/format'
import { parseISO, format } from "date-fns";
// import moment from '../../../../../node_modules/moment/src/moment';

function StyledTreeItem(props) {
  // const classes = useTreeItemStyles();
  const classes = useStyles();
  const {
    labelText,
    labelIcon: LabelIcon,
    labelInfo,
    color,
    bgColor,
    ...other
  } = props;

  return (
    <TreeItem
      label={
        <div className={classes.labelRoot}>
          <LabelIcon color="primary" className={classes.labelIcon} />
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </div>
      }
      style={{
        "--tree-view-color": color,
        "--tree-view-bg-color": bgColor,
      }}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        selected: classes.selected,
        group: classes.group,
        label: classes.label,
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

export default function SiteTree(props) {
  const classes = useStyles();
  const timer = React.useRef();
  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);
  const [expanded, setExpanded] = React.useState([]);
  const [selected, setSelected] = React.useState([]);

  const [checked, setChecked] = React.useState([1]);

  const handleToggleCheckBox = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    console.log(checked);
  };

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
  };

  const clickSite = (e, x, y) => {
    console.log(e);
    props.setCenter([y, x]);
    props.setToggleMapCenter(true);
  };
  let sensors = [];
  let siteName = "";
  let siteId = "";

  function findsensorCode(id) {
    var sensorCode = "";
    console.log(sensors);
    sensors.forEach((element) => {
      if (element.id == id) {
        sensorCode = String(element.sensorCode);
      }
    });
    return sensorCode;
  }

  function convertDate(date) {
    const Date2 = format(parseISO(date), "yyy-MM-dd hh:mm:ss");
    return Date2;
  }

  return (
    <>
    
    <TreeView
      className={classes.tree}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      expanded={expanded}
      selected={selected}
      onNodeToggle={handleToggle}
      onNodeSelect={handleSelect}
    >
      {props.cities.map((item, cityindex) => (
        <StyledTreeItem
          nodeId={cityindex}
          labelText={item.cityName}
          labelIcon={LocationCityRoundedIcon}
          // color='#DAE5F4'
          bgColor="#DAE5F4"
          style={{
            width: "80%",
            marginTop: "0.5rem",
            marginLeft: "1rem",
            marginBottom: "0.5rem",
            fontSize: "0.7vw",
          }}
        >
          {item.siteNames.map((site, siteindex) => (
            <>
              <ListItem
                key={site}
                button
                style={{
                  fontSize: "0.8vw",
                  marginLeft: "1rem",
                  borderRadius: "0 3rem 3rem 0",
                }}
                divider={true}
              >
                <ButtonBase
                  //  onClick={(e)=>clickSite(e,item.locationX[siteindex],item.locationY[siteindex])}
                  onClick={() => {
                    getSite(item.iDs[siteindex], (isOk, data) => {
                      if (!isOk) {
                        // return toast.error("Server is not responding!");
                        return toast.error("get site in site tree !");
                      } else {
                        siteName = data.siteName;
                        siteId = data.id;
                        props.setSite(data);

                        var reportFilterTemp = {
                          ...props.reportFilter,
                          SiteID: item.iDs[siteindex],
                        };
                        props.setReportFilter(reportFilterTemp);

                        getReports(reportFilterTemp, (isOk, data) => {
                          if (!isOk) {
                            // return toast.error("Server is not responding!");
                            return toast.error("could not get report!");
                          } else {
                            props.setReport(data);
                            console.log(data)
                            getSensorsBySiteId(
                              item.iDs[siteindex],
                              (isOk, data) => {
                                if (!isOk) {
                                  // return toast.error("Server is not responding!");
                                  return toast.error(
                                    "getSensorsBySiteId site tree!",
                                  );
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
                                    sensors = data;
                                    props.setSensors(data);
                                    props.setEnableSensors(enableSensor);
                                    props.setDisableSensors(disableSensor);
                                    var alertFilterTemp = {
                                      ...props.alerttFilter,
                                      SiteID: item.iDs[siteindex],
                                    };

                                    props.setAlertFilter(alertFilterTemp);
                                    getAlerts(alertFilterTemp, (isOk, data) => {
                                      if (!isOk) {
                                        // return toast.error("Server is not responding!");
                                        return toast.error(
                                          "could not get alerts!",
                                        );
                                      } else {
                                        setTimeout(function () {
                                          console.log("data", data);
                                          let alerts = data.map((item) => [
                                            siteName,
                                            item.sensorCode,
                                            item.problem,
                                            convertDate(item.startDateTime),
                                            item.endDateTime == null
                                              ? "--"
                                              : convertDate(item.endDateTime),
                                            item.endDateTime == null
                                              ? "Yes"
                                              : "No",
                                            null,
                                            item.id,
                                            siteId,
                                          ]);
                                          console.log(alerts);
                                          props.setAlert(alerts);
                                        }, 1000);
                                      }
                                    });
                                  } else {
                                    return toast.error(
                                      "No sensors found for this site!",
                                    );
                                  }
                                }
                              },
                            );
                          }
                        });
                      }
                    });
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      src={
                        item.status[siteindex] == "OK"
                          ? normalIcon
                          : item.status[siteindex] == "notOK"
                          ? alarmIcon
                          : nullIcon
                      }
                      style={{
                        // border: 'solid',
                        // borderWidth: '0.1rem',
                        width: "40px",
                        borderRadius: "3rem",
                        // borderColor:'red',
                        height: "40px",
                        webkitBoxShadow: "0px 0px 8px -4px rgba(0,0,0,0.45)",
                        mozBoxShadow: "0px 0px 8px -4px rgba(0,0,0,0.45)",
                        boxShadow: "0px 0px 8px -4px rgba(0,0,0,0.45)",
                      }}
                    />
                  </ListItemAvatar>

                  <ListItemText
                    id={cityindex + 10 * siteindex + 2}
                    primary={
                      <>
                        <Typography style={{ fontSize: "0.7vw" }}>
                          {site}
                        </Typography>
                      </>
                    }
                  />
                </ButtonBase>
              </ListItem>
            </>
          ))}
        </StyledTreeItem>
      ))}
    </TreeView>
    </>
  );
}

{
  /* <Checkbox
edge="end"
onChange={handleToggleCheckBox(site)}
checked={checked.indexOf(site) !== -1}
inputProps={{ 'aria-labelledby': `checkbox-list-secondary-label-${site}` }}
/> */
}
