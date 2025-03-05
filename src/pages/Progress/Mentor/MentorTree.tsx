import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import { SkillTree } from "./SkillTree/SkillTree";
import Typography  from "@mui/material/Typography";
import { useContext } from "react";
import { SkillTreeDataContext } from "../../../context/SkillTreeData";

export default function MentorTree() {
  const { id } = useParams<{ id?: string }>();

  const {skillTreesStructure, userSkillTreeProgress} = useContext(SkillTreeDataContext)

  console.log({skillTreesStructure})
console.log({userSkillTreeProgress})
  const mentorName = id || "none";
  const skillTreeData = skillTreesStructure[mentorName]["skillTree"]

  return (
    <Box
      sx={{
        padding: 2,
        borderRadius: "8px",
        margin: "0 auto",
        width:"100%"
      }}
    >
       {skillTreeData ? (
        <SkillTree node={skillTreeData} />
      ) : (
        <Typography variant="h6" color="error" textAlign="center">
          No valid skill tree found for "{mentorName}".
        </Typography>
      )} 
    </Box>
  );
}
