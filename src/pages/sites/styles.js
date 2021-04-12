import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  mapContainer: {
    width: '100%',
    height: '100%'
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
    width: '100%',
    overflow: 'hidden',
  },
  mapDivStyle: {
    width: '100%',
    float: 'up',
    borderWidth: '3.5px',
    borderColor: 'rgba(57,57,114,0.38)',
    borderStyle: 'solid',
    borderRadius: '0.5rem', 
    borderWidth: '0px', 
    webkitBoxShadow: '0px 0.5px 1px 0.1px rgba(0,0,0,0.43)',
    mozBoxShadow: '0px 0.5px 1px 0.1px rgba(0,0,0,0.43)',
    boxShadow: '0px 0.5px 1px 0.1px rgba(0,0,0,0.43)',
  },
  formDivStyle: {
    width: '100%',
    marginBottom: '1rem',
    float: 'up',
  },
  formDivStyle2: {
    float: 'left',
    width: '20%',
    marginBottom: '2rem',
    
    overflow: 'auto',
    maxHeight: 1050,
    borderRadius: '0.5rem',
    borderWidth: '0px',
  },
  rootText: {
    width: '97%',
    height: '2.5rem',
    marginLeft: '1.5%'
  },
  textFieldFormStyle: {
    width: '85%',
    marginLeft: '1rem',
    marginTop: '0.5rem',


  },

  rootForm: {
    flexGrow: 1,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    flex: '1 0 auto',
    margin: theme.spacing(1),
  },
  formControl: {
    height: '3.0rem',
    marginTop: '1rem',
    // MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-outlined
    '& .MuiFormLabel-root': {
      marginTop: '-0.5rem !important',
    },
    '& .MuiInputLabel-shrink': {
      marginTop: '0rem !important',
    },
    '& .MuiSelect-root': {
      backgroundColor: 'white',
    },
    // class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-outlined MuiFormLabel-filled"
    '& .MuiInputBase-root': {
      height: '3rem !important',
    },
    '& .MuiOutlinedInput-root': {
      height: '1rem !important',
    },
    '& .MuiInputBase-formControl': {
      height: '2.5rem !important',
    },

    margin: theme.spacing(0),
    minWidth: 120,
    width: '100%',

  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  popupStyles:{
    '& .leaflet-popup-content':{
      width:'360px'
    }
    
  },
})

);
