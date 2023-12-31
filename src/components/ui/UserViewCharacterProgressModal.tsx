import React, { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { ref, getDownloadURL } from "firebase/storage";
import { AuthContext } from "../../context/Auth";
import { Typography } from "@mui/material";
import toast from "react-hot-toast";
import capitalizeWords from "../../utils/capitalizeWords";
import { storage } from "../../config/firebase";
import pathPoints from "../../utils/pathPoints";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: 1,
  maxWidth: "800px",
};

interface ParentComponentProps {
  openUserViewCharacterProgressModal: boolean;
  setOpenUserViewCharacterProgressModal: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

function UserViewCharacterProgressModal({
  openUserViewCharacterProgressModal,
  setOpenUserViewCharacterProgressModal,
}: ParentComponentProps) {
  const { currentUserData } = useContext(AuthContext);
  const [imageMatched, setImageMatched] = useState("");

  useEffect(() => {
    fetchPowerLevelImage();
  }, []);

  async function fetchPowerLevelImage() {
    const currentLevelId = matchPowerLevelWithImage();
    const imagePath = `assets/level-images/${currentLevelId}.webp`;
    const imageRef = ref(storage, imagePath);

    try {
      const imageUrl = await getDownloadURL(imageRef);
      setImageMatched(imageUrl);
    } catch (error) {
      toast.error("Unable to load character image.");
    }
  }

  function matchPowerLevelWithImage() {
    const defaultImagePath = 0;
    for (let index = 0; index < pathPoints.length; index++) {
      const currentLevel = pathPoints[index];
      const nextLevel = pathPoints[index + 1] || { bracket: Infinity };

      if (
        currentUserData.powerLevel > currentLevel.bracket &&
        currentUserData.powerLevel < nextLevel.bracket
      ) {
        return currentLevel.id;
      }
    }
    return defaultImagePath;
  }

  const handleClose = () => setOpenUserViewCharacterProgressModal(false);

  return (
    <Modal
      open={openUserViewCharacterProgressModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            minWidth: "256px",
            height: "auto",
          }}
        >
          <img
            src={imageMatched}
            alt="Character Level"
            width="100%"
            height="100%"
            loading="lazy"
          />
          <Typography sx={{ fontWeight: "bold" }}>
            1. {capitalizeWords(currentUserData.firstPowerExercise)}
          </Typography>
          <Typography sx={{ fontWeight: "bold" }}>
            2. {capitalizeWords(currentUserData.secondPowerExercise)}
          </Typography>
          <Typography sx={{ fontWeight: "bold" }}>
            3. {capitalizeWords(currentUserData.thirdPowerExercise)}
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
}

export default UserViewCharacterProgressModal;
