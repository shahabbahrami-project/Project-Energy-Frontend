import { makeStyles } from "@material-ui/styles";


export default makeStyles((theme) => ({
    root: {
      margin: 'auto',
    },
    cardHeader: {
      padding: theme.spacing(0.5,1),
      marginLeft:'-0.8vw'
    },
    list: {
      width: '11vw',
      height: 345,
      backgroundColor: theme.palette.background.paper,
      overflow: 'auto',
    },
    button: {
      margin: theme.spacing(0.5, 0),
    },
  }));