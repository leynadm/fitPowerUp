import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useContext,
  useRef,
} from "react";
import PathCarousel from "./PathCarousel";
import Container from "@mui/material/Container";
import { ref, getDownloadURL, getStorage } from "firebase/storage";
import { getApp } from "firebase/app";
import Box from '@mui/material/Box';
interface ProgressProps {
  powerLevel: number;
  setPowerLevel: Dispatch<SetStateAction<number>>;
}

function ProgressPath({ powerLevel, setPowerLevel }: ProgressProps) {
  const firebaseApp = getApp();
  const postsStorage = getStorage(firebaseApp, "gs://fitpowerup-2bbc8-posts");
  const [imageMatched, setImageMatched] = useState("");

  const [powerLevelImageMatchArr, setPowerLevelImageMatchArr] = useState([
    0, 200, 225, 250, 275, 300, 325, 350, 375, 400, 425, 450, 475, 500, 525,
    550, 575, 600, 625, 650, 675, 695, 715, 735, 755, 775, 795, 815, 835, 855,
    875, 895, 915, 935, 955, 975, 995, 1015, 1035, 1055, 1075, 1095, 1115, 1135,
    1155, 1175, 1195, 1215, 1235, 1255, 1275, 1295, 1315, 1335, 1355, 1375,
    1395, 1415, 1435, 1455, 1375, 1495, 1515, 1535, 1555, 1575, 1955, 1615,
    1635, 1655, 1675, 1695, 1715, 1735, 1775, 1795, 1815, 1835, 1855, 1875,
    1895, 1915, 1935, 1955, 1975, 1995, 2015, 2035, 2055, 2075, 2095, 2115,
    2135, 2155, 2175, 2195, 2215, 2235, 2255, 2275, 2295, 2315, 2335, 2355,
    2375, 2395, 2415, 2435, 2455, 2475, 2495, 2515, 2535, 2555, 2575, 2595,
    2615, 2635, 2655, 2675, 2695,
  ]);

  useEffect(() => {
    matchPowerLevelWithImage();
  }, []);

  function matchPowerLevelWithImage() {
    for (let index = 0; index < powerLevelImageMatchArr.length; index++) {
      const currentLevel: number = powerLevelImageMatchArr[index];
      const nextLevel: number = powerLevelImageMatchArr[index + 1];

      if (currentLevel <= powerLevel && powerLevel < nextLevel) {
        console.log("found current level");
        console.log(currentLevel);

        getPowerLevelImage(currentLevel);
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
      console.log(matchedImageURL);
      setImageMatched(matchedImageURL);
    } catch (error) {
      // Handle the error here
    }
  }

  return (
    <Container sx={{height:"100%", width: "100%" }}>
      <PathCarousel imageMatched={imageMatched} />
    </Container>
  );
}

export default ProgressPath;
