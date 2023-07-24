import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import toast from "react-hot-toast";

interface BodyTrackerEntry {
  date: Date;
  name: string;
  value: number;
}

interface GroupedBodyTrackerEntries {
  date: string;
  entries: BodyTrackerEntry[];
}

interface BodyTrackerProps {
  unitsSystem: string;
}

function BodyTrackerHistory({ unitsSystem }: BodyTrackerProps) {
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
        console.log("logging groupedEntries");
        console.log(groupedEntries);
        setBodyTrackerEntries(groupedEntries);
      };

      getAllEntriesRequest.onerror = function () {
        toast.error("Oops, getBodyTrackerHistory has an error!")
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
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "100%", marginTop: "8px" }}>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="measurement-label">Measurement</InputLabel>
          <Select
            labelId="measurement-label"
            id="measurement-select"
            value={selectedMeasurement.label}
            onChange={(event) => {
              const newValue = event.target.value as string;
              const newSelectedMeasurement = measurementOptions.find(
                (option) => option.label === newValue
              );
              setSelectedMeasurement(newSelectedMeasurement!);
            }}
            label="Measurement"
            sx={{ width: "100%", marginBottom: "1rem" }}
          >
            {measurementOptions.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {bodyTrackerEntries.length !== 0 ? (
        bodyTrackerEntries
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .map((group, index) => (
            <Box key={index} sx={{ width: "100%" }}>
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

              {group.entries.map(
                (groupedEntry: any, groupedEntryIndex: number) => (
                  <Box
                    key={groupedEntryIndex}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ textAlign: "center" }}>
                      {groupedEntry.name}
                    </Typography>

                    <Typography sx={{ textAlign: "center" }}>
                      {groupedEntry.value}
                    </Typography>

                    {selectedMeasurement.label === "Bodyweight" && (
                      <Typography sx={{ textAlign: "center" }}>
                        {unitsSystem === "metric" ? "kgs" : "lbs"}
                      </Typography>
                    )}

                    {selectedMeasurement.label === "Body Fat" && (
                      <Typography sx={{ textAlign: "center" }}>%</Typography>
                    )}
                  </Box>
                )
              )}
            </Box>
          ))
      ) : (
        <Box
          sx={{
            height: "calc(100vh - 144px)",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="body1" align="center">
            No existing exercises found.
          </Typography>
        </Box>
      )}
    </Container>
  );
}

export default BodyTrackerHistory;
