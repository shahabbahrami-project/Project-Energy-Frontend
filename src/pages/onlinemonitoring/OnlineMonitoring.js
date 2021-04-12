import React, { useState, useEffect } from "react";
import {
  Grid,
  LinearProgress,
  Select,
  OutlinedInput,
  MenuItem,
  Button
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import {
  ResponsiveContainer,
  ComposedChart,
  AreaChart,
  LineChart,
  Line,
  Area,
  PieChart,
  Pie,
  Cell,
  YAxis,
  XAxis,
  Tooltip,
} from "recharts";
import ApexCharts from "react-apexcharts";
// styles
import useStyles from "./styles";

// components
import mock from "./mock";
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";
import Dot from "../../components/Sidebar/components/Dot";
import Table from "./components/Table/Table";
import BigStat from "./components/BigStat/BigStat";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Form from "./components/sensors/Form";
import Sites from "./Sites";

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ChartViewer from "./ChartViewer";



const mainChartData = getMainChartData();
const PieChartData = [
  { name: "Group A", value: 400, color: "primary" },
  { name: "Group B", value: 300, color: "secondary" },
  { name: "Group C", value: 300, color: "warning" },
  { name: "Group D", value: 200, color: "success" },
];

export default function OnlineMonitoring(props) {
  var classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };



  const [addSite, setAddSite] = useState({ features: { name: "", building: "", locationX: null, locationY: null, sensorOrmeter: "" }, markers: [] });
  const [filterSite, setFilterSite] = useState({ name: "", building: "", sensorOrmeter: "" });
  const [sites, setSites] = useState([])
  const [cities, setCities] = useState([])
  const [clickedSite, setClickedSite] = useState({ id: null, name: "", building: "", locationX: null, locationY: null, sensorOrmeter: "" })
  const [center, setCenter] = useState([49.261405231193415, -123.24899945696026])
  const [toggleMapCenter, setToggleMapCenter] = useState(false)
  const [heat, setHeat] = useState(false)





  const [dept, setDept] = useState([])
  const [filterDept, setFilterDept] = useState({ department: "CIRS_633", subject: "elec_power", startdate: "2020-01-06", enddate: "2020-01-07" })

  const [sensorData, setSensorData] = useState([])
  const [data, updateData] = useState([]);
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (sensorData.length!=0 && count<sensorData.length){
        setCount(count+1)
        console.log(sensorData)
        console.log(count)
        let array = [...data, sensorData[count]];
        updateData(array);
      }
    }, 100);
    return () => {
      window.clearInterval(interval);
    };
  }, [data]);





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
    heat: heat,
    setHeat: setHeat,

    dept: dept,
    setDept: setDept,
    filterDept: filterDept,
    setFilterDept: setFilterDept,
    sensorData: sensorData,
    setSensorData: setSensorData,
    data:data,
    updateData:updateData
  }






  let series_occupancy = [
    {
      name: "series_occupancy",
      data: data.map(item => item[0].occupancy),
    },

  ];

  let series_outdoorTemp = [
    {
      name: "series_outdoorTemp",
      data: data.map(item => item[0].outdoorTemp),
    },

  ];

  let series_desirableTemp = [
    {
      name: "series_desirableTemp",
      data: data.map(item => item[0].desirableTemp),
    },

  ];

  
  let series_setpoint = [
    {
      name: "series_setpoint",
      data: data.map(item => item[0].setpointManual),
    },

  ];

  let series_indoorTemp = [
    {
      name: "InddoorTemp_pre-scheduled setpoint",
      data: data.map(item => item[0].indoorTempManual),
    },
    {
      name: "InddoorTemp_DRL algorithm",
      data: data.map(item => item[0].indoorTempDRL),
    },


  ];

  let series_price = [
    {
      name: "series_price",
      data: data.map(item => item[0].price),
    },

  ];

  let series_cost = [
    {
      name: "cost_pre-scheduled setpoint",
      // data: sensorData.map(item => item.costManual),
      data: data.map(item=>item[0].costManual),
    },
    {
      name: "cost_DRL algorithm",
      // data: sensorData.map(item => item.costManual),
      data: data.map(item=>item[0].costDRL),
    },

  ];
  let series_cumcost = [
    {
      name: "cost_pre-scheduled setpoint",
      // data: sensorData.map(item => item.costManual),
      data: data.map(item=>item[0].cumcostManual),
    },
    {
      name: "cost_DRL algorithm",
      // data: sensorData.map(item => item.costManual),
      data: data.map(item=>item[0].cumcostDRL),
    },

  ];

  function themeOptions_occupancy(theme) {
    return {
      chart: {
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
            customIcons: []
          },
          autoSelected: 'zoom'
        },
        zoom: {
          enabled: true,
          type: 'x',
          resetIcon: {
            offsetX: -10,
            offsetY: 0,
            fillColor: '#fff',
            strokeColor: '#37474F'
          },
          selection: {
            background: '#90CAF9',
            border: '#0D47A1'
          }
        }
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "stepline",
        width: 1,
      },
      xaxis: {
        type: "datetime",
        categories: sensorData.map(item => item[0].time),
        title: {
          text: 'Time',
          offsetX: 0,
          offsetY: 5,
        },
      },
      // xaxis: {
      //   categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      // },
      yaxis:{
        title: {
          text: 'Number of People'
        },
      },
      tooltip: {
        x: {
          format: "dd/MM HH:mm",
        },
      },
      fill: {
        colors: [theme.palette.primary.light, theme.palette.success.light],
      },
      colors: ['#F44336'],
      legend: {
        show: false,
      },

    };
  }

  function themeOptions_outdoorTemp(theme) {
    return {
      chart: {
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
            customIcons: []
          },
          autoSelected: 'zoom'
        },
        zoom: {
          enabled: true,
          type: 'x',
          resetIcon: {
            offsetX: -10,
            offsetY: 0,
            fillColor: '#fff',
            strokeColor: '#37474F'
          },
          selection: {
            background: '#90CAF9',
            border: '#0D47A1'
          }
        }
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "stepline",
        width: 1,
      },
      xaxis: {
        type: "datetime",
        categories: sensorData.map(item => item[0].time),
        title: {
          text: 'Time',
          offsetX: 0,
          offsetY: 5,
        },
      },
      yaxis: {
        min: 10,
        title: {
          text: 'Outdoor Temperature ( °C )',
          offsetX: 0,
          offsetY: 0,
        },
      },
      tooltip: {
        x: {
          format: "dd/MM HH:mm",
        },
      },
      fill: {
        colors: [theme.palette.primary.light, theme.palette.success.light],
      },
      colors: ['#cf34eb'],
      legend: {
        show: false,
      },

    };
  }

  function themeOptions_desirableTemp(theme) {
    return {
      chart: {
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
            customIcons: []
          },
          autoSelected: 'zoom'
        },
        zoom: {
          enabled: true,
          type: 'x',
          resetIcon: {
            offsetX: -10,
            offsetY: 0,
            fillColor: '#fff',
            strokeColor: '#37474F'
          },
          selection: {
            background: '#90CAF9',
            border: '#0D47A1'
          }
        }
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "stepline",
        width: 1,
      },
      xaxis: {
        type: "datetime",
        categories: sensorData.map(item => item[0].time),
        title: {
          text: 'Time',
          offsetX: 0,
          offsetY: 5,
        },
      },
      yaxis: {
        min: 0,
        title: {
          text: 'Desirable Temperature ( °C )',
          offsetX: 0,
          offsetY: 0,
        },
      },
      tooltip: {
        x: {
          format: "dd/MM HH:mm",
        },
      },
      fill: {
        colors: [theme.palette.primary.light, theme.palette.success.light],
      },
      colors: ['#18ad2a'],
      legend: {
        show: false,
      },

    };
  }

  function themeOptions_setpoint(theme) {
    return {
      chart: {
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
            customIcons: []
          },
          autoSelected: 'zoom'
        },
        zoom: {
          enabled: true,
          type: 'x',
          resetIcon: {
            offsetX: -10,
            offsetY: 0,
            fillColor: '#fff',
            strokeColor: '#37474F'
          },
          selection: {
            background: '#90CAF9',
            border: '#0D47A1'
          }
        }
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "stepline",
        width: 1,
      },
      xaxis: {
        type: "datetime",
        categories: sensorData.map(item => item[0].time),
        title: {
          text: 'Time',
          offsetX: 0,
          offsetY: 5,
        },
      },
      yaxis: {
        min: 4,
        title: {
          text: 'Setpoint Temperature ( °C )',
          offsetX: 0,
          offsetY: 0,
        },
      },
      tooltip: {
        x: {
          format: "dd/MM HH:mm",
        },
      },
      fill: {
        colors: [theme.palette.primary.light, theme.palette.success.light],
      },
      colors: ['#a85432'],
      legend: {
        show: false,
      },

    };
  }

  function themeOptions_indoorTemp(theme) {
    return {
      chart: {
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
            customIcons: []
          },
          autoSelected: 'zoom'
        },
        zoom: {
          enabled: true,
          type: 'x',
          resetIcon: {
            offsetX: -10,
            offsetY: 0,
            fillColor: '#fff',
            strokeColor: '#37474F'
          },
          selection: {
            background: '#90CAF9',
            border: '#0D47A1'
          }
        }
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "stepline",
        width: 1,
      },
      xaxis: {
        type: "datetime",
        categories: sensorData.map(item => item[0].time),
        title: {
          text: 'Time',
          offsetX: 0,
          offsetY: 5,
        },
      },
      yaxis: {
        min: 10,
        title: {
          text: 'Indoor Temperature ( °C )',
          offsetX: 0,
          offsetY: 0,
        },
        labels:{
          formatter: function (val,index){
            return val.toFixed(2);
          }
        }
      },
      tooltip: {
        x: {
          format: "dd/MM HH:mm",
        },
      },
      fill: {
        colors: [theme.palette.primary.light, theme.palette.success.light],
      },
      colors: ['#3246a8','#32a4a8'],
      legend: {
        show: false,
      },

    };
  }


  function themeOptions_cost(theme) {
    return {
      chart: {
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
            customIcons: []
          },
          autoSelected: 'zoom',
          animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
              speed: 1000
            }
          },
        },
        zoom: {
          enabled: true,
          type: 'x',
          resetIcon: {
            offsetX: -10,
            offsetY: 0,
            fillColor: '#fff',
            strokeColor: '#37474F'
          },
          selection: {
            background: '#90CAF9',
            border: '#0D47A1'
          }
        }
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "stepline",
        width: 1,
      },
      xaxis: {
        type: "datetime",
        categories: sensorData.map(item => item[0].time),
        title: {
          text: 'Time',
          offsetX: 0,
          offsetY: 5,
        },
      },
      yaxis: {
        min: 0,
        title: {
          text: 'Cost ( cents )',
          offsetX: 0,
          offsetY: 0,
        },
        labels:{
          formatter: function (val,index){
            return (val/10).toFixed(2);
          }
        }
      },
      tooltip: {
        x: {
          format: "dd/MM HH:mm",
        },
      },
      fill: {
        colors: [theme.palette.primary.light, theme.palette.success.light],
      },
      colors: ['#7732a8'],
      legend: {
        show: false,
      },

    };
  }


  function themeOptions_cumcost(theme) {
    return {
      chart: {
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
            customIcons: []
          },
          autoSelected: 'zoom',
          animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
              speed: 1000
            }
          },
        },
        zoom: {
          enabled: true,
          type: 'x',
          resetIcon: {
            offsetX: -10,
            offsetY: 0,
            fillColor: '#fff',
            strokeColor: '#37474F'
          },
          selection: {
            background: '#90CAF9',
            border: '#0D47A1'
          }
        }
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "stepline",
        width: 1,
      },
      xaxis: {
        type: "datetime",
        categories: sensorData.map(item => item[0].time),
        title: {
          text: 'Time',
          offsetX: 0,
          offsetY: 5,
        },
      },
      yaxis: {
        min: 0,
        title: {
          text: 'Total Cost ( cents )',
          offsetX: 0,
          offsetY: 0,
        },
        labels:{
          formatter: function (val,index){
            return (val/10).toFixed(2);
          }
        }
      },
      tooltip: {
        x: {
          format: "dd/MM HH:mm",
        },
      },
      fill: {
        colors: [theme.palette.primary.light, theme.palette.success.light],
      },
      colors: ['#7732a8'],
      legend: {
        show: false,
      },

    };
  }
  
  function themeOptions_price(theme) {
    return {
      chart: {
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
            customIcons: []
          },
          autoSelected: 'zoom',
          animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
              speed: 1000
            }
          },
        },
        zoom: {
          enabled: true,
          type: 'x',
          resetIcon: {
            offsetX: -10,
            offsetY: 0,
            fillColor: '#fff',
            strokeColor: '#37474F'
          },
          selection: {
            background: '#90CAF9',
            border: '#0D47A1'
          }
        }
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "stepline",
        width: 1,
      },
      xaxis: {
        type: "datetime",
        categories: sensorData.map(item => item.time),
        title: {
          text: 'Time',
          offsetX: 0,
          offsetY: 5,
        },
      },
      yaxis: {
        min: 0,
        title: {
          text: 'Price ( cents per kW)',
          offsetX: 0,
          offsetY: 0,
        },
        labels:{
          formatter: function (val,index){
            return (val/10);
          }
        }
      },
      tooltip: {
        x: {
          format: "dd/MM HH:mm",
        },
      },
      fill: {
        colors: [theme.palette.primary.light, theme.palette.success.light],
      },
      colors: ['#7732a8'],
      legend: {
        show: false,
      },

    };
  }
  var theme = useTheme();
  // local
  var [mainChartState, setMainChartState] = useState("monthly");

  return (
    <>
      <PageTitle title="Online Monitoring" button={<Button
        variant="contained"
        size="medium"
        color="secondary"
      >
        Latest Reports
    </Button>} />
      <Grid container spacing={4}>
        {mock.bigStat.map(stat => (
          <Grid item md={4} sm={6} xs={12} key={stat.product}>
            <BigStat {...stat} >

            </BigStat>
          </Grid>
        ))}
        <Grid item md={4} sm={6} xs={12}>
          <Widget
            title="Sensors"
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}

          >
            <div className={classes.visitsNumberContainer}>
              <Grid container item alignItems={"center"}>
                <Grid item xs={6}>
                  <Typography color="text" colorBrightness="secondary" noWrap>
                    All Sensors
                </Typography>
                  <Typography size="xl" weight="medium" noWrap>
                    53
              </Typography>
                </Grid>
                <Grid item xs={6} style={{ marginRight: '-3rem' }}>
                  <Typography color="text" colorBrightness="secondary" noWrap>
                    Installed Sensors (past 5 months)
                </Typography>
                  <LineChart
                    width={210}
                    height={80}
                    data={[
                      { month: "Sep", sensors: 15 },
                      { month: "Oct", sensors: 10 },
                      { month: "Nov", sensors: 17 },
                      { month: "Dec", sensors: 18 },
                      { month: "Jan", sensors: 15 },
                    ]}
                  ><XAxis dataKey="month" />
                    <Tooltip />
                    <Line
                      type="line"
                      dataKey="sensors"
                      stroke={theme.palette.success.main}
                      strokeWidth={3}
                      dot={true}
                    />
                  </LineChart>
                </Grid>
              </Grid>
            </div>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item xs={4}>
                <Typography color="text" colorBrightness="secondary" noWrap>
                  Temprature
                </Typography>
                <Typography size="md">12</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography color="text" colorBrightness="secondary" noWrap>
                  Humidity
                </Typography>
                <Typography size="md">12</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography color="text" colorBrightness="secondary" noWrap>
                  Space
                </Typography>
                <Typography size="md">29</Typography>
              </Grid>
            </Grid>
          </Widget>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Widget
            title="Daily Average Values"
            upperTitle
            className={classes.card}
            bodyClass={classes.fullHeightBody}
          >
            <div className={classes.serverOverviewElement}>
              <Typography
                color="text"
                colorBrightness="secondary"
                className={classes.serverOverviewElementText}
                noWrap
              >
                17°С
              </Typography>
              <div className={classes.serverOverviewElementChartWrapper}>
                <ResponsiveContainer height={50} width="99%">
                  <AreaChart data={getRandomData(10)}  >

                    <Area
                      type="natural"
                      dataKey="value"
                      stroke={theme.palette.secondary.main}
                      fill={theme.palette.secondary.light}
                      strokeWidth={2}
                      fillOpacity="0.25"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className={classes.serverOverviewElement}>
              <Typography
                color="text"
                colorBrightness="secondary"
                className={classes.serverOverviewElementText}
                noWrap
              >
                60%
              </Typography>
              <div className={classes.serverOverviewElementChartWrapper}>
                <ResponsiveContainer height={50} width="99%">
                  <AreaChart data={getRandomData(10)}>
                    <Area
                      type="natural"
                      dataKey="value"
                      stroke={theme.palette.primary.main}
                      fill={theme.palette.primary.light}
                      strokeWidth={2}
                      fillOpacity="0.25"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className={classes.serverOverviewElement}>
              <Typography
                color="text"
                colorBrightness="secondary"
                className={classes.serverOverviewElementText}
                noWrap
              >
                13 people
              </Typography>
              <div className={classes.serverOverviewElementChartWrapper}>
                <ResponsiveContainer height={50} width="99%">
                  <AreaChart data={getRandomData(10)}>
                    <Area
                      type="natural"
                      dataKey="value"
                      stroke={theme.palette.warning.main}
                      fill={theme.palette.warning.light}
                      strokeWidth={2}
                      fillOpacity="0.25"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Widget>
        </Grid>

        <Grid item xs={12}>
          <>
            <div>
              <Sites {...formProps} />
            </div>
          </>
        </Grid>

        <Grid item xs={12}>

        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <AssessmentIcon />
          <Typography className={classes.heading}>Graphs</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{width:'100%'}}>
          <Widget
            bodyClass={classes.mainChartBody}
            header={
              <div className={classes.mainChartHeader}>
                {/* <Typography
                  variant="h5"
                  color="text"
                  colorBrightness="secondary"
                >
                  Daily Line Chart
                </Typography> */}
                <div className={classes.mainChartHeaderLabels}>
                  <div className={classes.mainChartHeaderLabel}>
                    <Dot color="#F44336" />
                    <Typography className={classes.mainChartLegentElement}>
                      Occupancy
                    </Typography>
                  </div>
                  <div className={classes.mainChartHeaderLabel}>
                    <Dot color="#cf34eb" />
                    <Typography className={classes.mainChartLegentElement}>
                      Outdoor Temperature
                    </Typography>
                  </div>
                  <div className={classes.mainChartHeaderLabel}>
                    <Dot color='#18ad2a' />
                    <Typography className={classes.mainChartLegentElement}>
                      Desirable Temperature
                    </Typography>
                  </div>
                </div>
                <Select
                  value={mainChartState}
                  onChange={e => setMainChartState(e.target.value)}
                  input={
                    <OutlinedInput
                      labelWidth={0}
                      classes={{
                        notchedOutline: classes.mainChartSelectRoot,
                        input: classes.mainChartSelect,
                      }}
                    />
                  }
                  autoWidth
                >
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                </Select>
              </div>
            }
          >

            <ApexCharts
              options={themeOptions_occupancy(theme)}
              series={series_occupancy}
              type="line"
              height={350} />

            <ApexCharts
              options={themeOptions_outdoorTemp(theme)}
              series={series_outdoorTemp}
              type="line"
              height={350} />

            <ApexCharts
              options={themeOptions_desirableTemp(theme)}
              series={series_desirableTemp}
              type="line"
              height={350} />


          </Widget>
          </div>
        
        </AccordionDetails>
      </Accordion>

        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <AssessmentIcon />
          <Typography className={classes.heading}>Graphs</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{width:'100%'}}>
          <Widget
            bodyClass={classes.mainChartBody}
            header={
              <div className={classes.mainChartHeader}>
                {/* <Typography
                  variant="h5"
                  color="text"
                  colorBrightness="secondary"
                >
                  Daily Line Chart
                </Typography> */}
                <div className={classes.mainChartHeaderLabels}>
                  <div className={classes.mainChartHeaderLabel}>
                    <Dot color="#a85432" />
                    <Typography className={classes.mainChartLegentElement}>
                      Setpoint Temperature
                    </Typography>
                  </div>
                  <div className={classes.mainChartHeaderLabel}>
                    <Dot color="#3246a8" />
                    <Typography className={classes.mainChartLegentElement}>
                      Indoor Temperature
                    </Typography>
                  </div>
                  <div className={classes.mainChartHeaderLabel}>
                    <Dot color="#7732a8" />
                    <Typography className={classes.mainChartLegentElement}>
                      Cost
                    </Typography>
                  </div>
                </div>
                <Select
                  value={mainChartState}
                  onChange={e => setMainChartState(e.target.value)}
                  input={
                    <OutlinedInput
                      labelWidth={0}
                      classes={{
                        notchedOutline: classes.mainChartSelectRoot,
                        input: classes.mainChartSelect,
                      }}
                    />
                  }
                  autoWidth
                >
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                </Select>
              </div>
            }
          >

            <ApexCharts
              options={themeOptions_setpoint(theme)}
              series={series_setpoint}
              type="line"
              height={350} />

            <ApexCharts
              options={themeOptions_indoorTemp(theme)}
              series={series_indoorTemp}
              type="line"
              height={350} />
            <ApexCharts
              options={themeOptions_price(theme)}
              series={series_price}
              type="line"
              height={350} />
            <ApexCharts
              options={themeOptions_cost(theme)}
              series={series_cost}
              type="bar"
              height={350}/>
            <ApexCharts
              options={themeOptions_cumcost(theme)}
              series={series_cumcost}
              type="bar"
              height={350} />
              {/* <ChartViewer data={data} title="Product Trends by Month" />*/} 
          </Widget>
          </div>
        
        </AccordionDetails>
      </Accordion>

         
        </Grid>
      </Grid>
    </>
  );
}


// #######################################################################
function getRandomData(length, min, max, multiplier = 10, maxDiff = 10) {
  var array = new Array(length).fill();
  let lastValue;

  return array.map((item, index) => {
    let randomValue = Math.floor(Math.random() * multiplier + 1);

    while (
      randomValue <= min ||
      randomValue >= max ||
      (lastValue && randomValue - lastValue > maxDiff)
    ) {
      randomValue = Math.floor(Math.random() * multiplier + 1);
    }

    lastValue = randomValue;

    return { value: randomValue };
  });
}

function getMainChartData() {
  var resultArray = [];
  var tablet = getRandomData(31, 3500, 6500, 7500, 1000);
  var desktop = getRandomData(31, 1500, 7500, 7500, 1500);
  var mobile = getRandomData(31, 1500, 7500, 7500, 1500);

  for (let i = 0; i < tablet.length; i++) {
    resultArray.push({
      tablet: tablet[i].value,
      desktop: desktop[i].value,
      mobile: mobile[i].value,
    });
  }

  return resultArray;
}
