import Box from "@mui/material/Box";

interface DataBadgeProps {
  dataValue: number;
  dataLabel: string;
}

function DataBadge({ dataValue, dataLabel }: DataBadgeProps) {
  return (
    <>
      <Box
        display="flex"
        gap={1}
        sx={{
          backgroundColor: "#520975",
          color: "white",
          borderRadius: "4px",
          padding: "1px 4px 1px 4px",
        }}
      >
        <div className="secondary-font" style={{ fontWeight: "bold",fontSize:"1.25rem" }}>{dataValue}</div>
        <div style={{fontSize:"1.25rem",color:"orange"}}>{dataLabel}</div>
      </Box>
    </>
  );
}

export default DataBadge;
