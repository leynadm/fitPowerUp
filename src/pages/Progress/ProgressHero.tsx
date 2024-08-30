import { useParams } from "react-router-dom";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { useLocation } from "react-router-dom";

function ProgressHero() {
  const { id } = useParams();
  const location = useLocation();
  const heroQuote = location.state;
  
  const [imageUrl, setImageUrl] = useState("");
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
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

  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      gap={2}
      height="100%"
      width="100%"
      paddingBottom="56px"
    >
      {imageUrl === "" ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          minHeight="512px"
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={3}
        >
          <img
            src={imageUrl}
            alt=""
            width="100%"
            style={{maxWidth:"512px",maxHeight:"512px"}}
            loading="lazy"
            onLoad={() => setIsImageLoaded(true)}
          />

          {isImageLoaded && (
            <Box
              boxShadow={1}
              display="flex"
              justifyContent="center"
              width="100%"
              borderRadius="4px"
              sx={{
                backgroundColor: "#520975",
                color: "white",
              }}
            >
              <Typography fontFamily="Acme" fontSize="1.25rem" align="center" fontStyle="italic" padding="4px">
                {heroQuote}
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

export default ProgressHero;
