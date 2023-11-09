import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Box } from '@mui/system';

export default function SimpleDialog(props) {
  const { onClose, open, agreement } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Box sx={{width:"15rem", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
    <Dialog onClose={handleClose} open={open} fullWidth>
      <DialogTitle sx={{textAlign:"center"}}>Agreement Content</DialogTitle>
      <p style={{textAlign:'center'}}>{agreement}</p>
    </Dialog>
    </Box>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  id: PropTypes.string,
  agreement: PropTypes.string
};
