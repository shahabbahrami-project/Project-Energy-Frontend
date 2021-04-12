import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  mapContainer:{
    width:'100%',
    height:'100%'
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
  mapDivStyle:{
    width: '100%',
    float:'up',
    borderWidth:'2.5px',
    borderColor:'#e3e3e361 !important',
    borderRadius:'0.5rem',
    borderStyle:'solid',
    webkitBoxShadow: '0px 0px 5px 1px rgba(155,223,235,1)',
    mozBoxShadow: '0px 0px 5px 1px rgba(155,223,235,1)',
    boxShadow: '0px 0px 5px 1px rgba(155,223,235,1)',
},
  formDivStyle: {
    width: '100%',
    marginBottom:'1rem',
    float: 'up',
    // borderWidth:'3.5px',
    // borderColor:'rgba(57,57,114,0.38)',
    // borderRadius:'1rem',
    // borderStyle:'solid'
},
rootText:{
  width: '97%',
  height: '2.5rem',
  marginLeft:'1.5%'
},
  textFieldFormStyle:{
    width: '85%',
    marginLeft:'1rem',
    marginTop:'0.5rem',


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
    height:'3.0rem',
    marginTop:'1rem',
    // MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-outlined
    '& .MuiFormLabel-root':{
      marginTop: '-0.5rem !important',
    },
    '& .MuiInputLabel-shrink':{
      marginTop: '0rem !important',
    },
    '& .MuiSelect-root':{
      backgroundColor: 'white',
    },
    // class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-outlined MuiFormLabel-filled"
    '& .MuiInputBase-root':{
      height: '3rem !important',
    },
    '& .MuiOutlinedInput-root':{
      height: '1rem !important',
    },
    '& .MuiInputBase-formControl':{
      height: '2.5rem !important',
    },

    margin: theme.spacing(0),
    minWidth: 120,
    width:'100%',

  },
  selectEmpty: {
    marginTop: theme.spacing(2),

  },
  tree: {
    height: '100%',
    minHeight:100,
    flexGrow: 1,
    maxWidth: 400,
    width: '100%',
    maxWidth: 360,
    maxHeight:5000,
    backgroundColor: theme.palette.background.paper,
    borderWidth: '2.5px',
    borderColor: '#0566773b',
    borderRadius: '0.5rem',
    borderStyle: 'solid'

  },
  treeItem: {
    width: '80%',
    marginTop:'0.5rem',
    marginLeft:'1rem',

  },
}));
