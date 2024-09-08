import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
function NoAvailableDataBox() {
  return (
    <>
      <SearchIcon fontSize="large" sx={{color:"black"}} />
      <Typography color="black">There is no available data yet.</Typography>
      </>
  );
}

export default NoAvailableDataBox