import { makeStyles } from "@material-ui/styles";
import { green } from '@material-ui/core/colors';
export default makeStyles(theme => ({

  dashedBorder: {
    border: "none",
    borderColor: theme.palette.primary.main,
    padding: '0.33vw',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    marginTop: theme.spacing(1),
    justifyContent:'left'
  },
  text: {
    marginBottom: theme.spacing(2),
  },
  profileMenu: {
    minWidth: 265,
  },
  profileMenuUser: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
    marginTop: '1rem',
    float:'right'
    
  },
  wrapperDelete: {
    margin: theme.spacing(1),
    position: 'relative',
    marginTop: '1rem',
    float:'left'
    
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  profileMenuItem: {
    color: theme.palette.text.hint,
  },
  profileMenuIcon: {
    marginRight: theme.spacing(2),
    color: theme.palette.primary.main
    // color: theme.palette.text.hint,
    // '&:hover': {
    //   color: theme.palette.primary.main,
    // }
  },
  profileMenuLink: {
    fontSize: 16,
    textDecoration: "none",
    "&:hover": {
      cursor: "pointer",
    },
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  dividerUnderSearch: {
    width:'108%',
    marginLeft:'-4%',
    marginTop:'8%',
    height:0.5,
    marginBottom:'4%'
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

  textField0: {
    width: '95%',
    marginLeft:'-0.5vw',
    marginBottom: '0.7vw',
    marginTop: '0.7vw',
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
    transform: 'translate(2.1vh, -0.3vw) scale(0.75) !important',
  },
  textField4: {
    width: '1vw !imprtant'
  },
  datePickerText: {
    
    '& .MuiInputBase-root':{
      fontSize:'0.8vw'
    }
  },

 datePickerText2: {
  marginBottom: '0.7vw',
  marginTop: '0.7vw',
  '& .MuiFormLabel-root':{
    fontSize:'0.8vw'
  },
  '& .MuiInputBase-root':{
    fontSize:'0.8vw'
  }
  },
  selectField2: {
    height: '1vw',
    padding:'0.9vw 1vw',
    fontSize: '1vw',
  },
  title:{
    '& .MuiTypography-root':{
      fontSize:'0.8vw'
    }
  },
}));
