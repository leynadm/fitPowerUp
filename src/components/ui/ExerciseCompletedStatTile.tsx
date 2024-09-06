import { ReactNode } from "react";
import { Typography } from "@mui/material";
interface ExerciseStatProps {
  statName: string;
  statIcon: ReactNode;
  statDetail: string;
  statValue: number | string;
  statColor: string;
  statTextColor: string;
}

function ExerciseCompletedStatTile({
  statName,
  statIcon,
  statDetail,
  statValue,
  statColor,
  statTextColor,
}: ExerciseStatProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: statColor,
        borderRadius: "5px",
        padding: "4px",
        color: statTextColor,
        boxShadow:
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Typography>{statName}</Typography>
        <Typography>{statIcon}</Typography>
      </div>

      <Typography  style={{ fontSize: "1.25rem",color:`${statTextColor}` }}>
        {statValue} {statDetail}
      </Typography>
    </div>
  );
}

export default ExerciseCompletedStatTile;
