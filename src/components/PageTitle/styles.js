import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  pageTitleContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(0),
    backgroundColor: 'white',
    height: '13vh',
    minHeight:'4rem',
    alignItems: 'center',
    borderRadius:' 0.5rem',
    border: "solid",
    borderWidth: '0px',
    webkitBoxShadow: '0px 0.5px 1px 0.1px rgba(0,0,0,0.43)',
    mozBoxShadow: '0px 0.5px 1px 0.1px rgba(0,0,0,0.43)',
    boxShadow: '0px 0.5px 1px 0.1px rgba(0,0,0,0.43)',
  },
  typo: {
    fontSize:'1.7vw!important',
    color: theme.palette.text.primary,
    marginLeft:'1rem'
  },
  button: {
    boxShadow: theme.customShadows.widget,
    textTransform: "none",
    "&:active": {
      boxShadow: theme.customShadows.widgetWide,
    },
  },
}));
