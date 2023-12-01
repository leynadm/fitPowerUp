import Typography from "@mui/material/Typography";

function DevelopmentLog() {
    return (
        <>
            <Typography variant="h5" gutterBottom>
                Development Log
            </Typography>

            <Typography variant="h6">
                Version 1
            </Typography>
            <Typography>
                - Implemented local storage of exercises for quick access and data persistence.
            </Typography>
            <Typography>
                - Added user profile creation feature, enabling users to build and display their social profiles.
            </Typography>
            <Typography>
                - Introduced a new feature to highlight exercises when users achieve a new personal record (PR).
            </Typography>
            <Typography>
                - Integrated a power level calculator using the DOTS coefficient in powerlifting, allowing users to measure their strength progress.
            </Typography>

            {/* Add information about version 2 here in a similar format when ready */}

        </>
    );
}

export default DevelopmentLog;
