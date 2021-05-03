import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  IconButton,
  Fade,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
// styles
import useStyles from "./styles";
// background
import background from "./images/passwordbg.svg";
// context
import { useUserDispatch, loginUser } from "../../context/UserContext";
import { toast } from "react-toastify";
import { emailConfirmApi, loginApi, passChangeApi, registerApi } from "../../api/api_login";
import blob from "./images/blob.svg";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';



function Login(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [activeTabId, setActiveTabId] = useState(0);


  var [emailPassChange, setEmailPassChange] = useState();
  var [securityCode, setSecurityCode] = useState(null);
  var [passwordReg, setPasswordReg] = useState("");
  var [confPasswordReg, setConfPasswordReg] = useState("");

  var [loginValue, setLoginValue] = useState("admin@yahoo.com");
  var [passwordValue, setPasswordValue] = useState("8910");
  var [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  //States for Error Mode of Inputs
  const [usernameLoginBool, setUsernameLoginBool] = useState(false);
  const [passwordLoginBool, setPasswordLoginBool] = useState(false);

  //Messages

  const EnterUnsuccessfulMessage = "Username or Password is not Correct!";
  const EnterSuccessfulMessage = "Welcome...";

  const EnterUnsuccessSendEmail = "Email Address is not Correct!";
  const EnterSuccessSendEmail = "Email is Sent...";

  const EnterUnsuccessPassChange = "Password Could not be Changed! Try Again...";
  const EnterSuccessPassChange = "Your Password has been Changed Successfully...";
  //Main function to use API for login

  const handleChangePassword_Step3 = (securitykey, pass, confpass, setIsLoading, setError) => {
    if (pass != confpass)
      return toast.error("Password fields are not matched!");
    setError(false);
    setIsLoading(true);
    const changepass = {
      Email: emailPassChange,
      SecurityKey: securitykey,
      NewPassword: pass
    }
    validateNewPass(changepass)
    emailConfirmApi(changepass, (isOk, data) => {
      if (isOk) {
        setTimeout(() => {
          setError(null)
          setIsLoading(false)
          toast.success(EnterSuccessPassChange);
          setActiveTabId(0)
        }, 2000);
      } else {
        setError(true);
        setIsLoading(false);
        return toast.error(EnterUnsuccessPassChange);
      }
    })
  };
  const handleChangePassword_Step0 = () => {
    setActiveTabId(0)
  };
  const handleChangePassword_Step1 = () => {
    setActiveTabId(1)
  };
  const handleChangePassword_Step2 = (email, setIsLoading, setError) => {

    setError(false);
    setIsLoading(true);
    const Email_Sent = {
      Email: email
    };
    emailConfirmApi(Email_Sent, (isOk, data) => {
      if (isOk) {
        setTimeout(() => {
          setError(null)
          setIsLoading(false)
          toast.success(EnterSuccessSendEmail);
          setActiveTabId(2)
        }, 2000);
      } else {
        setError(true);
        setIsLoading(false);
        return toast.error(EnterUnsuccessSendEmail);
      }
    })
  };



  function handleLogin(dispatch, login, password, history, setIsLoading, setError) {
    setError(false);
    setIsLoading(true);
    const user = {
      email: login,
      password: password,
    }
    loginApi(user, (isOk, data) => {
      if (isOk) {
        setTimeout(() => {
          localStorage.setItem('id_token', data.token)
          localStorage.setItem('user_id', data.userID)
          setError(null)
          setIsLoading(false)
          toast.success(EnterSuccessfulMessage);
          dispatch({ type: 'LOGIN_SUCCESS' })
          history.push('/app/sites')
        }, 2000);
      } else {
        setError(true);
        setIsLoading(false);
        return toast.error(EnterUnsuccessfulMessage);
      }
    })
  };



  const validateNewPass = (newpass) => {
    if (!newpass.SecurityKey)
      return "Please Enter Security Code!"
    if (!newpass.Email)
      return "Please Enter Your Email!"
    if (!newpass.NewPassword)
      return "Please Enter Your New Password!"
  };



  const handleChangePass = () => {

    if (passwordReg != confPasswordReg)
      return toast.error("Please double check your password");
    const newpass = {
      securitycode: securityCode,
      email: emailPassChange,
      password: passwordReg,
    }
    const error = validateNewPass(newpass);
    if (error)
      return toast.warn(error)


    passChangeApi(newpass, (isOk, data) => {
      if (!isOk)
        return toast.error("Security Code is not Correct!");
      toast.success("Your password has been changed.");
      handleChangePassword_Step0();
    })
  };








  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={background} alt="logo" />
        <Typography className={classes.logotypeText}></Typography>
      </div>
      <div className={classes.formContainer} style={{ backgroundImage: `url(${blob})`, backgroundSize: 'cover' }}>
        <div className={classes.form} >
          {activeTabId === 0 && (
            <React.Fragment>
              <Typography variant="h1" className={classes.greeting}>
                Welcome!
              </Typography>
              <Typography variant="h2" className={classes.subGreeting}>
                Login to your account
              </Typography>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Check Your Username and Password
                </Typography>
              </Fade>



              <FormControl className={classes.textField0} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password" classes={{ root: classes.textField1, shrink: classes.textField3 }} >Email</InputLabel>
                <OutlinedInput
                  classes={{ root: classes.textField2 }}
                  id="outlined-adornment-email"
                  type={'text'}
                  value={loginValue}
                  error={passwordLoginBool}
                  onChange={e => setLoginValue(e.target.value)}
                  label={"Email"}

                />
              </FormControl>

              <FormControl className={classes.textField0} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password" classes={{ root: classes.textField1, shrink: classes.textField3 }}>Password</InputLabel>
                <OutlinedInput
                  classes={{ root: classes.textField2 }}
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  value={passwordValue}
                  onChange={e => setPasswordValue(e.target.value)}
                  label={"Password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility style={{ height: '1.4vw', width: '1.4vw' }} /> : <VisibilityOff style={{ height: '1.4vw', width: '1.4vw' }} />}
                      </IconButton>
                    </InputAdornment>
                  }
                />

              </FormControl>


              <div className={classes.formButtons}>
                {isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                  <Button
                    classes={{ root: classes.loginButton }}

                    disabled={
                      loginValue.length === 0 || passwordValue.length === 0
                    }
                    onClick={() => handleLogin(
                      userDispatch,
                      loginValue,
                      passwordValue,
                      props.history,
                      setIsLoading,
                      setError,
                    )
                    }
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Login
                  </Button>
                )}
                <Button
                  color="primary"
                  size="large"
                  classes={{ root: classes.forgetButton }}
                  onClick={(e) => handleChangePassword_Step1(e)}
                >
                  Forget Password
                </Button>
              </div>
            </React.Fragment>
          )}
          {activeTabId === 1 && (
            <React.Fragment>
              <Typography variant="h1" className={classes.greetingPass}>
                Change Password
              </Typography>
              <Typography variant="h2" className={classes.subGreeting}>
                Step 1
              </Typography>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Your email address is not found!
                </Typography>
              </Fade>


              <FormControl className={classes.textField0} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password" classes={{ root: classes.textField1, shrink: classes.textField3 }} >Email</InputLabel>
                <OutlinedInput
                  classes={{ root: classes.textField2 }}
                  id="outlined-adornment-email"
                  type={'text'}
                  value={emailPassChange}
                  onChange={e => setEmailPassChange(e.target.value)}
                  label={"Email"}

                />
              </FormControl>


              <div className={classes.creatingButtonContainer}>
                {isLoading ? (
                  <CircularProgress size={26} />
                ) : (
                  <Button
                    // onClick={(e) =>
                    //   handleEmailConfirm(e)
                    // }
                    style={{ fontSize: '0.85vw', height: '2.7vw' }}
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    // classes={{ root: classes.loginButton }}
                    onClick={() => handleChangePassword_Step2(
                      emailPassChange,
                      setIsLoading,
                      setError)}
                  >
                    Send Email
                  </Button>

                )}
              </div>
              <Button
                color="primary"
                size="large"
                className={classes.tryLoginButton}
                onClick={(e) => handleChangePassword_Step0(e)}
              >
                Try Sign in Again?
              </Button>
            </React.Fragment>
          )}

          {activeTabId === 2 && (
            <React.Fragment>
              <Typography variant="h1" className={classes.greetingPass}>
                Change Password
              </Typography>
              <Typography variant="h2" className={classes.subGreeting}>
                Step 2
              </Typography>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong, please try again!
                </Typography>
              </Fade>


              <FormControl className={classes.textField0} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password" classes={{ root: classes.textField1, shrink: classes.textField3 }} >Security Key</InputLabel>
                <OutlinedInput
                  classes={{ root: classes.textField2, focused: classes.placeholder }}
                  id="outlined-adornment-email"
                  type={'text'}
                  value={securityCode}
                  onChange={e => setSecurityCode(e.target.value)}
                  label={"Security Key"}
                  placeholder={"Check your email for security key"}
                />
              </FormControl>


              <FormControl className={classes.textField0} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password" classes={{ root: classes.textField1, shrink: classes.textField3 }}>New Password</InputLabel>
                <OutlinedInput
                  classes={{ root: classes.textField2 }}
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  value={passwordReg}
                  onChange={e => setPasswordReg(e.target.value)}
                  label={"New Password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility style={{ height: '1.4vw', width: '1.4vw' }} /> : <VisibilityOff style={{ height: '1.4vw', width: '1.4vw' }} />}
                      </IconButton>
                    </InputAdornment>
                  }
                />

              </FormControl>


              <FormControl className={classes.textField0} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password" classes={{ root: classes.textField1, shrink: classes.textField3 }}>Confirm New Password</InputLabel>
                <OutlinedInput
                  classes={{ root: classes.textField2 }}
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  value={confPasswordReg}
                  onChange={e => setConfPasswordReg(e.target.value)}
                  label={"Confirm New Password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility style={{ height: '1.4vw', width: '1.4vw' }} /> : <VisibilityOff style={{ height: '1.4vw', width: '1.4vw' }} />}
                      </IconButton>
                    </InputAdornment>
                  }
                />

              </FormControl>

              <div className={classes.creatingButtonContainer}>
                {isLoading ? (
                  <CircularProgress size={26} />
                ) : (
                  <Button
                    style={{ fontSize: '0.85vw', height: '2.7vw' }}
                    // onClick={() =>
                    //    handleChangePass()}

                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    // className={classes.createAccountButton}
                    onClick={() => handleChangePassword_Step3(
                      securityCode,
                      passwordReg,
                      confPasswordReg,
                      setIsLoading,
                      setError)}
                  >
                    Change Password
                  </Button>
                )}
              </div>
              <Button
                color="primary"
                size="large"
                className={classes.tryLoginButton}
                onClick={(e) => handleChangePassword_Step0(e)}
              >
                Try Sign in Again?
              </Button>

            </React.Fragment>
          )}
        </div>
      </div>
    </Grid>
  );
}

export default withRouter(Login);
