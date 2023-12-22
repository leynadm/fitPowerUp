import toast from "react-hot-toast";
import InfoIcon from '@mui/icons-material/Info';
interface BodyKPIIndicatorProps{
    KPIValue:number,
    leftPosition:number;
    topPosition:number;
    indicatorLineWidth:number;
    bodyPart:string;
    unitsSystem:string
}

function BodyKPIIndicatorLeft({KPIValue,leftPosition,topPosition,indicatorLineWidth,bodyPart,unitsSystem}:BodyKPIIndicatorProps){

  function handleClickBodypart(bodyPart:string){
    toast(`${bodyPart} - ${KPIValue} ${unitsSystem}`, {
      icon: <InfoIcon fontSize="small"/>,
    });
  }
    return(
        <div
        onClick={()=>handleClickBodypart(bodyPart)}
        style={{
          position: "absolute",
          left: `${leftPosition}%`,
          top: `${topPosition}%`,
          fontSize: "12px",
          fontWeight: "300",
          display: "flex",
          alignItems: "center",
        }}
      >
        <span
          style={{
            verticalAlign: "middle",
            background:"orange",
            borderRadius:"25px",
            paddingLeft:"4px",
            paddingRight:"4px"
            
          }}
        >
          {KPIValue} {unitsSystem}
        </span>
        <div
          style={{
            display: "inline-block", // Make sure the line is in the same line as the text
            verticalAlign: "middle", // Align the line with the middle of the text
            height: "1px",
            background: "black",
            width: `${indicatorLineWidth}px`, // Adjust line width as necessary
            marginLeft: "4px", // Spacing between the number and the line
          }}
        ></div>
      </div>
    )

}

export default BodyKPIIndicatorLeft