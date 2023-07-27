import React, { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { ref, getDownloadURL, getStorage } from "firebase/storage";
import { getApp } from "firebase/app";
import { AuthContext } from "../../context/Auth";
import { Typography } from "@mui/material";
import toast from "react-hot-toast";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: 1,
  maxWidth: "800px", // Optional: Set a maximum width for the modal
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

  const firebaseApp = getApp();
  const postsStorage = getStorage(firebaseApp, "gs://fitpowerup-2bbc8-posts");
  const [currentImagePowerLevel, setCurrentImagePowerLevel] = useState(0);

  const [imageIndex, setImageIndex] = useState(0);
  const [imageMatched, setImageMatched] = useState("");

  const powerLevelImageMatchArr = [
    0, 200, 225, 250, 275, 300, 325, 350, 375, 400, 425, 450, 475, 500, 525,
    550, 575, 600, 625, 650, 675, 695, 715, 735, 755, 775, 795, 815, 835, 855,
    875, 895, 915, 935, 955, 975, 995, 1015, 1035, 1055, 1075, 1095, 1115, 1135,
    1155, 1175, 1195, 1215, 1235, 1255, 1275, 1295, 1315, 1335, 1355, 1375,
    1395, 1415, 1435, 1455, 1475, 1495, 1515, 1535, 1555, 1575, 1595, 1615,
    1635, 1655, 1675, 1695, 1715, 1735, 1775, 1795, 1815, 1835, 1855, 1875,
    1895, 1915, 1935, 1955, 1975, 1995, 2015, 2035, 2055, 2075, 2095, 2115,
    2135, 2155, 2175, 2195, 2215, 2235, 2255, 2275, 2295, 2315, 2335, 2355,
    2375, 2395, 2415, 2435, 2455, 2475, 2495, 2515, 2535, 2555, 2575, 2595,
    2615, 2635, 2655, 2675, 2695,
  ];

  useEffect(() => {
    matchPowerLevelWithImage();
  }, []);

  function matchPowerLevelWithImage() {
    for (let index = 0; index < powerLevelImageMatchArr.length; index++) {
      const currentLevel: number = powerLevelImageMatchArr[index];
      const nextLevel: number = powerLevelImageMatchArr[index + 1];

      if (
        currentLevel <= currentUserData.powerLevel &&
        currentUserData.powerLevel < nextLevel
      ) {
        setImageIndex(index);
        getPowerLevelImage(currentLevel);
        setCurrentImagePowerLevel(powerLevelImageMatchArr[index]);
        break;
      }

      if (
        currentLevel >=
        powerLevelImageMatchArr[powerLevelImageMatchArr.length - 1]
      ) {
        setImageIndex(2695);
        getPowerLevelImage(2695);
        setCurrentImagePowerLevel(2695);
        break;
      }
    }
  }

  async function getPowerLevelImage(currentLevel: number) {
    const matchedImageRef = ref(
      postsStorage,
      `level/${currentLevel}_1024x1024.png`
    );

    try {
      const matchedImageURL = await getDownloadURL(matchedImageRef);

      setImageMatched(matchedImageURL);
    } catch (error) {
      toast.error("Oops, getPowerLevelImage has an error!")
      // Handle the error here
    }
  }

  const handleClose = () => setOpenUserViewCharacterProgressModal(false);

  return (
    <div>
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
            }}
          >
            <img
              src={imageMatched}
              alt="matched level"
              width="100%"
              height="100%"
              loading="lazy"
            ></img>

            <Typography sx={{ fontWeight: "bold" }}>
              {" "}
              1. {currentUserData.firstPowerExercise}
            </Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              {" "}
              2. {currentUserData.secondPowerExercise}
            </Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              {" "}
              3. {currentUserData.thirdPowerExercise}
            </Typography>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default UserViewCharacterProgressModal;
