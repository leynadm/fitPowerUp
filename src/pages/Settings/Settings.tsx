import React, {
  useState,
  Dispatch,
  SetStateAction,
  useRef,
  ChangeEvent,
} from "react";
import Box from "@mui/material/Box";
import { AppBar, Toolbar } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import SettingsIcon from "@mui/icons-material/Settings";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import deleteAllEntries from "../../utils/CRUDFunctions/deleteAllEntries";
import exportData from "../../utils/exportData";
import * as XLSX from "xlsx";
import DeleteAllDataModal from "../../components/ui/DeleteAllDataModal";
import SuccessGenericAlert from "../../components/ui/SuccessGenericAlert";
import FailedGenericAlert from "../../components/ui/FailedGenericAlert";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import toast from "react-hot-toast"

const style = {
  width: "100%",
  marginTop: "8px",

  bgcolor: "background.paper",

};

interface WorkoutProps {
  unitsSystem: string;
  setUnitsSystem: Dispatch<SetStateAction<string>>;
  weightIncrementPreference: number;
  setWeightIncrementPreference: Dispatch<SetStateAction<number>>;
}

function Settings({
  unitsSystem,
  setUnitsSystem,
  weightIncrementPreference,
  setWeightIncrementPreference,
}: WorkoutProps) {
  const [enabled, setEnabled] = useState(unitsSystem === "imperial");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [openDeleteAllData, setOpenDeleteAllData] = useState(false);
  const [genericSuccessAlert, setGenericSuccessAlert] = useState(false);
  const [genericFailedAlert, setGenericFailedAlert] = useState(false);
  const [alertTimeoutId, setAlertTimeoutId] = useState<NodeJS.Timeout | null>(
    null
  );

  const [datasetOrigin, setDatasetOrigin] = useState("fitPowerUp");

  const handleDatasetOriginChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDatasetOrigin(e.target.value);
  };

  const updateToImperial = () => {
    const request = indexedDB.open("fitScouterDb");

    request.onsuccess = function () {
      const db = request.result;

      // Update unitsSystem to "imperial"
      const preferenceTransaction = db.transaction(
        "user-data-preferences",
        "readwrite"
      );
      const preferenceStore = preferenceTransaction.objectStore(
        "user-data-preferences"
      );
      const preferenceRequest = preferenceStore.get(1);

      preferenceRequest.onsuccess = function (event) {
        const preferenceRecord = (event.target as IDBRequest).result;

        if (preferenceRecord) {
          preferenceRecord.unitsSystem = "imperial";

          const updatePreferenceRequest = preferenceStore.put(preferenceRecord);

          updatePreferenceRequest.onsuccess = function () {
            setUnitsSystem("imperial");
            console.log("Units system updated successfully");
          };

          updatePreferenceRequest.onerror = function () {
            toast.error("Oops, updateToImperial has an error!")
            console.error("Error updating units system");
          };
        }
      };

      // Update weight to imperial
      const weightTransaction = db.transaction(
        "user-exercises-entries",
        "readwrite"
      );
      const weightStore = weightTransaction.objectStore(
        "user-exercises-entries"
      );
      const weightCursor = weightStore.openCursor();

      weightCursor.onsuccess = function (event) {
        const cursor = (event.target as IDBRequest).result;

        if (cursor) {
          const updatedRecord = cursor.value;
          updatedRecord.weight *= 2.2;

          const updateRequest = cursor.update(updatedRecord);

          updateRequest.onsuccess = function () {
            console.log("Weight updated successfully");
            cursor.continue();
          };

          updateRequest.onerror = function () {
            toast.error("Oops, updateRequest in updateToImperial has an error!")
            console.error("Error updating weight");
            cursor.continue();
          };
        }
      };

      // Commit the transactions
      preferenceTransaction.oncomplete = function () {
        console.log("Preference transaction completed");
      };

      preferenceTransaction.onerror = function () {
        toast.error("Oops, preferenceTransaction has an error!")
        console.error("Error in preference transaction");
      };

      weightTransaction.oncomplete = function () {
        console.log("Weight transaction completed");
      };

      weightTransaction.onerror = function () {
        toast.error("Oops, weightTransaction has an error!")
        console.error("Error in weight transaction");
      };
    };

    request.onerror = function () {
      toast.error("Oops, couldn't open the database in updateToImperial!")
      console.error("Error opening database");
    };
  };

  const updateToMetric = () => {
    const request = indexedDB.open("fitScouterDb");

    request.onsuccess = function () {
      const db = request.result;

      // Update unitsSystem to "metric"
      const preferenceTransaction = db.transaction(
        "user-data-preferences",
        "readwrite"
      );
      const preferenceStore = preferenceTransaction.objectStore(
        "user-data-preferences"
      );
      const preferenceRequest = preferenceStore.get(1);

      preferenceRequest.onsuccess = function (event) {
        const preferenceRecord = (event.target as IDBRequest).result;

        if (preferenceRecord) {
          preferenceRecord.unitsSystem = "metric";

          const updatePreferenceRequest = preferenceStore.put(preferenceRecord);

          updatePreferenceRequest.onsuccess = function () {
            setUnitsSystem("metric");
            console.log("Units system updated successfully");
          };

          updatePreferenceRequest.onerror = function () {
            toast.error("Oops, updateToMetric has an error!")
            console.error("Error updating units system");
          };
        }
      };

      // Update weight to imperial
      const weightTransaction = db.transaction(
        "user-exercises-entries",
        "readwrite"
      );
      const weightStore = weightTransaction.objectStore(
        "user-exercises-entries"
      );
      const weightCursor = weightStore.openCursor();

      weightCursor.onsuccess = function (event) {
        const cursor = (event.target as IDBRequest).result;

        if (cursor) {
          const updatedRecord = cursor.value;
          updatedRecord.weight /= 2.2;

          const updateRequest = cursor.update(updatedRecord);

          updateRequest.onsuccess = function () {
            console.log("Weight updated successfully");
            cursor.continue();
          };

          updateRequest.onerror = function () {
            toast.error("Oops, updateToMetric cursor has an error!")
            console.error("Error updating weight");
            cursor.continue();
          };
        }
      };

      // Commit the transactions
      preferenceTransaction.oncomplete = function () {
        console.log("Preference transaction completed");
      };

      preferenceTransaction.onerror = function () {
        toast.error("Oops, preference transaction has an error!")
        console.error("Error in preference transaction");
      };

      weightTransaction.oncomplete = function () {
        console.log("Weight transaction completed");
      };

      weightTransaction.onerror = function () {
        toast.error("Oops, weight transaction has an error!")
        console.error("Error in weight transaction");
      };
    };

    request.onerror = function () {
      toast.error("Oops, couldn't open the database in updateToMetric")
      console.error("Error opening database");
    };
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnabled(event.target.checked);

    if (event.target.checked) {
      updateToImperial();
    } else {
      updateToMetric();
    }
  };

  function updateDefaultWeightIncrement(selectedValue: number) {
    const dbName = "fitScouterDb";
    const objectStoreName = "user-data-preferences";
    const objectStoreKeyPath = "id";

    const request = window.indexedDB.open(dbName);

    request.onerror = (event) => {
      toast.error("Oops, updateDefaultWeightIncrement has an error!")
      console.error("Database error:", request.error);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBRequest).result;

      // Create the object store if it doesn't exist
      if (!db.objectStoreNames.contains(objectStoreName)) {
        const objectStore = db.createObjectStore(objectStoreName, {
          keyPath: objectStoreKeyPath,
        });
        objectStore.createIndex("id", "id", { unique: true });
      }
    };

    request.onsuccess = (event) => {
      const db = request.result;

      const transaction = db.transaction(objectStoreName, "readwrite");
      const objectStore = transaction.objectStore(objectStoreName);

      const getRequest = objectStore.get(1);

      getRequest.onerror = (event) => {
        toast.error("Oops, updateDefaultWeightIncrement has an error!")
        console.error("Error getting entry:", getRequest.error);
      };

      getRequest.onsuccess = (event) => {
        const entry = getRequest.result;
        entry.defaultWeightIncrement = selectedValue;

        const updateRequest = objectStore.put(entry);

        updateRequest.onerror = (event) => {
          toast.error("Oops, updateRequest has an error!")
          console.error("Error updating entry:", updateRequest.error);
        };

        updateRequest.onsuccess = (event) => {
          console.log("Default weight increment updated successfully!");

          // Commit the transaction
          transaction.oncomplete = () => {
            console.log("Transaction completed.");

            // Close the database connection
            db.close();
          };
        };
      };
    };
  }

  const weightIncrementOptions = [0.25, 0.5, 1.0, 1.25, 2.0, 2.5, 5.0, 10.0];

  function handleDeleteAllDataModalVisibility() {
    setOpenDeleteAllData(!openDeleteAllData);
  }

  function handleImportFileSelection() {
    fileInputRef.current?.click();
  }

  function importData(file: File) {
    const reader = new FileReader();

    reader.onload = (e) => {
      console.log(e.target);
      console.log(e.target?.result);
      if (e.target && e.target.result) {
        const data = new Uint8Array(e.target.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        if (datasetOrigin === "fitPowerUp") {
          processImportedData(jsonData);
        } else if (datasetOrigin === "fitNotes") {
          processImportedDataFitNotes(jsonData);
        }
      }
    };

    reader.readAsArrayBuffer(file);

    console.log("added file");
  }

  function processImportedDataFitNotes(jsonData: any) {
    if (jsonData.length === 0) {
      showFailedAlert();
      return;
    }

    const titleRow = jsonData[0];
    if (
      titleRow[0] !== "Date" ||
      titleRow[1] !== "Exercise" ||
      titleRow[2] !== "Category" ||
      titleRow[3] !== "Weight" ||
      titleRow[4] !== "Weight Unit" ||
      titleRow[5] !== "Reps" ||
      titleRow[6] !== "Distance" ||
      titleRow[7] !== "Distance Unit" ||
      titleRow[8] !== "Time" ||
      jsonData.length === 0
    ) {
      showFailedAlert();
      return;
    }

    const request = indexedDB.open("fitScouterDb");
    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction("user-exercises-entries", "readwrite");
      const objectStore = transaction.objectStore("user-exercises-entries");

      for (let i = 1; i < jsonData.length; i++) {
        const row = jsonData[i] as unknown[];
        const serialDate = row[0] as number;
        const excelEpoch = new Date(Date.UTC(1899, 11, 30));
        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        const offsetMilliseconds = serialDate * millisecondsPerDay;
        const date = new Date(excelEpoch.getTime() + offsetMilliseconds);
        // Set time portion to midnight
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);

        let weightRow = row[3]
        let repsRow = row[5]

        let distanceRow = row[6];
        let distance_unitRow = row[7];
        let timeRow = row[8];
        let commentRow = row[9];

        console.log({repsRow})


        if (weightRow === undefined) {
          weightRow = 0;
        }

        if (repsRow === undefined) {
          repsRow = 0;
        }

        if (distanceRow === undefined) {
          distanceRow = 0;
        }

        if (distance_unitRow === undefined) {
          distance_unitRow = "m";
        }

        if (timeRow === undefined) {
          timeRow = 0;
        }

        if (commentRow === undefined) {
          commentRow = "";
        }

        const entry = {
          // Map the appropriate properties from the Excel file to your object structure
          // For example:
          date: date, // Convert the serial date to a Date object with time set to midnight
          exercise: row[1] as string,
          category: row[2] as string,
          weight: weightRow as number,
          reps: repsRow as number,
          distance: /*  row[5] as number */ distanceRow as number,
          distance_unit: /* row[6] as string */ distance_unitRow as string,
          time: /*  row[7] as string */ timeRow as number,
          is_pr: false,
          dropset: 0,
          comment: commentRow,
        };


        if (row[3] !== undefined && row[4] !== undefined)
          objectStore.add(entry);
      }

      transaction.oncomplete = () => {
        console.log("Data imported successfully.");
        showSuccessfulAlert();
      };

      request.onerror = () => {
        toast.error("Oops, processImportedDataFitNotes has an error!")
        console.error(request.error);
      };
    };
  }

  function processImportedData(jsonData: any) {
    if (jsonData.length === 0) {
      showFailedAlert();
      return;
    }

    const titleRow = jsonData[0];
    if (
      titleRow[0] !== "date" ||
      titleRow[1] !== "exercise" ||
      titleRow[2] !== "category" ||
      titleRow[3] !== "weight" ||
      titleRow[4] !== "reps" ||
      titleRow[5] !== "distance" ||
      titleRow[6] !== "distance_unit" ||
      titleRow[7] !== "time" ||
      titleRow[8] !== "is_pr" ||
      titleRow[9] !== "dropset" ||
      titleRow[10] !== "comment" ||
      titleRow[11] !== "id" ||
      jsonData.length === 0
    ) {
      showFailedAlert();
      return;
    }

    const request = indexedDB.open("fitScouterDb");
    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction("user-exercises-entries", "readwrite");
      const objectStore = transaction.objectStore("user-exercises-entries");

      for (let i = 1; i < jsonData.length; i++) {
        const row = jsonData[i] as unknown[];
        const serialDate = row[0] as number;
        const excelEpoch = new Date(Date.UTC(1899, 11, 30));
        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        const offsetMilliseconds = serialDate * millisecondsPerDay;
        const date = new Date(excelEpoch.getTime() + offsetMilliseconds);
        // Set time portion to midnight
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);

        let weightRow = row[3]
        let repsRow = row[4]
        let distanceRow = row[5];
        let distance_unitRow = row[6];
        let timeRow = row[7];
        let isPrRow = row[8];
        let dropsetRow = row[9];
        let commentRow = row[10];

        if (weightRow===undefined){
          weightRow=0
        } else if (repsRow === undefined) {
          repsRow = 0;
        } else if (distanceRow === undefined) {
          distanceRow = 0;
        } else if (distance_unitRow === undefined) {
          distance_unitRow = "m";
        } else if (timeRow === undefined) {
          timeRow = 0;
        } else if (isPrRow === undefined) {
          isPrRow = false;
        } else if (dropsetRow === undefined) {
          dropsetRow = 0;
        } else if (commentRow === undefined) {
          commentRow = "";
        }


        const entry = {
          // Map the appropriate properties from the Excel file to your object structure
          // For example:
          date: date, // Convert the serial date to a Date object with time set to midnight
          exercise: row[1] as string,
          category: row[2] as string,
          weight: weightRow as number,
          reps: repsRow as number,
          distance: /*  row[5] as number */ distanceRow as number,
          distance_unit: /* row[6] as string */ distance_unitRow as string,
          time: /*  row[7] as string */ timeRow as number,
          is_pr: row[8] as boolean,
          dropset: dropsetRow,
          comment: row[10],
        };
        if (row[3] !== undefined && row[4] !== undefined)
          objectStore.add(entry);
      }

      transaction.oncomplete = () => {
        console.log("Data imported successfully.");
        showSuccessfulAlert();
      };

      request.onerror = () => {
        toast.error("Oops, processImportedData has an error!")
        console.error(request.error);
      };
    };
  }

  function showSuccessfulAlert() {
    setGenericSuccessAlert(true);

    // Clear previous timeout if it exists
    if (alertTimeoutId) {
      clearTimeout(alertTimeoutId);
    }

    // Set new timeout to hide the alert after 2 seconds
    const timeoutId = setTimeout(() => {
      setGenericSuccessAlert(false);
    }, 3000);

    setAlertTimeoutId(timeoutId);
    return;
  }

  function showFailedAlert() {
    setGenericFailedAlert(true);

    // Clear previous timeout if it exists
    if (alertTimeoutId) {
      clearTimeout(alertTimeoutId);
    }

    // Set new timeout to hide the alert after 2 seconds
    const timeoutId = setTimeout(() => {
      setGenericFailedAlert(false);
    }, 3000);

    setAlertTimeoutId(timeoutId);
    return;
  }

  const handleWeightIncrementChange = (event: any) => {
    const selectedValue = Number(event.target.value);
    setWeightIncrementPreference(selectedValue);
    updateDefaultWeightIncrement(selectedValue);
  };

  function handleDeleteAllEntries() {
    exportData();
    deleteAllEntries();
    setOpenDeleteAllData(false);
  }

  return (
    <Container
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <DeleteAllDataModal
        setOpenDeleteAllData={setOpenDeleteAllData}
        openDeleteAllData={openDeleteAllData}
        handleDeleteAllEntries={handleDeleteAllEntries}
      />

      <AppBar position="fixed" elevation={0} style={{ top: 0, height: "56px" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <SettingsIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Settings
            </Typography>

            <SettingsIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />

            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Settings
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <SuccessGenericAlert
        genericSuccessAlert={genericSuccessAlert}
        genericSuccessAlertText={"Your data was succesfully imported!"}
      />

      <FailedGenericAlert
        genericFailedAlert={genericFailedAlert}
        genericFailedAlertText={"The file provided contains incompatible data!"}
      />
      <List sx={style}>
        <ListItem sx={{ boxShadow: 1 }}>
          <Box
            sx={{
              width: "100%",
              alignSelf: "center",
              justifySelf: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch checked={enabled} onChange={handleSwitchChange} />
                }
                label={enabled ? "Imperial" : "Metric"}
              />
            </FormGroup>
          </Box>
        </ListItem>

        <ListItem sx={{ boxShadow: 1 }}>
          <Box sx={{ width: "100%" }}>
            <FormControl variant="outlined" sx={{ width: "100%" }}>
              <InputLabel id="weight-increment-label">
                Weight Increment
              </InputLabel>
              <Select
                labelId="weight-increment-label"
                id="weight-increment"
                value={weightIncrementPreference}
                onChange={handleWeightIncrementChange}
                label="Weight Increment"
                sx={{ width: "100%" }}
              >
                {weightIncrementOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </ListItem>

        <ListItem sx={{ boxShadow: 1 }}>
          <Box sx={{ width: "100%" }}>
            <Typography sx={{ fontSize: "smaller" }}>
              Export all your exercise data to an .xlsx file.
            </Typography>
            <Button
              variant="contained"
              sx={{ width: "100%" }}
              onClick={exportData}
            >
              Export Data
            </Button>
          </Box>
        </ListItem>

        <ListItem sx={{ boxShadow: 1 }}>
          <Box sx={{ width: "100%" }}>
            <Typography sx={{ fontSize: "smaller" }}>
              Import a compatible dataset.<br></br> It can be a previously
              exported fitPowerUp file(.xlsx) or a fitNotes(for Android) app
              one(.csv).
            </Typography>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={handleDatasetOriginChange}
              >
                <FormControlLabel
                  value="fitPowerUp"
                  control={<Radio />}
                  label="fitPowerUp"
                  checked={datasetOrigin === "fitPowerUp"}
                />
                <FormControlLabel
                  value="fitNotes"
                  control={<Radio />}
                  label="fitNotes (Android)"
                  checked={datasetOrigin === "fitNotes"}
                />
              </RadioGroup>
            </FormControl>
            <Button
              variant="contained"
              sx={{ width: "100%" }}
              onClick={handleImportFileSelection}
            >
              Import Data
            </Button>

            <input
              ref={fileInputRef}
              type="file"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  console.log({ datasetOrigin });
                  importData(file);
                }
              }}
            />
          </Box>
        </ListItem>

        <ListItem sx={{ boxShadow: 1 }}>
          <Box sx={{ width: "100%" }}>
            <Typography sx={{ fontSize: "smaller" }}>
              Delete all your exercise data.
            </Typography>
            <Button
              variant="contained"
              sx={{ width: "100%" }}
              onClick={handleDeleteAllDataModalVisibility}
            >
              Delete All Data
            </Button>
          </Box>
        </ListItem>

        <ListItem sx={{ boxShadow: 1 }}>
          <Box sx={{ width: "100%" }}>
            <Typography sx={{ fontSize: "smaller" }}>
              You can recalculate all your records if you think there might be
              an error. It's advisable to do this after importing a dataset.
            </Typography>
            <Button
              variant="contained"
              sx={{ width: "100%" }}
              onClick={handleDeleteAllDataModalVisibility}
            >
              Recalculate PRs
            </Button>
          </Box>
        </ListItem>

      </List>
      
    </Container>
  );
}

export default Settings;
