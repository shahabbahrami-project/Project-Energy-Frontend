import React from "react";

// styles
import useStyles from "./styles";

import blob from "./blob5.svg";
// components
import { Typography } from "../Wrappers";

export default function PageTitle(props) {
  var classes = useStyles();

  return (
    <div className={classes.pageTitleContainer} style={{backgroundImage:`url(${blob})`, backgroundSize: 'cover'}}
    // style={{backgroundImage:'linear-gradient(to right, #fcfcfc, #f6f7fb, #eff2fb, #e6eefa, #dceaf9)'}}
    // style={{backgroundImage:`url(${props.img})`, resizeMode: 'cover',}}
    >
      <Typography className={classes.typo} variant="h1" size="sm">
        {props.title}
      </Typography>
      {/* <img src={props.img} width="500"></img> */}
      {props.button && props.button}
     
    </div>
  );
}
