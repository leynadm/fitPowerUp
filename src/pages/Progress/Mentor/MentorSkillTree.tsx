import {
  SkillTreeGroup,
  SkillTree,
  SkillProvider,
  SkillType,
} from "beautiful-skill-tree";
import { krillinSkillTree } from "../../../utils/progressFunctions/mentors/mentorsSkillTrees";
import { mentorSkillTreeThemes } from "./MentorSkillTreeThemes";
import { useEffect, useState } from "react";
import { ContextStorage } from "beautiful-skill-tree/dist/models";
import Box from "@mui/material/Box";

type SavedDataType = {
  [key: string]: {
    optional: boolean;
    nodeState: "selected" | "unlocked" | "locked";
  };
};

export default function MentorSkillTree() {
  
    function handleMySave(
    storage: ContextStorage,
    treeId: string,
    skills: SavedDataType
  ) {

    console.log(treeId)
    console.log("Skills state on save:", skills);
    // Optional: Save to localStorage or your backend
    setStates({
      "foundation": { optional: false, nodeState: "locked" },
    });

    skills['foundation'].nodeState = 'selected'

/*     if(skills['core-strength']){
      skills['core-strength'].nodeState = 'locked'
      skills['agility-master'].nodeState = 'selected'
  
    } */
    
  const updatedSkills:SavedDataType = Object.fromEntries(
    Object.entries(skills).map(([key, value]) => [
      key,

      { ...value, nodeState: "locked" },

    ])
  );
  console.log(updatedSkills)

  skills = updatedSkills

  }

  const [states, setStates] = useState<SavedDataType>({
    foundation: { optional: false, nodeState: "locked" },
  });

  const exampleData = [
    {
      id: "foundation",
      icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fbarbell-squat.svg?alt=media&token=5b118193-cdf0-4fe8-bbd1-92975522b4ad",
      title: "Foundation",
      tooltip: {
        content:
          "Start with basic gym exercises to build endurance and stability. Perform 100 total push-ups, 50 squats, and hold a plank for 2 minutes (cumulative).",
      },
      children: [],
    },
  ];

  function handleNodeSelect(nodeId: any) {
    console.log(`Node clicked:`);
    console.log(nodeId);

  }

  return (

    <SkillProvider
    
    >
      <SkillTreeGroup

      theme={mentorSkillTreeThemes["vegeta"]}>
        {() => (
          <SkillTree
    collapsible={false}
            treeId="my-new-tree-4"
            title="my-new-tree-4"
            data={krillinSkillTree}
            savedData={states}
            handleSave={handleMySave}
            handleNodeSelect={handleNodeSelect}

          />
        )}
      </SkillTreeGroup>
    </SkillProvider>

  );
}
