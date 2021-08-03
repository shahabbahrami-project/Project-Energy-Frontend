import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import FormHistory from './FormHistory';



function getModalStyle() {
  return {
    top: '40%',
    left:'50%',
    transform: `translate(-56%, -60%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '60vw',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function HistoryInput(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const handleClose = () => {
    props.setOpenHistoryModal(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">{"Plot Historical Data for Device" + " "+ props.clickedDevice.name} </h2>
        <FormHistory {...props}/>
    </div>
  );

  return (
    <div>
      <Modal
        open={props.openHistoryModal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}