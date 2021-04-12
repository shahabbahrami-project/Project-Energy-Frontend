import React, { useRef, useState } from "react";

import { Button } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Divider from '@material-ui/core/Divider';
// styles
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import { Typography } from "../../components/Wrappers";
import { uploadUserPhoto } from "../../api/api_login";
import { toast } from "react-toastify";

import TransList from "./components/SiteList/TransList";
import Search from "./components/Search/Search";
import { withStyles } from "@material-ui/core/styles";
import StyledSwitch from "./components/Switch/StyledSwitch";
import Switch from '@material-ui/core/Switch';
import { getAllUsersApi } from "../../api/api_users";


import { TextField } from "@material-ui/core";
import { getAllSites } from "../../api/api_sites";
import { set } from "date-fns";
const Users = () => {
  var classes = useStyles();


  const [buttonState, setButtonState] = useState(false);
  const [buttonStateAdmin, setButtonStateAdmin] = useState(false);
  const [users, setUsers] = useState([])
  var [activeTabId, setActiveTabId] = useState(0);
  const [selectedUser, setSelectedUser] = React.useState({ id: "", fullName: "", email: "", password: null, profilePic: "", isAdmin: false, ibserverInSiteIds: "", operatorInSiteIds: "", activationCode: null, numberOfFails: null, isSuspend: null, isDelete: null });
  const [sites, setSites] = useState([]);
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);


  const handleChange = (e) => {
    setButtonState(e.target.checked);

    if (e.target.checked) {
      setActiveTabId(0)
      getAllUsersApi((isOk, data) => {
        if (!isOk) {
          return toast.error("Server is not responding for users!");

        }
        else {
          toast.success("Users Data Received!");
          setUsers(data);
          getAllSites((isOk, data) => {
            if (!isOk) {
              return toast.error("Server is not responding for filtering!");
            }
            else {
              toast.success("Data Received After Filtering!");
              setSites(data);
              const siteNames=data.map(item=>item.siteName)
              setLeft(siteNames)

            }
          })
        }
      }
      )
    }
    else {
      setActiveTabId(1)
      getAllSites((isOk, data) => {
        if (!isOk) {
          return toast.error("Server is not responding for filtering!");
        }
        else {
          toast.success("Data Received After Filtering!");
          setSites(data);
          const siteNames=data.map(item=>item.siteName)
          setLeft(siteNames)
        }
      })
    }

  };


  const handleChangeAdmin = (e) => {
    setButtonStateAdmin(e.target.checked);


  };
 

  
 

  let props = {
    buttonState: buttonState,
    setButtonState: setButtonState,
    buttonStateAdmin: buttonStateAdmin,
    setButtonStateAdmin: setButtonStateAdmin,
    users: users,
    setUsers: setUsers,
    selectedUser: selectedUser,
    setSelectedUser: setSelectedUser,
    sites:sites,
    setSites:setSites,
    left:left,
    setLeft:setLeft,
    right:right,
    setRight:setRight
  }

  return (
    <>
      <PageTitle title="Users Registration" img="" style={{ backgroundImage: 'linear-gradient(to right top, #f5f6f7, #deeefa, #c3e8fb, #a2e2fa, #7bdcf6)' }} />

      <Grid container spacing={4}>
        <Grid item xs={7} md={3}>
          <Widget title="General Information" disableWidgetMenu>
            <Divider />
            <div className={classes.dashedBorder}>
              <Typography component="div">
                <Grid component="label" container alignItems="center" spacing={1} style={{ margin: '-30px 0px 10px -20px' }}>
                  <Grid item>Update an exiting user: </Grid>
                  <Grid item>No</Grid>
                  <Grid item>
                    <StyledSwitch checked={buttonState} onChange={e => handleChange(e)} name="checked" />
                  </Grid>
                  <Grid item>Yes</Grid>
                </Grid>
              </Typography>
              <Search {...props} />
              <Divider className={classes.dividerUnderSearch} />

              {activeTabId === 0 && (
                <React.Fragment>


                  <TextField
                    id="fullname"
                    variant="outlined"
                    style={{ marginLeft: '-1.1rem', width: '105%' }}
                    InputProps={{
                      classes: {
                        underline: classes.textFieldUnderline,
                        input: classes.textField,
                      },

                    }}
                    value={selectedUser.fullName}
                    // onChange={e => setLoginValue(e.target.value)}
                    margin="normal"
                    label="Full Name"
                    type="text"
                    fullWidth
                  />
                  <TextField
                    style={{ marginLeft: '-1.1rem', width: '105%' }}
                    id="email"
                    variant="outlined"
                    InputProps={{
                      classes: {
                        underline: classes.textFieldUnderline,
                        input: classes.textField,
                      },

                    }}
                    value={selectedUser.email}
                    // onChange={e => setLoginValue(e.target.value)}
                    margin="normal"
                    label="Email"
                    type="email"
                    fullWidth
                  />
                  <Typography component="div">
                    <Grid component="label" container alignItems="center" spacing={1} style={{ margin: '10px 0px 10px -20px' }}>
                      <Grid item>Is Admin: </Grid>
                      <Grid item>No</Grid>
                      <Grid item>
                        <StyledSwitch checked={buttonStateAdmin} onChange={e => handleChangeAdmin(e)} name="checkedAdmin" />
                      </Grid>
                      <Grid item>Yes</Grid>
                    </Grid>
                  </Typography>
                </React.Fragment>
              )
              }

              {activeTabId === 1 && (
                <React.Fragment>
                  <Typography variant="h1" className={classes.greeting}>
                    Welcome2!
                  </Typography>
                </React.Fragment>
              )
              }

              {/* <Typography variant="h6">h6. Heading</Typography> */}
            </div>
          </Widget>
        </Grid>
        <Grid item xs={10} md={9} style={{justifyContent:'left !important'}} >
          <Widget title="Assigned Sites as an Operator" disableWidgetMenu style={{display:'flex', float:'left', marginLeft:'-1rem'}}>
          <Divider />
            <div className={classes.dashedBorder}>
              <TransList {...props} />
            </div>



          </Widget>
          <Widget title="Assigned Sites as an Observer" disableWidgetMenu style={{display:'flex', float:'right',marginLeft:'-1rem'}}>
          <Divider />
            <div className={classes.dashedBorder}>
              <TransList {...props} />
            </div>



          </Widget>
        </Grid>
        

      </Grid>
    </>
  );
};

export default Users;