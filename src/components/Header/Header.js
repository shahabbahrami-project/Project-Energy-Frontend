import React, { useRef, useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Fab,
  Link
} from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {
  Home as HomeIcon,
  FormatSize as TypographyIcon,
  FilterNone as UIElementsIcon,
  BorderAll as TableIcon,
  QuestionAnswer as SupportIcon,
  LibraryBooks as LibraryIcon,
  HelpOutline as FAQIcon,
  ArrowBack as ArrowBackIcon, DesktopWindows,
  Menu as MenuIcon,
  MailOutline as MailIcon,
  NotificationsNone as NotificationsIcon,
  Person as AccountIcon,
  Search as SearchIcon,
  Send as SendIcon,
} from "@material-ui/icons";

import AssignmentIcon from '@material-ui/icons/Assignment';
import classNames from "classnames";

// styles
import useStyles from "./styles";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
// components
import { Badge, Typography, Button } from "../Wrappers";
import Notification from "../Notification/Notification";
import UserAvatar from "../UserAvatar/UserAvatar";


import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LockRoundedIcon from '@material-ui/icons/LockRounded';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import clsx from 'clsx';
// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";
import { useUserDispatch, signOut } from "../../context/UserContext";
import { uploadUserPhoto, changePasswordAPI } from "../../api/api_login";
import { toast } from "react-toastify";
import {
  TextField,
  Fade,
  CircularProgress,
} from "@material-ui/core";
import { getOneUserApi } from "../../api/api_users";
import { getAllSites } from "../../api/api_sites";

export default function Header(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();
  var layoutDispatch = useLayoutDispatch();
  var userDispatch = useUserDispatch();

  // local
  var [mailMenu, setMailMenu] = useState(null);
  var [isMailsUnread, setIsMailsUnread] = useState(true);
  var [notificationsMenu, setNotificationsMenu] = useState(null);
  var [isNotificationsUnread, setIsNotificationsUnread] = useState(true);
  var [profileMenu, setProfileMenu] = useState(null);
  var [isSearchOpen, setSearchOpen] = useState(false);
  const [openInfo, setOpenInfo] = React.useState(false);
  const [imageFile, setImageFile] = useState();
  const [imagePath, setImagePath] = useState();
  const inputRef = useRef();



  var [securityCode, setSecurityCode] = useState(null);
  var [currentPasswordReg, setCurrentPasswordReg] = useState("");
  var [passwordReg, setPasswordReg] = useState("");
  var [confPasswordReg, setConfPasswordReg] = useState("");
  var [showPassword, setShowPassword] = useState(false);


  const [pageload, setPageload] = useState(true);
  const [siteListLeftState, setSiteListLeftState] = React.useState({});

  const [observer, setObserver] = useState([])
  const [operator, setOperator] = useState([])
  const [name, setName] = useState("")
  function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }
  useEffect(() => {
    getAllSites((isOk, data) => {
      if (!isOk) {
        return toast.error("Server is not responding for filtering!");
      }
      else {
        var siteListLeft = {}
        const siteNames = data.map(item => siteListLeft[String(item.siteName) + " (" + String(item.city) + ")"] = item.id)
        const userID = localStorage.getItem("user_id")
        getOneUserApi(userID, (isOk, data) => {
          if (!isOk) {
            toast.error("Server is not responding for User Information!")
          }
          else {
            
            toast.success("User Information is received from database!")
            const arrayObserver = data.observerInSiteIds.split(',').map(Number);
            const siteObserList = arrayObserver.map(item => getKeyByValue(siteListLeft, item))
            setObserver(siteObserList);
            setName(data.fullName)
            const arrayOperator = data.operatorInSiteIds.split(',').map(Number);
            const siteOperList = arrayOperator.map(item => getKeyByValue(siteListLeft, item))
            setOperator(siteOperList);

          }
        }
        )


      }
    })
  }, [pageload])

















  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);


  const handleOpen2 = () => {
    setOpenInfo(true);
  };

  const EnterUnsuccessPassChange = "Password Could not be Changed! Try Again...";
  const EnterSuccessPassChange = "Your Password has been Changed Successfully...";
  const handleChangePassword_Step3 = (currentpass, newpass, confpass, setIsLoading, setError) => {
    if (newpass != confpass)
      return toast.error("Password fields are not matched!");
    setError(false);
    setIsLoading(true);
    const changepass = {
      currentPassword: currentpass,
      newPassword: newpass
    }
    changePasswordAPI(changepass, (isOk, data) => {
      if (isOk) {
        setTimeout(() => {
          setError(null)
          setIsLoading(false)
          toast.success(EnterSuccessPassChange);
        }, 2000);
        setCurrentPasswordReg("");
        setPasswordReg("");
        setConfPasswordReg("");

      } else {
        setError(true);
        setIsLoading(false);
        return toast.error(EnterUnsuccessPassChange);
      }
    })
  };

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0])
      console.log(e.target.files)
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePath(e.target.result);
        console.log(e.target.result)
      };
      reader.readAsDataURL(e.target.files[0]);
      const ProfilePic = new FormData();
      ProfilePic.append('ProfilePic', e.target.files[0]);
      console.log(...ProfilePic)
      uploadUserPhoto(ProfilePic, (isOk, data) => {
        if (!isOk)
          return toast.error(data);
        toast.success("success.uploadProfPic")
        localStorage.setItem("image", data.imagePath);
      })

    }
  };

  const getImage = () => {
    if (imagePath)
      return imagePath;
    if (localStorage.getItem("image") && localStorage.getItem("image") !== 'undefined')
      return localStorage.getItem("image");
    else {
      const userID = localStorage.getItem("user_id")
      console.log(userID)
      getOneUserApi(userID, (isOk, data) => {
        if (!isOk) {
          toast.error("Server is not responding for profile picture!")
          return "/images/bill.jpg"
        }
        else {
          console.log(data.profilePic)
          toast.success("Profile picture is received from database!")
          localStorage.setItem("image", data.profilePic);
          return localStorage.getItem("image");
        }
      }
      )
    }

  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          onClick={() => toggleSidebar(layoutDispatch)}
          className={classNames(
            classes.headerMenuButtonSandwich,
            classes.headerMenuButtonCollapse,
          )}
        >
          {layoutState.isSidebarOpened ? (
            <MenuIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          ) : (
              <MenuIcon
                classes={{
                  root: classNames(
                    classes.headerIcon,
                    classes.headerIconCollapse,
                  ),
                }}
              />
            )}
        </IconButton>
        <Typography variant="h6" weight="medium" className={classes.logotype}>
          Energy & Space Management Dashboard
        </Typography>
        <div className={classes.grow} />



        <IconButton
          aria-haspopup="true"
          color="inherit"
          className={classes.headerMenuButton}
          aria-controls="profile-menu"
          onClick={e => setProfileMenu(e.currentTarget)}
        >
          <img src={getImage()} style={{ width: '3rem', borderRadius: '5rem' }} classes={{ root: classes.headerIcon }} />
        </IconButton>
        <Menu
          id="profile-menu"
          open={Boolean(profileMenu)}
          anchorEl={profileMenu}
          onClose={() => setProfileMenu(null)}
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem
        >
          <div className={classes.profileMenuUser}>
            <Typography variant="h4" weight="medium">
              {name}
            </Typography>
            <Typography
              className={classes.profileMenuLink}
              component="a"
              color="primary"
            >
            </Typography>
          </div>
          <MenuItem
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem,
            )}
          >
            <AccountCircleIcon className={classes.profileMenuIcon} />
            <Typography
              className={classes.profileMenuLink}
              color="primary"
              onClick={() => {
                inputRef.current.click();
              }}
            >
              Change Profile Photo
            </Typography>
            <input ref={inputRef} type={'file'} onChange={handleAvatarChange} style={{ marginLeft: '3rem' }} />
          </MenuItem>
          <div
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem,
            )}
            style={{ marginBottom: '0.1rem' }}
          >
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="change password"
              >
                <LockRoundedIcon className={classes.profileMenuIcon} />
                <Typography className={classes.heading}>Change Password</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormGroup column style={{ width: '60%', marginLeft: '2rem', marginBottom: '2rem' }}>
                  <Fade in={error}>
                    <Typography color="secondary" className={classes.errorMessage}>
                      Something is wrong, please try again
                </Typography>

                  </Fade>
                  <FormControl style={{ width: '115%', marginTop: '1rem' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Current Password</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      value={currentPasswordReg}
                      onChange={e => setCurrentPasswordReg(e.target.value)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      labelWidth={140}
                    />
                  </FormControl>



                  <FormControl style={{ width: '115%', marginTop: '1.7rem' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      value={passwordReg}
                      onChange={e => setPasswordReg(e.target.value)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      labelWidth={120}
                    />
                  </FormControl>

                  <FormControl style={{ width: '115%', marginTop: '1.7rem' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Confirm New Password</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      value={confPasswordReg}
                      onChange={e => setConfPasswordReg(e.target.value)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      labelWidth={170}
                    />
                  </FormControl>
















                  <div className={classes.creatingButtonContainer}>
                    {isLoading ? (
                      <CircularProgress size={26} />
                    ) : (
                        <Button
                          size="large"
                          variant="contained"
                          color="primary"
                          fullWidth
                          className={classes.createAccountButton}
                          onClick={() => handleChangePassword_Step3(
                            currentPasswordReg,
                            passwordReg,
                            confPasswordReg,
                            setIsLoading,
                            setError)}
                        >
                          Change Password
                        </Button>
                      )}
                  </div>
                </FormGroup>
              </AccordionDetails>
            </Accordion>
          </div>


          <div
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem,
            )}
          >
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="user info"
              >
                <AssignmentIcon className={classes.profileMenuIcon} />
                <Typography className={classes.heading}>Information Summary</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                Operator in sites: {operator.map(item=>String(item)+"   ")} <br/>
                Observer in sites: {observer.map(item=>String(item)+"   ")}
               </Typography>

              </AccordionDetails>
            </Accordion>
          </div>


          <div className={classes.profileMenuUser}>
            <Typography
              className={classes.profileMenuLink}
              color="primary"
              onClick={() => signOut(userDispatch, props.history)}
            >
              Sign Out
            </Typography>
          </div>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
