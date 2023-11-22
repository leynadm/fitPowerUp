import { useParams } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { render } from "@testing-library/react";
import CircularProgress from "@mui/material/CircularProgress";
function ProgressHero() {
  const { id } = useParams();

  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    getHeroImage();
  }, []);

  async function getHeroImage() {
    const heroRef = ref(storage, `assets/level-images/${id}.webp`);

    try {
      const retrievedProfileImageURL = await getDownloadURL(heroRef);
      setImageUrl(retrievedProfileImageURL);
    } catch (error) {
      toast.error("Oops, getUserData has an error!");
      console.error("Error fetching profile image:", error);
    }
  }

  if (imageUrl === "") {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="256px"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="space-around"
      alignItems="center"
      flexDirection="column"
      gap={1}
      height="100%"
      width="100%"
      paddingBottom="56px"
    >
      <Box>
        <img src={imageUrl} alt="" width="100%" height="100%" />
      </Box>

      <Box boxShadow={1} display="flex" justifyContent="center" width="100%">
        <Typography>Test</Typography>
      </Box>
    </Box>
  );
}

export default ProgressHero;
