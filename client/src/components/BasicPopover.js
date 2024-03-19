import * as React from 'react';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import { MdOutlineDeleteForever} from 'react-icons/md';


export default function BasicPopover({item, handleDeletion }) {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
        <MdOutlineDeleteForever onClick={handleClick} className='icon-delete'/>
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
        <div>
            <p>Are you sure you want to delete this expense?</p>
            <Button title="Confirm Deletion" aria-describedby={id} variant="contained" size="large" onClick={() => 
              handleDeletion(item._id)}>
                Yes
            </Button>
            <Button title="Cancel Deletion" aria-describedby={id} variant="contained" size="large" onClick={handleClick}>
                No
            </Button>
        </div>
      </Popover>
    </div>
  );
}