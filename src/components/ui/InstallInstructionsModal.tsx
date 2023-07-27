import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import ChromeIcon from "../../assets/chrome-48.png";
import FirefoxIcon from "../../assets/firefox-48.png";
import SafariIcon from "../../assets/safari-48.png";
import EdgeIcon from "../../assets/edge-48.png";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

const mobileStyle = {
  display: "flex",
  flexDirection: "column",
  margin: "3%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: 1,
  gap: 5,
  maxHeight: "80vh", // Limit max height to 70% of the viewport height
};

const desktopStyle = {
  display: "flex",
  flexDirection: "column",
  margin: "3%",
  bgcolor: "background.paper",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", // Adjust the values as per your preference
  borderRadius: "10px",
  p: 2,
  gap: 5,
  maxWidth: "800px",
  position: "absolute", // Add position absolute
  top: "50%", // Center vertically
  left: "50%", // Center horizontally
  transform: "translate(-50%, -50%)", // Center both horizontally and vertically
  maxHeight: "80vh", // Limit max height to 70% of the viewport height
};

interface ParentComponentProps {
  openInstallInstructionsModal: boolean;
  setOpenInstallInstructionsModal: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

function InstallInstructionsModal({
  openInstallInstructionsModal,
  setOpenInstallInstructionsModal,
}: ParentComponentProps) {
  const handleClose = () => setOpenInstallInstructionsModal(false);

  const isMobile = window.innerWidth < 600;

  const style = isMobile ? mobileStyle : desktopStyle;

  const boxShadowStyle = {
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", // Adjust the values as per your preference
    borderRadius: "10px",
  };

  return (
    <div>
      <Modal
        open={openInstallInstructionsModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ overflow: "scroll" }}
      >
        <Box sx={{ ...style, overflowY: "auto" }}>
          <Typography sx={{ textAlign: "center" }}>
            In case the installation didn't start automatically, you can install
            the app manually:
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
              boxShadow:
                "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
              paddingBottom: "15px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                marginTop: "15px",
              }}
            >
              <img
                src={ChromeIcon}
                alt="chrome browser"
                width="24px"
                height="24px"
              ></img>
              <Typography sx={{ fontWeight: "bold", fontSize: "larger" }}>
                Google Chrome
              </Typography>
            </Box>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8-posts/o/assets%2FChrome_01_1024x1024.jpg?alt=media&token=40006ee6-33d1-422e-8bcc-43d0801aaeee"
              alt="step 1 Google Chrome"
              width="90%"
              style={boxShadowStyle}
              loading="lazy"
            ></img>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8-posts/o/assets%2FChrome_02_1024x1024.jpg?alt=media&token=61638f2f-e4c4-4ee8-af7c-3d3b6ec1c8db"
              alt="step 2 Google Chrome"
              width="90%"
              style={boxShadowStyle}
              loading="lazy"
            ></img>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
              boxShadow:
                "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
              paddingBottom: "15px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                marginTop: "15px",
              }}
            >
              <img
                src={FirefoxIcon}
                alt="chrome browser"
                width="24px"
                height="24px"
              ></img>
              <Typography sx={{ fontWeight: "bold", fontSize: "larger" }}>
                Mozilla Firefox
              </Typography>
            </Box>

            <img
              src="https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8-posts/o/assets%2FFirefox_01_1024x1024.jpg?alt=media&token=314a9326-e839-4319-be74-4238b6dba704"
              alt="step 1 Google Chrome"
              width="90%"
              style={boxShadowStyle}
              loading="lazy"
            ></img>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8-posts/o/assets%2FFirefox_02_1024x1024.jpg?alt=media&token=c8fa9cee-4a9d-42c1-90ef-3aea779c346d"
              alt="step 2 Google Chrome"
              width="90%"
              style={boxShadowStyle}
              loading="lazy"
            ></img>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
              boxShadow:
                "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
              paddingBottom: "15px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                marginTop: "15px",
              }}
            >
              <img
                src={EdgeIcon}
                alt="chrome browser"
                width="24px"
                height="24px"
              ></img>
              <Typography sx={{ fontWeight: "bold", fontSize: "larger" }}>
                Microsoft Edge
              </Typography>
            </Box>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8-posts/o/assets%2FEdge_01_1024x1024.jpg?alt=media&token=d12b4928-b0d3-4ed9-9da6-795066d526ae"
              alt="step 1 Google Chrome"
              width="90%"
              style={boxShadowStyle}
              loading="lazy"
            ></img>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8-posts/o/assets%2FEdge_02_1024x1024.jpg?alt=media&token=59ba3897-4399-45e8-a035-7ef0392fba9b"
              alt="step 2 Google Chrome"
              width="90%"
              style={boxShadowStyle}
              loading="lazy"
            ></img>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
              boxShadow:
                "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
              paddingBottom: "15px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                marginTop: "15px",
              }}
            >
              <img
                src={SafariIcon}
                alt="chrome browser"
                width="24px"
                height="24px"
              ></img>
              <Typography sx={{ fontWeight: "bold", fontSize: "larger" }}>
                Safari
              </Typography>
            </Box>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8-posts/o/assets%2FSafari_01_1024x1024.jpg?alt=media&token=cbb15bbf-9921-4d7c-890b-4490b28ee567"
              alt="step 1 Google Chrome"
              width="90%"
              style={boxShadowStyle}
              loading="lazy"
            ></img>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8-posts/o/assets%2FSafari_02_1024x1024.jpg?alt=media&token=f98bf4b8-ab7a-4d1f-8d7b-aa94ba46b808"
              alt="step 2 Google Chrome"
              width="90%"
              style={boxShadowStyle}
              loading="lazy"
            ></img>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default InstallInstructionsModal;
