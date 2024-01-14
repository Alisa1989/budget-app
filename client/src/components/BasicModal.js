import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({title, buttonIcon, modalTitle, description}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <h2>{title}
      <Button title={title} aria-label= "open modal" size="large" onClick={handleOpen}>{buttonIcon}</Button>
      </h2>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby={title}
        aria-describedby={description}
      >
        <Box sx={style}>
          <Typography id={title} variant="h6" component="h2">
            {modalTitle}
          </Typography>
          <Typography id={description} sx={{ mt: 2 }}>
            {description}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}