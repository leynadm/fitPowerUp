import { ReactNode } from "react";

interface ExerciseStatProps {
  statName: string;
  statIcon: ReactNode;
  statDetail: string;
  statValue:number|string
  statColor:string
  statTextColor:string
}

function ExerciseCompletedStatTile({
  statName,
  statIcon,
  statDetail,
  statValue,
  statColor,
  statTextColor
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
        color:statTextColor,
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
        <div>{statName}</div>

        {statIcon}
      </div>

      <div style={{ fontSize: "1.5rem" }}>{statValue} {statDetail}</div>
    </div>
  );
}

export default ExerciseCompletedStatTile;
