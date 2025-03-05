import Box from "@mui/material/Box";
import { useRef, RefObject } from "react";
import { TreeNode } from "./TreeNode";
export type SkillNode = {
  id: string;
  title: string;
    description: string;
  
  icon: string;
  criteria:{
    reqType:string;
    calcType:string,
    exercise:string[];
    muscleGroup:string[];
    threshold:number
    status:string
  }
  children: SkillNode[];
};

export const SkillTree = ({
  node,
  parentRef,
}: {
  node: SkillNode;
  parentRef?: RefObject<HTMLDivElement>;
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const connectorRef = useRef<HTMLDivElement>(null);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      position="relative"
    >
      {/* Render the node */}
      <TreeNode node={node} />

      {node.children.length > 0 && (
        <>
          {/* Connector for vertical and horizontal lines */}
          <Box
            ref={connectorRef}
            style={{
              position: "relative",
              width: "100%", // Full width to span horizontally
              height: "50px", // Height of the vertical connector
            }}
          >
            <svg
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            >
              {/* Vertical line from parent to midpoint */}
              <line
                x1="50%"
                y1="0"
                x2="50%"
                y2="50%"
                stroke="purple"
                strokeWidth={4}
              />

              {/* Horizontal lines to each child */}
              {node.children.map((_, index) => {
                const totalChildren = node.children.length;
                const childX = (index + 0.5) / totalChildren; // Space evenly for each child
                return (
                  <line
                    key={index}
                    x1="50%"
                    y1="50%"
                    x2={`${childX * 100}%`}
                    y2="100%"
                    stroke="purple"
                    strokeWidth={4}
                  />
                );
              })}
            </svg>
          </Box>

          {/* Render children */}
          <Box display="flex" justifyContent="center" gap={2}>
            {node.children.map((child) => (
              <SkillTree key={child.id} node={child} parentRef={nodeRef} />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};
