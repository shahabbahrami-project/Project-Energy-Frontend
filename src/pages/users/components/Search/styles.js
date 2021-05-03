import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  root: {
    
    fontSize:'1vw',
    marginLeft: '0vw',
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '18vw',
    marginBottom: '0.8rem',
    height:'3.8vw'
},
input: {
    fontSize:'1vw',
    marginLeft: theme.spacing(1),
    flex: 1,
},
iconButton: {
    padding: 10,
},
divider: {
    height: 28,
    margin: 4,
},
  textField0: {
    width: '95%',
    marginBottom: '0.7vw',
    marginTop: '0.7vw',
  },
  textField1: {
    height: '3vw',
    fontSize: '0.8vw',
    transform: 'translate(1vw, 1.1vw) scale(1) !important',
  },
  textField2: {
    height: '2.75vw',
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
  autoText:{
    fontSize:'0.8vw',
        
  },
  autoText2:{
    padding:'2.5px 4px !important',
    '& .MuiAutocomplete-input':{
      padding:'2.5px 4px',
    }
    
  },
  autoTextFocus:{
    fontSize:'0.8vw',
    
  },
  textFieldStyles:{
    '& .MuiInputLabel':{
      shrink:{
      fontSize:'0.75vw',
      transform: 'translate(0.92vw, -0.3vw) scale(0.75)',
      },
      outlined:{
        transform:'translate(0.8vw, 1vw) scale(1)'
      }
    },
    '& .MuiFormLabel-root':{
      fontSize:'0.9vw'
    },
    '& .MuiInputBase-root':{
      height:'2.75vw'
    },

    // '& .MuiInputLabel-outlined':{
    //   transform:'translate(0.8vw, 1vw) scale(1)'
    // }

    // MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-outlined MuiFormLabel-filled
    // MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-outlined
  },
  textFieldStyles2:{
    // '& .MuiInputLabel-shrink':{
    //   fontSize:'0.75vw',
    //   transform: 'translate(0.92vw, -0.3vw) scale(0.75)',

    // },
    '& .MuiFormLabel-root':{
      fontSize:'0.9vw'
    },
    '& .MuiInputBase-root':{
      height:'2.75vw'
    },

  

    // MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-outlined MuiFormLabel-filled
    // MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-outlined
  },


}));
