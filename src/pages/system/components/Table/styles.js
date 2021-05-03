import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
export default makeStyles(theme => ({
  root: {
    marginTop:'20vh',
    width: '100%',
    marginBottom: '2rem',
    borderRadius: '1rem'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    marginLeft:'0.5em'
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },

  wrapper: {
    float:'right',
    marginRight:'0.5vw',
    margin: theme.spacing(1),
    position: 'relative',
    marginTop: '1vh'

  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  switch:{
    width:'3.5vw'
  }
}));
