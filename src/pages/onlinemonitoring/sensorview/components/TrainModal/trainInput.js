import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import FormTrain from './FormTrain';



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

export default function TrainInput(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const handleClose = () => {
    props.setOpenTrainModal(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">{"Training form "} </h2>
        <FormTrain {...props}/>
    </div>
  );

  return (
    <div>
      <Modal
        open={props.openTrainModal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}