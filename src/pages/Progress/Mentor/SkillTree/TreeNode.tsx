import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useRef, useState } from "react";
import Typography from "@mui/material/Typography";
import { SkillNode } from "./SkillTree";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckIcon from "@mui/icons-material/Check";
import { LockOpenOutlined } from "@mui/icons-material";
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  p: 2,
};



export const TreeNode = ({ node }: { node: SkillNode }) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const id = open ? "simple-popover" : undefined;

  return (
    <Box
      ref={nodeRef}
      display="flex"
      flexDirection="column"
      alignItems="center"
      position="relative"
    >

<Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
                <Fade in={open}>
         <Box sx={style}>
        <Box padding={1} display="flex" flexDirection="column" gap={1}>
          <Typography>{node.title}</Typography>
          <Typography variant="secondary" fontWeight="bold">
            {node.description}
          </Typography>

 

          {node.criteria.exercise.length > 0 ? (
            <Accordion variant="outlined">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                
              >
                Allowed Exercises
              </AccordionSummary>
              <AccordionDetails>
                {node.criteria.exercise.map((exercise, index) => (
                  <Box display="flex">
                    <CheckIcon />
                    <Typography
                      variant="secondary"
                      fontWeight="bold"
                      key={index}
                    >
                      {exercise.toLocaleUpperCase()}
                    </Typography>
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          ) : node.criteria.muscleGroup.length > 0 ? (
            <></>
          ) : (
            <></>
          )}
         <Button 
              startIcon={<LockOpenOutlined />}
        variant="contained">Unlock</Button>
        </Box>
        </Box></Fade>

      </Modal>


      <Button
        onClick={handleOpen}
        sx={{
          width: "65px",
          height: "65px",
          border: "3px solid black",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          padding: "2px",
        }}
      >
        <img
          style={{
            background:
              "radial-gradient(circle, rgba(255,165,0,1) 18%, rgba(156,105,12,1) 100%)",
            borderRadius: "50%",
            padding: "4px"
          }}
          src={node.icon}
          alt=""
          width="100%"
          height="100%"
        />
      </Button>
    </Box>
  );
};
