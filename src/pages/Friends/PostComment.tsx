import React, { useState, useContext } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import getTimeDifference from "../../utils/socialFunctions/getTimeDifference";
import ReplyIcon from "@mui/icons-material/Reply";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import { Timestamp, deleteField } from "firebase/firestore";
import { AuthContext } from "../../context/Auth";
import { db } from "../../config/firebase";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteCommentModal from "../../components/ui/DeleteCommentModal";
import { Link } from "react-router-dom";
import addNotificationEntry from "../../utils/socialFunctions/addNotificationEntry";
import {
  collection,
  doc,
  serverTimestamp,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";
import PostReply from "./PostReply";
import toast from "react-hot-toast";
interface UserWorkoutCardProps {
  comment: any;
  commentIndex: number;
  postId: string;
  commentId: string;
  getPostComments: () => void;
  postUserId: string;
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

function PostComment({
  comment,
  commentIndex,
  postId,
  commentId,
  getPostComments, 
  postUserId,
}: UserWorkoutCardProps) {
  const { currentUser, currentUserData } = useContext(AuthContext);
  const [expandedReplies, setExpandedReplies] = useState(false);
  const [replyText, setReplyText] = useState("");
  const handleExpandRepliesClick = () => {
    setExpandedReplies(!expandedReplies);
  };

  const [deleteCommentModalOpen, setDeleteCommentModalOpen] = useState(false);

  function addReply() {


    if (currentUser.emailVerified === false) {
      toast("Please verify your email before!")
      return;
    }


    if (replyText !== "") {
      const postRef = doc(db, "posts", postId);
      const serverTimestampObj = serverTimestamp();
      const timestamp = Timestamp.fromMillis(Date.now());
      const commentsCollectionRef = collection(postRef, "comments");
      const commentDocRef = doc(commentsCollectionRef, "commentDoc"); // Provide the desired ID for the comment document
      const mapFieldToUpdate = commentId;
      const arrayFieldToAdd = "replies";

      const newReply = {
        content: replyText,
        userId: currentUser.uid,
        timestamp: timestamp,
        name: currentUserData.name,
        surname: currentUserData.surname,
        profileImage: currentUserData.profileImage,
      }; 
 
      const action = "replied to one of your comments!";
      // Update the document to add the new array field to the map field
      updateDoc(commentDocRef, {
        [`${mapFieldToUpdate}.${arrayFieldToAdd}`]: arrayUnion(newReply),
      })
        .then(() => {

          setReplyText("");
          getPostComments();
          if(postUserId!==currentUser.uid){
            addNotificationEntry(
              postUserId,
              action,
              currentUser.uid,
              currentUserData.name,
              currentUserData.surname,
              postId,
              currentUserData.profileImage
            )
          }


        })
        .catch((error) => {
          toast.error("Oops, addReply has an error!")
          console.error("Error adding array field to the map:", error);
        });
    }
  }

  function deleteComment() {
    const postRef = doc(db, "posts", postId);
    const commentDocRef = doc(postRef, "comments", "commentDoc");

    updateDoc(commentDocRef, {
      [commentId]: deleteField(),
    })
      .then(() => {
        getPostComments();
        setDeleteCommentModalOpen(!deleteCommentModalOpen);
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
      });
  }

  function handleDeleteCommentClick() {
    setDeleteCommentModalOpen(!deleteCommentModalOpen);
  }

  return (
    <div>
      <DeleteCommentModal
        deleteCommentModalOpen={deleteCommentModalOpen}
        setDeleteCommentModalOpen={setDeleteCommentModalOpen}
        deleteComment={deleteComment}
      />
      <Paper elevation={0} style={{ padding: "1rem 0 0" }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar alt="Remy Sharp" src={comment.profileImage} />
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
              {/* 
              <Link
                to={`/home/friends/results/u/${comment.userId}`}
                style={{ textDecoration: "none", color: "black" }}
              > */}
                <h6 style={{ margin: 0, textAlign: "left",fontFamily:"Acme" }}>
                  {comment.name} {comment.surname}
                </h6>
                {/* 
              </Link> */}

              {(comment.userId === currentUser.uid ||
                postUserId === currentUser.uid) && (
                <IconButton onClick={handleDeleteCommentClick}>
                  <MoreVertIcon sx={{ fontSize: "smaller" }} />
                </IconButton>
              )}
            </Box>

            <p style={{ textAlign: "left", fontSize: "medium" }}>
              {comment.content}
            </p>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
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
                   
                  {comment.replies && comment.replies.length===0&&'Be first to reply'}
                  {comment.replies && comment.replies.length>0? `Replies (${comment.replies.length})`:'Reply'}

                </ExpandReplies>
              </Box>
              <Box>
                <Collapse in={expandedReplies} timeout="auto" unmountOnExit>
                  <Divider sx={{ width: "100%" }} />
                  <CardContent sx={{ ":last-child": { padding:0  } }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        paddingTop:"8px"
                      }}
                    > 
                      <TextField
                        multiline
                        id="input-with-sx"
                        label="Reply to the comment"
                        className="dbz-subvariant"
                        sx={{ width: "100%",fontFamily:"Acme" }}
                        size="small"
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
                              <PostReply
                                reply={reply}
                                postId={postId}
                                commentId={commentId}
                                getPostComments={getPostComments}
                                postUserId={postUserId}
                              />
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
      <Divider variant="fullWidth" style={{ margin: "0px 0 " }} />
    </div>
  );
}

export default PostComment;
