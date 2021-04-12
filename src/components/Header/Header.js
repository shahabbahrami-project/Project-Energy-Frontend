import React, { useRef, useState } from "react";
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
    return "/images/bill.jpg"
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

        {/* <div
          className={classNames(classes.search, {
            [classes.searchFocused]: isSearchOpen,
          })}
        >
          <div
            className={classNames(classes.searchIcon, {
              [classes.searchIconOpened]: isSearchOpen,
            })}
            onClick={() => setSearchOpen(!isSearchOpen)}
          >
            <SearchIcon classes={{ root: classes.headerIcon }} />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
          />
        </div> */}

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
              Bill Gates
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
                {/* <Typography>
                  Your are operator in sites "XYZ" and observer in sites "ABC".
               </Typography> */}


                <FormGroup column style={{ width: '60%', marginLeft: '2rem', marginBottom: '2rem' }}>
                  <Fade in={error}>
                    <Typography color="secondary" className={classes.errorMessage}>
                      Something is wrong, please try again
                </Typography>

                  </Fade>
                  {/* <Typography color="secondary" className={classes.errorMessage}>
                    Click "Send" to receive security key in your email...
                </Typography>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div>
                      <TextField
                        id="securitycode"
                        InputProps={{
                          classes: {
                            underline: classes.textFieldUnderline,
                            input: classes.textField,
                          },
                        }}
                        placeholder="Check your email"
                        value={securityCode}
                        onChange={e => setSecurityCode(e.target.value)}
                        margin="normal"
                        variant="outlined"
                        label="Security Code"
                        type="text"
                        fullWidth
                      />
                    </div>


                    <div className={classes.sendsecuritykey}>
                      {isLoading ? (
                        <CircularProgress size={26} />
                      ) : (
                          <Button
                            size="small"
                            variant="contained"
                            color="secondary"
                            fullWidth
                            className={classes.sendsecuritykey}
                          // onClick={() => handleChangePassword_Step3(
                          //   securityCode,
                          //   passwordReg,
                          //   confPasswordReg,
                          //   setIsLoading,
                          //   setError)}
                          >
                            Send
                          </Button>


                        )}
                    </div>
                  </div> */}
                  {/* <TextField

                    InputProps={{
                      classes: {
                        underline: classes.textFieldUnderline,
                        input: classes.textField,
                      },
                    }}
                    value={passwordReg}
                    onChange={e => setPasswordReg(e.target.value)}
                    margin="normal"
                    variant="outlined"
                    label="Current Password"
                    type={showPassword ? 'text' : 'password'}
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
                    labelWidth={70}
                    fullWidth
                  /> */}


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
                  Your are operator in sites "XYZ" and observer in sites "ABC".
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
