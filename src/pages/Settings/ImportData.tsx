import { AppBar, Toolbar } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SettingsIcon from "@mui/icons-material/Settings";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import VerifiedIcon from "@mui/icons-material/Verified";
import FormLabel from "@mui/material/FormLabel";

import UploadFileIcon from "@mui/icons-material/UploadFile";
function ImportData() {
  return (
    <Container
      maxWidth="md"
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppBar
        elevation={3}
        position="fixed"
        style={{
          top: 0,
          height: "56px",
          background:
            "radial-gradient(circle, rgba(80,80,80,1) 0%, rgba(0,0,0,1) 100%)",
        }}
      >
        <Container maxWidth="md">
          <Toolbar disableGutters>
            <UploadFileIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="text"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },

                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Import Data
            </Typography>

            <UploadFileIcon
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />

            <Typography
              variant="h5"
              noWrap
              component="text"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,

                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Import Data
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>

      <Box display="flex" flexDirection="column">
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            Choose the app you want to import from:
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="FitNotes"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="FitNotes"
              control={<Radio />}
              label="FitNotes (for Android)"
            />
            <FormControlLabel
              value="Strong"
              control={<Radio />}
              label="Strong"
            />
            <FormControlLabel value="Hevy" control={<Radio />} label="Hevy" />
            <FormControlLabel value="Lyfta" control={<Radio />} label="Lyfta" />
          </RadioGroup>
        </FormControl>
      </Box>
    </Container>
  );
}

export default ImportData;
