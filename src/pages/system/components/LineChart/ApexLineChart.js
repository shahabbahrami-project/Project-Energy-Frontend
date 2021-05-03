import React from "react";
import ApexCharts from "react-apexcharts";
import { useTheme } from "@material-ui/styles";




export default function ApexLineChart(props) {
  var theme = useTheme();
  let ids=props.sensorData.reduce((ids, item, index) => {
    if (item.status=='notOK') {
      ids.push({
        seriesIndex: 0,
        dataPointIndex: index,
        fillColor: '#ff0000',
        strokeColor: '#ff0000',
        size: 6
      });
    }
    return ids;
  }, []);
  let series = [
    {
      name: props.sensorDataFilter.sensorCode,
      data: props.sensorData.map(item=>item.sensorValue),
    },
  ];

  function themeOptions(theme) {
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
            offsetX: 0,
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

      markers: {
        size: 1,
        strokeWidth: 1,
        radius: 2,
        strokeColors: '#002145',
        showNullDataPoints: false,
        discrete: ids,
      },

      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "stepline",
        width: 2,
        dashArray:3
      },
      xaxis: {
        type: "datetime",
        categories: props.sensorData.map(item=>item.reportDateTime),
        title: {
          text: 'Time',
          offsetX: 0,
          offsetY: 5,
        },
      },
      yaxis:{
        labels:{
            formatter: function (val,index){
              return val.toFixed(2);
            }
        },
        title: {
          text: 'Sensor Value'
        },
      },
      tooltip: {
        x: {
          format: "dd/MM HH:mm",
        },
      },
      fill: {
        colors: [theme.palette.primary.light],
      },
      colors: [theme.palette.primary.main],
      legend: {
        show: false,
      },


    };
  }
  return (
    <ApexCharts
      options={themeOptions(theme)}
      series={series}
      type="line"
      height={250}
     
    />
  );
}

// ############################################################

