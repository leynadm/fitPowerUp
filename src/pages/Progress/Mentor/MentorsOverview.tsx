import "./saiyan.css";
import MentorCard from "./MentorCard";
import Box from "@mui/material/Box";
import { mentorsData } from "../../../utils/progressFunctions/mentors/mentorsDataArr";
export default function MentorsOverview() {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {mentorsData.map((mentor, index) => (
          <MentorCard mentor={mentor} key={index} />
        ))}
      </Box>
    </>
  );
}
