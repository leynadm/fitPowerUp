import Box from "@mui/material/Box";

interface DataBadgeProps{
    dataValue:number;
    dataLabel:string
}

function DataBadge({dataValue,dataLabel}:DataBadgeProps){


    return(
        <>
        <Box display="flex" gap={1} sx={{
            backgroundColor:"#520975",
            color:"white",
            borderRadius:"4px",
            padding:"2px 8px 2px 8px"
        }}>
            <div style={{fontWeight:"bold"}}>{dataValue}</div>
            <div>{dataLabel}</div>
        </Box>
        </>
    )

}

export default DataBadge