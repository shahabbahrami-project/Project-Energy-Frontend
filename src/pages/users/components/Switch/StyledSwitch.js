import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import Switch from '@material-ui/core/Switch';
const StyledSwitch = withStyles((theme) => ({
    root: {
      width:'1.7vw',
      height: '0.9vw',
      padding: 0,
      display: 'flex',
    },
    switchBase: {
      padding: 2,
      left:'-9px',
      color: theme.palette.grey[500],
      '&$checked': {
        transform: 'translateX(12px)',
        color: theme.palette.common.white,
        '& + $track': {
          opacity: 1,
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
        },
      },
    },
    thumb: {
      width: '0.6vw',
      height: '0.65vw',
      boxShadow: 'none',
    },
    track: {
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: theme.palette.common.white,
    },
    checked: {},
  }))(Switch);
  export default StyledSwitch;