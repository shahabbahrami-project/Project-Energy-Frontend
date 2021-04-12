import React, { useState } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import useStyles from "./styles";
import Tab from "./components/Tabnew";
import SiteTree from "./components/SiteTree";
import Typography from '@material-ui/core/Typography';
import Widget from "../../components/Widget";
import { Grid } from "@material-ui/core";
const System = () => {
  const classes = useStyles();
  const [filterSite, setFilterSite] = useState({ siteName: "", city: "", VisitFrom: null, VisitTo: null, waterOrWaste: "", wellOrSurface: "", status: [] });
  const [sites, setSites] = useState([])
  const [cities, setCities] = useState([])


  let formProps = {
    sites: sites,
    sitesDataSet: setSites,

    filterSite: filterSite,
    setFilterSite: setFilterSite,
    cities: cities,
    setCities: setCities,
  }
  return (
    <>
      <PageTitle title="Systems" />
      <div className={classes.wrapperStyle}>
        <Tab {...formProps}></Tab>
        <Grid container spacing={2}>
          <Grid item xs={12} md={9} >
            <Tab {...formProps}></Tab>
            <div className={classes.formDivStyleLeft}>
              <SiteTree {...formProps} />
            </div>
            <div style={{ float: 'right', width: '76%', marginLeft: '0.5%', marginBottom: '2rem', borderColor: '#e3e3e361' }}>
              <div className={classes.mapDivStyle} >
                <Widget title="General Information" disableWidgetMenu>
                  <div className={classes.dashedBorder}>
                    <Typography variant="h1" className={classes.text}>
                      Place Photo Here
              </Typography>
                  </div>
                </Widget>
              </div>
            </div>
          </Grid>
          <Grid item xs={9} md={3}>
            <div className={classes.formDivStyleRight}>
              <SiteTree {...formProps} style={{marginTop:'5rem'}}/>
            </div>

          </Grid>

        </Grid>

        <div className={classes.formDivStyle}>



        </div>
      </div>



    </>
  );
};

export default System;
