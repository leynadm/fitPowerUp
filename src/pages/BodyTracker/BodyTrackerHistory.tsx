import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
interface BodyTrackerEntry {
  date: Date;
  name: string;
  value: number;
  // Add other properties as needed
}

interface GroupedBodyTrackerEntries {
  date: string;
  entries: BodyTrackerEntry[];
}

function BodyTrackerHistory() {
  const [bodyTrackerEntries, setBodyTrackerEntries] = useState<
    GroupedBodyTrackerEntries[]
  >([]);


  const measurementOptions = [{ label: "Bodyweight" }, { label: "Body Fat" }];
  const [selectedMeasurement, setSelectedMeasurement] = useState<{
    label: string;
  }>(measurementOptions[0]);

  useEffect(() => {
    getBodyTrackerHistory();
  }, [selectedMeasurement]);


  function getBodyTrackerHistory() {
    const request = indexedDB.open("fitScouterDb", 1);
  
    request.onsuccess = function () {
      const db = request.result;
  
      const userEntryTransaction = db.transaction(
        "user-body-tracker",
        "readonly"
      );
  
      const userEntryTransactionStore =
        userEntryTransaction.objectStore("user-body-tracker");
  
      const getAllEntriesRequest = userEntryTransactionStore.getAll();
  
      getAllEntriesRequest.onsuccess = function (event: any) {
        const entries = event.target.result as BodyTrackerEntry[];
  
        // Filter entries by selected measurement name
        const filteredEntries = entries.filter(
          (entry) => entry.name === selectedMeasurement.label
        );
  
        const groupedEntries = groupEntriesByDate(filteredEntries);
            console.log('logging groupedEntries')
            console.log(groupedEntries)
        setBodyTrackerEntries(groupedEntries);
      };
  
      getAllEntriesRequest.onerror = function () {
        console.error("Error retrieving body tracker entries");
      };
  
      userEntryTransaction.oncomplete = function () {
        db.close();
      };
    };
  }
  

  function groupEntriesByDate(
    entries: BodyTrackerEntry[]
  ): GroupedBodyTrackerEntries[] {
    const groupedEntries: GroupedBodyTrackerEntries[] = [];

    entries.forEach((entry) => {
      const date = entry.date.toDateString();
      const existingGroup = groupedEntries.find((group) => group.date === date);

      if (existingGroup) {
        existingGroup.entries.push(entry);
      } else {
        groupedEntries.push({ date, entries: [entry] });
      }
    });

    return groupedEntries;
  }

  return (
    <Container sx={{ display: "flex", flexDirection: "column",alignItems:"center",padding:0 }}>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        value={selectedMeasurement}
        options={measurementOptions}
        onChange={(event, newValue) => {
          if (newValue) {
            console.log(newValue.label); // Log the label
            setSelectedMeasurement(newValue);
          }
        }}
        sx={{
          width: "100%",
          paddingTop: "16px",
          paddingLeft: "8px",
          paddingRight: "8px",
          paddingBottom: "16px"
        }}
        renderInput={(params) => <TextField {...params} label="Measurement" />}
        disableClearable
      />

      {bodyTrackerEntries
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map((group, index) => (
          <Box key={index} sx={{}}>
            <Typography
              variant="h6"
              sx={{
                textAlign: "left",
                fontSize: "medium",
                paddingLeft: "1rem",
              }}
            >
              {group.date.toLocaleString()}
            </Typography>
            <Divider />

            {group.entries.map((groupedEntry, groupedEntryIndex) => (
              <Box
                key={groupedEntryIndex}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  /* 
                    display: "flex",
                    alignItems: "center",
                    */
                  alignItems: "center",
 
                }}
              >
                <Typography sx={{textAlign:"center"}}>{groupedEntry.name}</Typography>
                <Typography sx={{textAlign:"center"}}>{groupedEntry.value}</Typography>

              </Box>
            ))}
          </Box>
        ))}
    </Container>
  );
}

export default BodyTrackerHistory;
