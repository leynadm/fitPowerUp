import React, { useState, Dispatch, SetStateAction } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Container from "@mui/material/Container";
import BrowserTile from "./BrowserTile";
import ChromeIcon from "../../assets/chrome-48.png";
import FirefoxIcon from "../../assets/firefox-48.png";
import SafariIcon from "../../assets/safari-48.png";
import EdgeIcon from "../../assets/edge-48.png";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Padding } from "@mui/icons-material";
import InstallMobileIcon from "@mui/icons-material/InstallMobile";
interface BrowserInstructionUrls {
  firstImageLink: string;
  secondImageLink: string;
  thirdImageLink: string;
}

const browserInstructions: Record<string, BrowserInstructionUrls> = {
  Chrome: {
    firstImageLink:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Flanding-page%2Finstallation-instructions%2Fchrome-1.jpg?alt=media&token=b823edc5-c9c9-4d9f-8e55-1a6d106103f5",
    secondImageLink:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Flanding-page%2Finstallation-instructions%2Fchrome-2.jpg?alt=media&token=a7831d82-3cac-415f-8952-51f36e163da3",
    thirdImageLink:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Flanding-page%2Finstallation-instructions%2Fchrome-3.jpg?alt=media&token=1af644a9-9672-4167-8ed1-9b4fed93cf03",
  },
  Safari: {
    firstImageLink:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Flanding-page%2Finstallation-instructions%2Fsafari-1.jpg?alt=media&token=a984c8cb-a9fe-4e66-8c3f-33bbf07292fb",
    secondImageLink:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Flanding-page%2Finstallation-instructions%2Fsafari-2.jpg?alt=media&token=528c4be2-9722-49f0-8bd2-6f2649daa6e9",
    thirdImageLink:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Flanding-page%2Finstallation-instructions%2Fsafari-3.jpg?alt=media&token=a2fc4e5a-eefb-4efe-84c9-199f878eb495",
  },
  Firefox: {
    firstImageLink:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Flanding-page%2Finstallation-instructions%2Ffirefox-1.jpg?alt=media&token=7dd93ccc-3360-4a4b-a6a4-11129b021d65",
    secondImageLink:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Flanding-page%2Finstallation-instructions%2Ffirefox-2.jpg?alt=media&token=ada192c8-2e47-419c-a5a6-caf2977ba912",
    thirdImageLink:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Flanding-page%2Finstallation-instructions%2Ffirefox-3.jpg?alt=media&token=b0330361-a85e-4b79-acc6-9737b28f7794",
  },
  Edge: {
    firstImageLink:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Flanding-page%2Finstallation-instructions%2Fedge-1.jpg?alt=media&token=30b668a6-0b50-42be-af49-1ba42a5285bc",
    secondImageLink:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Flanding-page%2Finstallation-instructions%2Fedge-2.jpg?alt=media&token=0e916581-b0fe-49ab-811d-16d58ee5492f",
    thirdImageLink:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Flanding-page%2Finstallation-instructions%2Fedge-3.jpg?alt=media&token=235fb9dc-ddf7-4c3a-af12-e06ff1e6c91a",
  },
};

interface ParentComponentProps {
  openInstallInstructionsModal: boolean;
  setOpenInstallInstructionsModal: Dispatch<SetStateAction<boolean>>;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  width: "90%",
};

function InstallInstructionsModal({
  openInstallInstructionsModal,
  setOpenInstallInstructionsModal,
}: ParentComponentProps) {
  const [selectedBrowser, setSelectedBrowser] = useState<string>("Chrome");

  const handleClose = () => setOpenInstallInstructionsModal(false);

  const handleBrowserSelection = (browser: string) => {
    setSelectedBrowser(browser);
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
        <Container sx={style} maxWidth="md">
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography
              fontSize="1.25rem"
              textAlign="center"
              alignSelf="flex-end"
              color="#1c4595"
            >
              Install App
            </Typography>
            <InstallMobileIcon fontSize="large" />
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap={1}
            padding={2}
          >
            <Typography fontFamily="Raleway" fontWeight={700} align="center">
              Install the app for a quicker access.
            </Typography>

            <Box
              display="flex"
              gap={1}
              alignItems="center"
              justifyContent="center"
              fontFamily="Raleway"
              fontWeight={700}
            >

              Just tap <MoreHorizIcon fontSize="large" />
              and<span style={{ fontWeight: "bold" }}>Install App</span>
            </Box>
          </Box>
        </Container>
      </Modal>
    </div>
  );
}

export default InstallInstructionsModal;
