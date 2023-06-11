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
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import { Timestamp } from "firebase/firestore";
import { AuthContext } from "../../context/Auth";
import { db } from "../../config/firebase";
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

interface UserWorkoutCardProps {
  comment: any;
  commentIndex: number;
  postId: string;
  commentId:string
}

interface ExpandRepliesProps extends IconButtonProps {
  expandReplies: boolean;
}
const ExpandReplies = styled((props: ExpandRepliesProps) => {
  const { expandReplies, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expandReplies }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function PostComment({ comment, commentIndex, postId,commentId }: UserWorkoutCardProps) {
  const { currentUser, currentUserData } = useContext(AuthContext);
  const [expandedReplies, setExpandedReplies] = useState(false);
  const [replyText, setReplyText] = useState("");
  const handleExpandRepliesClick = () => {
    setExpandedReplies(!expandedReplies);
  };

  useEffect(() => {
    console.log('logging comment')
    console.log(commentIndex)
    console.log(commentId);
  }, []);


  function addReply() {
    if (replyText !== "") {
      const postRef = doc(db, "posts", postId);
      const serverTimestampObj = serverTimestamp();
      const timestamp = Timestamp.fromMillis(Date.now());
      const commentsCollectionRef = collection(postRef, "comments");
      const commentDocRef = doc(commentsCollectionRef, "commentDoc"); // Provide the desired ID for the comment document

      const mapFieldToUpdate = commentId;
      const arrayFieldToAdd = "replies";
      const valueToAdd = ["value1", "value2", "value3"];
      
      const newReply = {
        content: replyText,
        userId: currentUser.uid,
        timestamp: timestamp,
        name: currentUserData.name,
        surname: currentUserData.surname,
        profileImage: currentUserData.profileImage,
      };
/* 
      updateDoc(commentDocRef, {
        replies: arrayUnion(newReply)
      })
 */
    
      // Update the document to add the new array field to the map field
      updateDoc(commentDocRef, {
        [`${mapFieldToUpdate}.${arrayFieldToAdd}`]: arrayUnion(newReply),
      }) 
        .then(() => {
          console.log("Array field added to the map successfully");
        })
        .catch((error) => {
          console.error("Error adding array field to the map:", error);
        });
    }
  }

  return (
    <div>
      <Paper elevation={0} style={{ padding: "1rem 0.25rem" }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar alt="Remy Sharp" src={comment.profileImage} />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h6 style={{ margin: 0, textAlign: "left" }}>
              {comment.name} {comment.surname}
            </h6>
            <p style={{ textAlign: "left", fontSize: "medium" }}>
              {comment.content}
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
                  {getTimeDifference(comment.timestamp)}
                </p>

                <ExpandReplies
                  expandReplies={expandedReplies}
                  onClick={handleExpandRepliesClick}
                  aria-expanded={expandedReplies}
                  aria-label="show more"
                  style={{
                    textAlign: "left",
                    color: "gray",
                    fontSize: "small",
                  }}
                >
                  Reply
                </ExpandReplies>
              </Box>
              <Box>
                <Collapse in={expandedReplies} timeout="auto" unmountOnExit>
                  <Divider sx={{ width: "100%" }} />
                  <CardContent sx={{ ":last-child": { padding: 0 } }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                      }}
                    >
                      <TextField
                        multiline
                        id="input-with-sx"
                        label="Reply to the comment"
                        variant="standard"
                        sx={{ width: "100%" }}
                        onChange={(e) => setReplyText(e.target.value)}
                        value={replyText}
                      />
                      <IconButton onClick={addReply}>
                        <ReplyIcon
                          sx={{ color: "action.active", mr: 1, my: 0.5 }}
                        />
                      </IconButton>
                    </Box>

                    <Box sx={{ margin: 0, padding: 0 }}>
                      {comment.replies &&
                        comment.replies
                          .slice()
                          .reverse()
                          .map((reply: any, index: number) => (
                            <Box sx={{ margin: 0, padding: 0 }} key={index}>
                              <p>{reply.content}</p>
                              {/*   
                    <PostReply comment={comment} />
                   */}
                            </Box>
                          ))}
                    </Box>
                  </CardContent>
                </Collapse>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <Divider variant="fullWidth" style={{ margin: "1px 0" }} />
    </div>
  );
}

export default PostComment;
