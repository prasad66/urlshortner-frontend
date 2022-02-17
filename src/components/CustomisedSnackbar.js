import React, { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Grid, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CustomisedSnackbar = ({ show, msg, color }) => {

  const [appear, setAppear] = useState();
  useEffect(() => {
    setAppear(show);
  }, [show]);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [state, setState] = React.useState({
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal } = state;

  const handleClose = () => {
    setAppear(false);
  };


  return <div>
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      sx={{ alignItems: 'center' }}
      open={appear}
      autoHideDuration={4000}
      onClose={handleClose}
      message="I love snacks"
      key={vertical + horizontal}
    >
      <Alert severity={color} sx={{ width: '100%',}}>
        <Grid container sx={{ width: '100%',}}>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between',alignItems: 'center', width: '100%'}}>
            {msg}
            <CloseIcon sx={{ cursor: 'pointer' }} onClick={handleClose} />
          </Grid>
        </Grid>
        {/* <IconButton>
      </IconButton> */}
      </Alert>
    </Snackbar>

  </div>;
};

export default CustomisedSnackbar;
