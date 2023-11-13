import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

export default function SimpleDialog(props) {
  const { onClose, open, id, cargo } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <>
      <DialogTitle sx={{textAlign:"center"}}>Cargo</DialogTitle>
      <ul style={{padding:"1rem 5rem"}}>
        <li>
        <p><b>{"id -"}</b> {cargo.cargoId}</p>
        </li>
        <li>
        <p><b>{"status -"}</b> {cargo.status}</p>
        </li>
        <li>
        <p><b>{"Start From -"}</b> {cargo.startFrom}</p>
        </li>
        <li>
        <p><b>{"End From -"}</b> {cargo.endFrom}</p>
        </li>
        <li>
        <p><b>{"Type -"}</b> {cargo.cargoType}</p>
        </li>
      </ul>
      </>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  id: PropTypes.string,
  cargo: PropTypes.object
};