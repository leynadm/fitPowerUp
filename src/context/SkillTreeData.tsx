import React, { createContext, ReactNode, useMemo } from "react";
import { useSkillTreeData } from "../hooks/useSkillTreeData";

import { MentorData } from "../hooks/useSkillTreeData";

interface SkillTreeDataContextProps {
  skillTreesStructure: Record<string, MentorData>; // Assuming the structure of SkillNode[] for the skill tree
  userSkillTreeProgress: Record<string, any>;
  refetchSkillTreesStructure: () => Promise<void>;
  refetchUserSkillTreesProgress: () => Promise<void>;
}

// Create the context
export const SkillTreeDataContext = createContext<SkillTreeDataContextProps>({
  skillTreesStructure: {},
  userSkillTreeProgress: {},
  refetchSkillTreesStructure: async () => {},
  refetchUserSkillTreesProgress: async () => {},
});

// Define provider props
interface SkillTreeDataProviderProps {
  children: ReactNode;
}

// Create the provider
export const SkillTreeDataProvider = ({
  children,
}: SkillTreeDataProviderProps) => {
  const {
    skillTreesStructure,
    userSkillTreeProgress,
    refetchSkillTreesStructure,
    refetchUserSkillTreesProgress,
  } = useSkillTreeData();

  // Memoized context value
  const contextValue = useMemo(
    () => ({
      skillTreesStructure,
      userSkillTreeProgress,
      refetchSkillTreesStructure,
      refetchUserSkillTreesProgress,
    }),
    [skillTreesStructure, userSkillTreeProgress]
  );

  return (
    <SkillTreeDataContext.Provider value={contextValue}>
      {children}
    </SkillTreeDataContext.Provider>
  );
};
