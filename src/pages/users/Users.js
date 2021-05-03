import React, { useEffect, useRef, useState } from "react";
import { Grid } from "@material-ui/core";
import Divider from '@material-ui/core/Divider';
// styles
import useStyles from "./styles";
import clsx from 'clsx';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckIcon from '@material-ui/icons/Check';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AutorenewSharpIcon from '@material-ui/icons/AutorenewSharp';
// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import { Typography } from "../../components/Wrappers";
import { toast } from "react-toastify";
import TransList from "./components/SiteListObserverOperator/TransList";
import Search from "./components/Search/Search";
import StyledSwitch from "./components/Switch/StyledSwitch";
import { AddNewUser, deleteUser, getAllUsersApi, updateUser } from "../../api/api_users";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { getAllSites } from "../../api/api_sites";
const Users = () => {
  var classes = useStyles();
  const [pageLoad, setpageLoad] = useState(true);
  const [buttonState, setButtonState] = useState(false);
  const [buttonStateAdmin, setButtonStateAdmin] = useState(false);
  const [buttonStateAdminAdd, setButtonStateAdminAdd] = useState(false);
  const [users, setUsers] = useState([])
  const [activeTabId, setActiveTabId] = useState(1);
  const [selectedUser, setSelectedUser] = React.useState({ id: "", fullName: "", email: "", password: null, profilePic: "", isAdmin: false, observerInSiteIds: "", operatorInSiteIds: "", activationCode: null, numberOfFails: null, isSuspend: null, isDelete: null });
  const [updateFlag, setUpdateFlag] = React.useState(false)
  const [sites, setSites] = useState([]);
  const [leftOperator, setLeftOperator] = React.useState([]);
  const [rightOperator, setRightOperator] = React.useState([]);
  const [leftObserver, setLeftObserver] = React.useState([]);
  const [rightObserver, setRightObserver] = React.useState([]);
  const [addUser, setAddUser] = useState({ features: { FullName: "", Email: "", IsAdmin: false, ObserverInSiteIds: "", OperatorInSiteIds: "" }, flag: false });
  const [loadingAdd, setLoadingAdd] = React.useState(false);
  const [successAdd, setSuccessAdd] = React.useState(false);
  const [loadingUpdate, setLoadingUpdate] = React.useState(false);
  const [successUpdate, setSuccessUpdate] = React.useState(false);
  const [loadingDelete, setLoadingDelete] = React.useState(false);
  const [successDelete, setSuccessDelete] = React.useState(false);
  const [siteListLeftState, setSiteListLeftState] = React.useState({});


  useEffect(() => {
    getAllSites((isOk, data) => {
      if (!isOk) {
        return toast.error("Server is not responding for filtering!");
      }
      else {
        setSites(data);
        var siteListLeft = {}
        const siteNames = data.map(item => siteListLeft[String(item.siteName) + " (" + String(item.city) + ")"] = item.id)
        setLeftOperator(Object.keys(siteListLeft))
        setLeftObserver(Object.keys(siteListLeft))
        setSiteListLeftState(siteListLeft)
      }
    })
  }, [pageLoad])




  const buttonClassnameAdd = clsx({
    [classes.buttonSuccess]: successAdd,
  });
  const buttonClassnameUpdate = clsx({
    [classes.buttonSuccess]: successUpdate,
  });
  const buttonClassnameDelete = clsx({
    [classes.buttonSuccess]: successUpdate,
  });
  const handleChange = (e) => {
    setButtonState(e.target.checked);
    if (e.target.checked) {
      setActiveTabId(0)
      setLeftOperator([])
      setLeftObserver([])
      setRightOperator([])
      setRightObserver([])
      getAllUsersApi((isOk, data) => {
        if (!isOk) {
          return toast.error("Server is not responding for users!");
        }
        else {
         // toast.success("Users Data Received!");
          setUsers(data);

        }
      })
    }
    else {
      setActiveTabId(1)
      setRightOperator([])
      setRightObserver([])
      setLeftOperator(Object.keys(siteListLeftState))
      setLeftObserver(Object.keys(siteListLeftState))
      setSelectedUser({ id: "", fullName: "", email: "", password: null, profilePic: "", isAdmin: false, observerInSiteIds: "", operatorInSiteIds: "", activationCode: null, numberOfFails: null, isSuspend: null, isDelete: null })
      setUpdateFlag(false)
    }
  };


  const handleChangeAdmin = (e) => {
    setButtonStateAdmin(e.target.checked);
    setSelectedUser({ ...selectedUser, isAdmin: e.target.checked })
  };

  const handleChangeAdminAdd = (e) => {
    setButtonStateAdminAdd(e.target.checked);
    setAddUser({ ...addUser, features: { ...addUser.features, IsAdmin: e.target.checked } });
  };


  useEffect(() => {
    if (addUser.flag == true) {
      setLoadingAdd(true);
      AddNewUser(addUser.features, (isOk, data) => {
        if (!isOk) {
          setSuccessAdd(false);
          setLoadingAdd(false);
          return toast.error("Server is not responding to Add New User!");
        }
        else {
          setSuccessAdd(true);
          toast.success("Data for New User is Sent!");
          setAddUser({ features: { FullName: "", Email: "", IsAdmin: false, ObserverInSiteIds: "", OperatorInSiteIds: "" }, flag: false });
          setLoadingAdd(false);
          setSuccessAdd(false);
          setLeftOperator(Object.keys(siteListLeftState))
          setRightOperator([])
          setLeftObserver(Object.keys(siteListLeftState))
          setRightObserver([])
        }
      })
    }

  }, [addUser]);


  const handleButtonClickAdd = (e) => {
    const arrayObserver = rightObserver.map(item => siteListLeftState[item])
    var textObserver = ""
    if (arrayObserver.length > 0) { textObserver = arrayObserver.join() }
    var textOperator = ""
    const arrayOperator = rightOperator.map(item => siteListLeftState[item])
    if (arrayOperator.length > 0) { textOperator = arrayOperator.join() }
    setAddUser({ ...addUser, features: { ...addUser.features, ObserverInSiteIds: textObserver, OperatorInSiteIds: textOperator }, flag: true })
  };

  const handleButtonClickUpdate = () => {
    const arrayObserver = rightObserver.map(item => siteListLeftState[item])
    var textObserver = ""
    if (arrayObserver.length > 0) { textObserver = arrayObserver.join() }
    var textOperator = ""
    const arrayOperator = rightOperator.map(item => siteListLeftState[item])
    if (arrayOperator.length > 0) { textOperator = arrayOperator.join() }
    setSelectedUser({ ...selectedUser, observerInSiteIds: textObserver, operatorInSiteIds: textOperator })
    setUpdateFlag(true)
  };

  useEffect(() => {
    if (updateFlag == true) {
      let user = {
        id : selectedUser.id,
        fullName : selectedUser.fullName,
        email : selectedUser.email, 
        isAdmin : selectedUser.isAdmin,
        observerInSiteIds: selectedUser.observerInSiteIds,
        operatorInSiteIds: selectedUser.operatorInSiteIds,
        activationCode: selectedUser.activationCode,
        numberOfFails: selectedUser.numberOfFails,
        isSuspend: selectedUser.isSuspend,
        isDeleted: selectedUser.isDeleted,
      }
      setLoadingUpdate(true);
      updateUser(user, (isOk, data) => {
        if (!isOk) {
          setSuccessUpdate(false);
          setLoadingUpdate(false);
          return toast.error("Server is not responding!");
        }
        else {
          toast.success("User has been updated from database!");
          setSuccessUpdate(true);
          getAllUsersApi((isOk, data) => {
            if (!isOk) {
              return toast.error("Server is not responding for users!");
            }
            else {
            //  toast.success("Users Data Received!");
              setUsers(data);
              setSuccessUpdate(false);
              setLoadingUpdate(false);
              setUpdateFlag(false)
            }
          })
        }
      })
    }

  }, [selectedUser]);





  const handleButtonClickDelete = () => {
    setSuccessDelete(false);
    setLoadingDelete(true);
    deleteUser(selectedUser, (isOk, data) => {
      if (!isOk) {
        setSuccessDelete(false);
        setLoadingDelete(false);
        return toast.error("Server is not responding!");
      }
      else {
        toast.success("User has been deleted from database!");
        setSuccessDelete(true);
        getAllUsersApi((isOk, data) => {
          if (!isOk) {
            return toast.error("Server is not responding for users!");
          }
          else {
            toast.success("Users Data Received!");
            setUsers(data);
            setSelectedUser({ id: "", fullName: "", email: "", password: null, profilePic: "", isAdmin: false, ibserverInSiteIds: "", operatorInSiteIds: "", activationCode: null, numberOfFails: null, isSuspend: null, isDelete: null })
            setButtonStateAdmin(false);
            setSuccessDelete(false);
            setLoadingDelete(false);
          }
        })
      }
    })
  };

  let propsObserver = {
    left: leftObserver,
    setLeft: setLeftObserver,
    right: rightObserver,
    setRight: setRightObserver
  }

  let propsOperator = {
    left: leftOperator,
    setLeft: setLeftOperator,
    right: rightOperator,
    setRight: setRightOperator
  }
  let props = {
    buttonState: buttonState,
    setButtonState: setButtonState,
    buttonStateAdmin: buttonStateAdmin,
    setButtonStateAdmin: setButtonStateAdmin,
    users: users,
    setUsers: setUsers,
    selectedUser: selectedUser,
    setSelectedUser: setSelectedUser,
    sites: sites,
    setSites: setSites,
    siteListLeftState: siteListLeftState,

    leftObserver: leftObserver,
    setLeftObserver: setLeftObserver,
    rightObserver: rightObserver,
    setRightObserver: setRightObserver,

    leftOperator: leftOperator,
    setLeftOperator: setLeftOperator,
    rightOperator: rightOperator,
    setRightOperator: setRightOperator
  }

  return (
    <>
      <PageTitle title="Users Registration" img="" style={{ backgroundImage: 'linear-gradient(to right top, #f5f6f7, #deeefa, #c3e8fb, #a2e2fa, #7bdcf6)' }} />

      <Grid container spacing={4}>
        <Grid item xs={7} md={3}>
          <Widget title="General Information" disableWidgetMenu>
            <Divider />
            <div className={classes.dashedBorder}>
              <Typography component="div" style={{ fontSize: '0.75vw' }}>
                <Grid component="label" container alignItems="center" spacing={1} style={{ margin: '-30px 0px 10px -10px', width:'17vw' }}>
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

                  <FormControl className={classes.textField0} variant="outlined">
                    <InputLabel htmlFor="fullname" classes={{ root: classes.textField1, shrink: classes.textField3 }} >Full Name</InputLabel>
                    <OutlinedInput
                      classes={{ root: classes.textField2 }}
                      id="outlined-adornment-fullname"
                      type={'text'}
                      value={selectedUser.fullName}
                      onChange={e => setSelectedUser({ ...selectedUser, fullName: e.target.value })}
                      label={"Full Name"}

                    />
                  </FormControl>

                  <FormControl className={classes.textField0} variant="outlined">
                    <InputLabel htmlFor="email" classes={{ root: classes.textField1, shrink: classes.textField3 }} >Email</InputLabel>
                    <OutlinedInput
                      classes={{ root: classes.textField2 }}
                      id="outlined-adornment-email"
                      type={'text'}
                      value={selectedUser.email}
                      onChange={e => setSelectedUser({ ...selectedUser, email: e.target.value })}
                      label={"Email"}

                    />
                  </FormControl>

                  <Typography component="div" style={{ fontSize: '0.75vw' }}>
                    <Grid component="label" container alignItems="center" spacing={1} style={{ margin: '10px 0px 10px -10px' }}>
                      <Grid item>Is Admin: </Grid>
                      <Grid item>No</Grid>
                      <Grid item>
                        <StyledSwitch checked={buttonStateAdmin} onChange={e => handleChangeAdmin(e)} name="checkedAdmin" />
                      </Grid>
                      <Grid item>Yes</Grid>
                    </Grid>
                  </Typography>
                  <div className={classes.wrapper} >
                    <Fab
                      style={{ backgroundColor: '#B638D1', color: 'white' }}
                      aria-label="update"
                      // backgroundColor='#B638D1'
                      className={buttonClassnameUpdate}
                      onClick={handleButtonClickUpdate}
                    >
                      {successUpdate ? <CheckIcon /> : <AutorenewSharpIcon />}
                    </Fab>
                    {loadingUpdate && <CircularProgress size={68} className={classes.fabProgress} />}
                  </div>
                  <div className={classes.wrapperDelete} >
                    <Fab
                      style={{ backgroundColor: '#CE3A00', color: 'white' }}
                      aria-label="delete"
                      // backgroundColor='#B638D1'
                      className={buttonClassnameDelete}
                      onClick={handleButtonClickDelete}
                    >
                      {successDelete ? <CheckIcon /> : <DeleteForeverIcon />}
                    </Fab>
                    {loadingDelete && <CircularProgress size={68} className={classes.fabProgress} />}
                  </div>
                </React.Fragment>
              )}
              {activeTabId === 1 && (
                <React.Fragment>


                  <FormControl className={classes.textField0} variant="outlined">
                    <InputLabel htmlFor="fullname" classes={{ root: classes.textField1, shrink: classes.textField3 }} >Full Name</InputLabel>
                    <OutlinedInput
                      classes={{ root: classes.textField2 }}
                      id="outlined-adornment-fullname"
                      type={'text'}
                      value={addUser.FullName}
                      onChange={e => setAddUser({ ...addUser, features: { ...addUser.features, FullName: e.target.value } })}
                      label={"Full Name"}

                    />
                  </FormControl>

                  <FormControl className={classes.textField0} variant="outlined">
                    <InputLabel htmlFor="email" classes={{ root: classes.textField1, shrink: classes.textField3 }} >Email</InputLabel>
                    <OutlinedInput
                      classes={{ root: classes.textField2 }}
                      id="outlined-adornment-email"
                      type={'text'}
                      value={addUser.Email}
                      onChange={e => setAddUser({ ...addUser, features: { ...addUser.features, Email: e.target.value } })}
                      label={"Email"}

                    />
                  </FormControl>



                  <Typography component="div" style={{fontSize:'0.75vw'}}>
                    <Grid component="label" container alignItems="center" spacing={1} style={{ margin: '10px 0px 10px -10px' }}>
                      <Grid item>Is Admin: </Grid>
                      <Grid item>No</Grid>
                      <Grid item>
                        <StyledSwitch checked={buttonStateAdminAdd} onChange={e => handleChangeAdminAdd(e)} name="checkedAdmin" />
                      </Grid>
                      <Grid item>Yes</Grid>
                    </Grid>
                  </Typography>

                  <div className={classes.wrapper}>
                    <Fab
                      aria-label="save"
                      color="secondary"
                      className={buttonClassnameAdd}
                      onClick={e => handleButtonClickAdd(e)}
                    >
                      {successAdd ? <CheckIcon /> : <AddIcon />}
                    </Fab>
                    {loadingAdd && <CircularProgress size={68} className={classes.fabProgress} />}
                  </div>
                </React.Fragment>
              )}
            </div>
          </Widget>
        </Grid>
        <Grid item xs={10} md={9} style={{ justifyContent: 'left !important' }} >
          <Widget title="Assigned Sites as an Operator" disableWidgetMenu style={{ display: 'flex', float: 'left', width: '49.8%', marginLeft: '-1rem' }}>
            <Divider />
            <div className={classes.dashedBorder}>
              <TransList {...propsOperator} />
            </div>
          </Widget>
          <Widget title="Assigned Sites as an Observer" disableWidgetMenu style={{ display: 'flex', float: 'left', width: '49.8%', marginLeft: '1rem' }}>
            <Divider />
            <div className={classes.dashedBorder}>
              <TransList {...propsObserver} />
            </div>
          </Widget>
        </Grid>


      </Grid>
    </>
  );
};

export default Users;