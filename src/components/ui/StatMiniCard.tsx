import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
interface ParentProps{
    statTitle:string;
    statValue:number|string;
    statDetail:string;
}

function StatMiniCard({statTitle,statValue,statDetail}:ParentProps){

    return (
      <>
        <Box
          style={{
            boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
            padding: "1rem",
          }}
        >
          <Typography style={{ textAlign: "center",fontWeight:400 }}>{statTitle}</Typography>
          <Typography style={{ textAlign: "center", fontSize: "1.75rem" }} >
            {statValue} {statDetail}
          </Typography>
        </Box>
      </>
    );
}

export default StatMiniCard