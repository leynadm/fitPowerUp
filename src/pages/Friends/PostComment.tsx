import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import convertTimestamp from "../../utils/socialFunctions/convertTimestamp";
import getTimeDifference from "../../utils/socialFunctions/getTimeDifference";
interface UserWorkoutCardProps {
  comment: any;
}

function PostComment({ comment }: any) {
  return (
    <div>
    <Paper elevation={0}  style={{ padding: "1rem 0.25rem" }}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar alt="Remy Sharp" src={comment.profileImage} />
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <h6 style={{ margin: 0, textAlign: "left" }}>{comment.name} {comment.surname}</h6>
          <p style={{ textAlign: "left",fontSize:"medium" }}>{comment.content}</p>
          <p style={{ textAlign: "left", color: "gray", fontSize:"small" }}>
            {getTimeDifference(comment.timestamp)}
          </p>
        </Grid>
      </Grid>

    </Paper>
            <Divider variant="fullWidth" style={{ margin: "1px 0" }} />
            </div>
  );
}

export default PostComment;
