import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { blue } from "@mui/material/colors";
import { AuthContext } from "../../context/Auth";
import TextField from "@mui/material/TextField";
import CardMedia from "@mui/material/CardMedia";
import ImageIcon from "@mui/icons-material/Image";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Dialog from "@mui/material/Dialog";

const style = {
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 1,
  borderRadius: 1,
  width: "100%",
};

interface FriendsProps {
  addContentModalOpen: boolean;
  setAddContentModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

function AddContentModal({
  addContentModalOpen,
  setAddContentModalOpen,
}: FriendsProps) {
  const handleClose = () => setAddContentModalOpen(false);
  const currentUser = useContext(AuthContext);
  const [postDate, setPostDate] = useState(new Date());
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileSource, setFileSource] = useState<string | null>(null);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedFile(file);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const fileSource = e.target?.result as string;
        setFileSource(fileSource);
      };
    }
  }

  function removeFile() {
    setSelectedFile(null);
    setFileSource(null);
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", justifyContent:"center",alignItems:"center",height:"100%" }}>
      <Dialog
        open={addContentModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        fullWidth
        sx={{
          height: "100%",
          paddingBottom: "56px",
          marginBottom: "56px",
        }}
>
        <Box sx={style}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe"></Avatar>
            }
            title="Shrimp and Chorizo Paella"
            subheader={postDate.toDateString()}
          />

          {fileSource && (
            <CardMedia
              component="img"
              height="50%"
              image={fileSource}
              alt="Uploaded image"
              sx={{ borderRadius: 1 }}
            />
          )}

          <TextField
            id="standard-textarea"
            label="Share your thoughts..."
            multiline
            variant="filled"
            rows={2}
            sx={{ width: "100%", marginTop: "8px" }}
          />

          <Box
            sx={{
              width: "100%",
              display: "flex",
              paddingLeft: "0",
              paddingTop: "8px",
              paddingBottom: "8px",
            }}
          >
            <Button
              component="label"
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                padding: "0",
              }}
            >
              <Box sx={{ display: "flex" }}>
                <ImageIcon />
                <p>Add a photo to your post</p>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  hidden
                  onChange={handleFileChange}
                />
              </Box>
            </Button>
            <Box>
              {fileSource && (
                <IconButton onClick={removeFile}>
                  <DeleteForeverIcon />
                </IconButton>
              )}
            </Box>
          </Box>

          <FormControl component="fieldset">
            <FormGroup
              aria-label="position"
              sx={{ display: "flex", flexDirection: "row" }}
            >
              <FormControlLabel
                value="end"
                control={<Checkbox />}
                label="Add Power Level"
                labelPlacement="end"
              />
              <FormControlLabel
                value="end"
                control={<Checkbox />}
                label="Add workout"
                labelPlacement="end"
              />
            </FormGroup>
          </FormControl>

          <Box sx={{ display: "flex" }}>
            <Button
              disableElevation
              variant="contained"
              color="success"
              sx={{ width: "100%", marginTop: "8px", marginRight: "8px" }}
            >
              POST
            </Button>
            <Button
              disableElevation
              variant="contained"
              sx={{ width: "100%", marginTop: "8px", marginLeft: "8px" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Box>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Method:</Typography>
              <Typography paragraph>
                Heat 1/2 cup of the broth in a pot until simmering, add saffron
                and set aside for 10 minutes.
              </Typography>
              <Typography paragraph>
                Heat oil in a (14- to 16-inch) paella pan or a large, deep
                skillet over medium-high heat. Add chicken, shrimp and chorizo,
                and cook, stirring occasionally until lightly browned, 6 to 8
                minutes. Transfer shrimp to a large plate and set aside, leaving
                chicken and chorizo in the pan. Add pimentón, bay leaves,
                garlic, tomatoes, onion, salt and pepper, and cook, stirring
                often until thickened and fragrant, about 10 minutes. Add
                saffron broth and remaining 4 1/2 cups chicken broth; bring to a
                boil.
              </Typography>
              <Typography paragraph>
                Add rice and stir very gently to distribute. Top with artichokes
                and peppers, and cook without stirring, until most of the liquid
                is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
                reserved shrimp and mussels, tucking them down into the rice,
                and cook again without stirring, until mussels have opened and
                rice is just tender, 5 to 7 minutes more. (Discard any mussels
                that don&apos;t open.)
              </Typography>
              <Typography>
                Set aside off of the heat to let rest for 10 minutes, and then
                serve.
              </Typography>
            </CardContent>
          </Collapse>
        </Box>
      </Dialog>
    </Box>
  );
}

export default AddContentModal;
