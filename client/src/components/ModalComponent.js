import React from "react";
import { Modal, Box, Typography, Grid } from "@mui/material";
const style = {
  position: "absolute",
  top: "0",
  left: "50%",
  transform: "translateX(-50%)",
  width: "90%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalComponent = ({ open, handleClose, content }) => {
  return (
    <Modal open={open} onClose={handleClose} sx={{ overflow: "scroll" }}>
      <Box sx={style}>
        <Grid
          container
          spacing={1}
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ mt: "20px" }}
        >
          {" "}
          {content}
        </Grid>
      </Box>
    </Modal>
  );
};

export default ModalComponent;
