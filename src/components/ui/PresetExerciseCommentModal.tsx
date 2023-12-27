import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
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
};

interface ParentComponentProps {
  openPresetExerciseCommentModal: boolean;
  setOpenPresetExerciseCommentModal: React.Dispatch<React.SetStateAction<boolean>>;
  isDropset: boolean;
  setIsDropset: React.Dispatch<React.SetStateAction<boolean>>;
  isAMRAP: boolean;
  setIsAMRAP: React.Dispatch<React.SetStateAction<boolean>>;
  commentValue: string;
  setCommentValue: React.Dispatch<React.SetStateAction<string>>;
  idExerciseUpdate: number;
  setDropsetRenderTrigger: React.Dispatch<React.SetStateAction<number>>;
  databaseSelection:string
}
 
function PresetExerciseCommentModal({
  openPresetExerciseCommentModal,
  setOpenPresetExerciseCommentModal,
  commentValue,
  setCommentValue,
  idExerciseUpdate,
  isDropset,
  setIsDropset,
  isAMRAP,
  setIsAMRAP,
  setDropsetRenderTrigger,
  databaseSelection
}: ParentComponentProps) {

  function handleClose() {
    setCommentValue("");
    setOpenPresetExerciseCommentModal(false);
  }

  function saveComment() {
    const request = window.indexedDB.open("fitPowerUpDb",2);
    request.onsuccess = function (event: any) {
      const db = event.target.result;
      const transaction = db.transaction(databaseSelection, "readwrite");
      const objectStore = transaction.objectStore(databaseSelection);

      const getRequest = objectStore.get(idExerciseUpdate);

      getRequest.onsuccess = function (event: any) {
        const data = event.target.result;
        if (data) {
          data.comment = commentValue;
          data.dropset = isDropset;
          data.amrap = isAMRAP;
          const updateRequest = objectStore.put(data);
          updateRequest.onsuccess = function () {
            //console.log("Record updated successfully");
          };
          updateRequest.onerror = function () {
            toast.error("Oops, saveComment has an error!")
            console.log("Error updating record");
          };
        } else {
          console.log("Record not found");
        }
      };

      transaction.oncomplete = function () {
        console.log("Transaction completed");
        setCommentValue("");
        setOpenPresetExerciseCommentModal(false);
      };
      transaction.onerror = function () {
        toast.error("Oops, saveComment has an error!")
        console.log("Transaction error");
      };
    };

    request.onerror = function () {
      toast.error("Oops, saveComment couldn't open the database!")
      console.log("Error opening database");
    };

    setDropsetRenderTrigger((prev) => prev + 1);
  }

  function markEntryAsDropset() {
    setIsDropset(!isDropset);
  }

  function markEntryAsAMRAP() {
    setIsAMRAP(!isAMRAP);
  }

  return (
    <div>
      <Modal
        open={openPresetExerciseCommentModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            id="outlined-multiline-flexible"
            label="Add your comment"
            multiline
            maxRows={4}
            sx={{
              width: "100%",
            }}
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
          />

          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Add the entry as a dropset"
            checked={isDropset}
            onClick={markEntryAsDropset}
          />
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Mark Entry as AMRAP"
            checked={isAMRAP}
            onClick={markEntryAsAMRAP}
          />

          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="dbz_save"
              color="success"
              sx={{ width: "100%", marginTop: "8px", marginRight: "8px" }}
              onClick={saveComment}
            >
              Save
            </Button>
            <Button
              variant="dbz_clear"
              sx={{ width: "100%", marginTop: "8px", marginLeft: "8px" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default PresetExerciseCommentModal;
