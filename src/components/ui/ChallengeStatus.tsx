import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';

function ChallengeStatus({ status }: { status: string | undefined }) {
  const getStatusColors = () => {
    switch (status) {
      case 'not started':
        return { backgroundColor: 'lightblue', color: 'white' };
      case 'finished':
        return { backgroundColor: 'green', color: 'white' };
      case 'in progress':
        return { backgroundColor: 'orange', color: 'black' };
      default:
        return { backgroundColor: 'grey', color: 'white' };
    }
  };

  const statusColors = getStatusColors();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={1}
      width="100%"
    >
      <Typography
        sx={{ ...statusColors, borderRadius: '4px', p: '4px' }}
      >
        {status?.toUpperCase() || 'STATUS UNKNOWN'}
      </Typography>

      <HourglassTopIcon fontSize="small" />
    </Box>
  );
}

export default ChallengeStatus;
