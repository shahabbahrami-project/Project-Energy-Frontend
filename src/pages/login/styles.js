import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  container: {
    height: "100vh",
    width: "95vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
  },
  logotypeContainer: {
    // backgroundColor: '#fffcfc',
    width: "50vw",
    height: "100vh",
    marginLeft: '-3vw',
    display: "flex",
    flexDirection: "column",
    justifyContent: "left",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      width: "20%",
    },
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  logotypeImage: {
    width: 165,
    marginBottom: theme.spacing(0),
  },
  logotypeText: {
    color: "white",
    fontWeight: 500,
    fontSize: 84,
    [theme.breakpoints.down("md")]: {
      fontSize: 48,
    },
  },
  formContainer: {
    fontSize: '1vw',
    marginTop: '-7vw',
    marginLeft: '5vw',
    width: "42.9vw",
    height: "46vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      width: "50%",
    },
  },
  form: {
    marginLeft: '4vw',
    width: '17vw',
  },
  tab: {
    fontWeight: 400,
    fontSize: 18,
  },
  greeting: {
    fontWeight: 500,
    fontSize: '2vw',
    textAlign: "center",
    marginTop: '6vw',
  },
  greetingPass: {
    width: '150%',
    fontSize: '2vw',
    marginLeft: '-28%',
    fontWeight: 500,
    textAlign: "center",
    marginTop: '6vw',
  },
  subGreeting: {
    marginBottom: '1rem',
    fontWeight: 500,
    fontSize: '1.5vw',
    textAlign: "center",
    marginTop: '1vw',
    marginBottom:'2vw'
  },
  googleButton: {
    marginTop: theme.spacing(6),
    boxShadow: theme.customShadows.widget,
    backgroundColor: "white",
    width: "100%",
    textTransform: "none",
  },
  googleButtonCreating: {
    marginTop: 0,
  },
  googleIcon: {
    width: 30,
    marginRight: theme.spacing(2),
  },
  creatingButtonContainer: {
    marginTop: '0',
    height: '5vw',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  createAccountButton: {
    height: 46,
    textTransform: "none",
  },
  formDividerContainer: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    display: "flex",
    alignItems: "center",
  },
  formDividerWord: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  formDivider: {
    flexGrow: 1,
    height: 1,
    backgroundColor: theme.palette.text.hint + "40",
  },
  errorMessage: {
    fontSize: '1vw',
    textAlign: "center",
  },
  textFieldUnderline: {



    "&:before": {

      borderBottomColor: theme.palette.primary.light,

    },
    "&:after": {
      borderBottomColor: theme.palette.primary.main,

    },
    "&:hover:before": {
      borderBottomColor: `${theme.palette.primary.light} !important`,
    },
  },
  textField: {
    height: '1vw',
    fontSize: '1vw',
    borderBottomColor: theme.palette.background.light,
  },
  formButtons: {
    marginTop: '1.5vw !important',
    fontSize: '0.85vw',
    width: "100%",

    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  forgetButton: {
    fontSize: '0.85vw',
    width: '9vw',
    height: '2vw',
    textTransform: "none",
    fontWeight: 400,
    minWidth:0,
    marginRight:'-1vw'
  },
  tryLoginButton: {
    width:'100%',
    fontSize: '0.85vw',
    paddingLeft: '1vw',
    textTransform: "none",
  
    fontWeight: 400,
  },
  loginLoader: {
    marginLeft: theme.spacing(4),
  },
 
  loginButton: {
    width: '6vw',
    height: '2vw',
    fontSize: '0.87vw',
    minWidth:0
  },
  textField0: {
    width: '17vw',
    marginBottom: '1vw',
    marginTop: '1vw',
  },
  textField1: {
    height: '3vw',
    fontSize: '0.8vw',
    transform: 'translate(1vw, 1.1vw) scale(1) !important',
  },
  textField2: {
    height: '3vw',
    fontSize: '1vw',
  },
  textField3: {
    transform: 'translate(1.7vh, -0.3vw) scale(0.75) !important',
  },
  textField4: {
    width: '1vw !imprtant'
  },
placeholder:{
  fontSize:'0.8vw'
}
}));
