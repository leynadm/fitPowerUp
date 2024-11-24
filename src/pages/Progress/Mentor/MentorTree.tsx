import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import { simpleSkillTree } from "../../../utils/progressFunctions/mentors/mentorsSkillTrees";
import { useRef, useEffect, RefObject } from "react";

export type SkillNode = {
  id: string;
  title: string;
  tooltip: {
    content: string;
  };
  icon: string;
  children: SkillNode[];
};

const TreeNode = ({ node }: { node: SkillNode }) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (nodeRef.current) {
      const rect = nodeRef.current.getBoundingClientRect();
      console.log(`Node Position (${node.id}):`, rect);
    }
  }, []);

  return (
    <Box
      ref={nodeRef}
      display="flex"
      flexDirection="column"
      alignItems="center"
      position="relative"
    >
      <Button
        sx={{
          width: "65px",
          height: "65px",
          border: "3px solid black",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          padding: "2px",
        }}
      >
        <img
          style={{
            background:
              "radial-gradient(circle, rgba(255,165,0,1) 18%, rgba(156,105,12,1) 100%)",
            borderRadius: "50%",
            padding: "4px",
          }}
          src={node.icon}
          alt=""
          width="100%"
          height="100%"
        />
      </Button>
    </Box>
  );
};

const SkillTree = ({
  node,
  parentRef,
}: {
  node: SkillNode;
  parentRef?: RefObject<HTMLDivElement>;
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const connectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (parentRef?.current && connectorRef.current) {
      const parentRect = parentRef.current.getBoundingClientRect();
      const connectorRect = connectorRef.current.getBoundingClientRect();

      const startX = parentRect.left + parentRect.width / 2;
      const startY = parentRect.bottom;
      const endX = connectorRect.left + connectorRect.width / 2;
      const endY = connectorRect.top;

      console.log(`Line from Parent to Connector`, {
        startX,
        startY,
        endX,
        endY,
      });
    }
  }, [parentRef]);

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
                stroke="black"
                strokeWidth={2}
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
                    stroke="black"
                    strokeWidth={2}
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

export default function MentorTree() {
  const { id } = useParams();

  return (
    <Box
      sx={{
        padding: 1,
        borderRadius: "4px",
      }}
    >
      <SkillTree node={simpleSkillTree} />
    </Box>
  );
}
