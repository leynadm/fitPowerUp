import React, { useState, useContext, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import convertTimestamp from "../../utils/socialFunctions/convertTimestamp";
import getTimeDifference from "../../utils/socialFunctions/getTimeDifference";
import ReplyIcon from "@mui/icons-material/Reply";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import { Timestamp } from "firebase/firestore";
import { AuthContext } from "../../context/Auth";
import { db } from "../../config/firebase";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  collection,
  setDoc,
  doc,
  serverTimestamp,
  arrayUnion,
  updateDoc,
  getDoc,
  arrayRemove,
  onSnapshot,
} from "firebase/firestore";

interface PostCommentProps {
  reply: any;
  postId: string;
  commentId: string;
  getPostComments: () => void;
}

function PostReply({
  reply,
  postId,
  commentId,
  getPostComments,
}: PostCommentProps) {
  const { currentUser, currentUserData } = useContext(AuthContext);

  function deleteReply() {
    const postRef = doc(db, "posts", postId);
    const commentDocRef = doc(postRef, "comments", "commentDoc");

    updateDoc(commentDocRef, {
      [`${commentId}.replies`]: arrayRemove(reply),
    })
      .then(() => {
        console.log("Reply deleted successfully");
        getPostComments();
      })
      .catch((error) => {
        console.error("Error deleting reply:", error);
      });
  }

  return (
    <div>
      <Paper elevation={0} style={{ padding: "1rem 0.25rem 0.25rem 0.25rem" }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar alt="Remy Sharp" src={reply.profileImage} />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h6 style={{ margin: 0, textAlign: "left" }}>
                {reply.name} {reply.surname}
              </h6>
              {reply.userId === currentUser.uid && (
                <IconButton onClick={deleteReply}>
                  <MoreVertIcon sx={{ fontSize: "smaller" }} />
                </IconButton>
              )}
            </Box>

            <p style={{ textAlign: "left", fontSize: "medium" }}>
              {reply.content}
            </p>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box sx={{ display: "flex", gap: 3 }}>
                <p
                  style={{
                    textAlign: "left",
                    color: "gray",
                    fontSize: "small",
                  }}
                >
                  {getTimeDifference(reply.timestamp)}
                </p>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default PostReply;
