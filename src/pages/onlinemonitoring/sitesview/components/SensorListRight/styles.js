import { makeStyles } from "@material-ui/styles";
const white = "255 ,255 ,255";
const black = "0 ,0 ,0";

export default makeStyles((theme) => ({
  mapContainer: {
    width: "100%",
    height: "100%",
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
    borderBottomColor: theme.palette.background.light,
  },

  wrapperStyle: {
    width: "100%",
    overflow: "hidden",
    paddingBottom: 400,
  },

  formDivStyle: {
    width: "100%",
    marginBottom: "1rem",
    float: "up",
  },
  formDivStyle2: {
    float: "left",
    width: "25%",
    marginBottom: "2rem",

    overflow: "auto",
    maxHeight: 773,
    borderRadius: "0.5rem",
    borderWidth: "0px",
  },
  formDivStyleLeft: {
    float: "left",
    width: "25%",
    height: "auto",
    marginBottom: "2rem",
    overflow: "hidden",
    maxHeight: 773,
    borderColor: "#e3e3e361",
    borderRadius: "0.5rem",
    borderWidth: "2.5px",
    webkitBoxShadow: "0px 0px 3px 1px rgba(197,220,224,1)",
    mozBoxShadow: "0px 0px 3px 1px rgba(197,220,224,1)",
    boxShadow: "0px 0px 3px 1px rgba(197,220,224,1)",
  },
  formDivStyleRight: {
    float: "right",
    width: "100%",
    marginBottom: "2rem",
    backgroundColor: "white",
    overflow: "auto",
    maxHeight: 773,
    borderRadius: "0.5rem",
    borderWidth: "1px",
    borderColor: "#0566773b",
    borderStyle: "solid",
  },
  rootText: {
    width: "97%",
    height: "2.5rem",
    marginLeft: "1.5%",
  },
  textFieldFormStyle: {
    width: "85%",
    marginLeft: "1rem",
    marginTop: "0.5rem",
  },
  rootForm: {
    flexGrow: 1,
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    flex: "1 0 auto",
    margin: theme.spacing(1),
  },
  formControl: {
    height: "3.0rem",
    marginTop: "1rem",
    "& .MuiFormLabel-root": {
      marginTop: "-0.5rem !important",
    },
    "& .MuiInputLabel-shrink": {
      marginTop: "0rem !important",
    },
    "& .MuiSelect-root": {
      backgroundColor: "white",
    },
     "& .MuiInputBase-root": {
      height: "3rem !important",
    },
    "& .MuiOutlinedInput-root": {
      height: "1rem !important",
    },
    "& .MuiInputBase-formControl": {
      height: "2.5rem !important",
    },

    margin: theme.spacing(0),
    minWidth: 120,
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  popupStyles: {
    "& .leaflet-popup-content": {
      width: "360px",
    },
  },
  imageSystemContainerStyle: {
    width: "100%",
    height: "70vh",
    position: "relative",
    float: "up",
    borderWidth: "3.5px",
    borderColor: "rgba(57,57,114,0.38)",
    borderStyle: "solid",
    borderColor: "#0566773b",
    borderRadius: "0.5rem",
    borderWidth: "1px",
    marginBottom : 10 ,
    transition: "width 1s , height 1s",
  },
  fullScreenImage: {
    position: "absolute",
    top: "10px",
    left: "10px",
    width: "24px",
    height: "24px",
    background: `rgba(${black}, 0.4)`,
    borderRadius: "5px",
    cursor: "pointer",
    "& :hover": {
      background: `rgba(${white}, 0.4)`,
    },
  },
  imageSystemStyle: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
  },
  contextMenu: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: `#a3bce3`,
    border: "1.5px solid #ffffff",
    borderRadius: "0.2vw",
    overflowY: "auto",
  },
  contextMenuItem: {
    textAlign: "center",
    verticalAlign: "middle",
    color: "white",
    textHeight: "bold",
    width: "100%",
    padding: 5,
    cursor: "pointer",
    "&:hover": {
      background: `rgba(${white}, 0.8)`,
      color: "#000000",
    },
  },
  sensorStyle: {
    position: "absolute",
    fontSize: "0.7vw",
    display: "flex",
    flexDirection: "row",
    color: "#fff",
    paddingLeft: 5,
    paddingRight: 5,
    textHeight: "bold",
    borderRadius: "1.5vw",
    background: `rgba(${black}, 0.6)`,
    borderRadius: "1.5vw",
    cursor: "move",
  },
  sensorCloseStyle: {
    width: 20,
    textHeight: "bold",
    marginLeft: 5,
    color: "#fff",
  },
  fileInputArea: {
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  loadingStyle: {
    position: "fixed",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: `rgba(228, 247, 254 , 0.5)`,
    zIndex: 10000000,
  },
  colorNormal: {
    color: "#4caf50",
  },
  colorAlert: {
    color: "#F70505",
  },
  colorNull: {
    color: "#ced5e0",
  },
  imageLoading: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    backgroundColor: `rgba(${white}, 0.6)`,
  },
}));
