import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from "react-router-dom";

import data from '../../firebase/db.json';

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

export default function BasicModal({progress}) {
    let navigate = useNavigate();
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

    // if (progress === 100) {
    //     handleOpen()
    // }
  const completeLesson = () => {
    data.lesson2.lessons[2].locked = false;
    data.lesson2.lessons[1].complete = true;
    navigate(-1);
  }

  return (
    <div>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={progress === 100}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            You did it!!!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Well done finishing this lesson
          </Typography>
            <Button
                className="complete-button"
                onClick={completeLesson}
                disabled={progress === 100 ? false : true}
                >Complete
            </Button>
        </Box>
      </Modal>
    </div>
  );
}
