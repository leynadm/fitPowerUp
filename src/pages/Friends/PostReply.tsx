import React, { useState, useContext } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import getTimeDifference from "../../utils/socialFunctions/getTimeDifference";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { AuthContext } from "../../context/Auth";
import { db } from "../../config/firebase";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteReplyModal from "../../components/ui/DeleteReplyModal";
import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import toast from "react-hot-toast";
interface PostCommentProps {
  reply: any;
  postId: string;
  commentId: string;
  getPostComments: () => void;
  postUserId: string;
}

function PostReply({
  reply,
  postId,
  commentId,
  getPostComments,
  postUserId,
}: PostCommentProps) {
  const { currentUser} = useContext(AuthContext);

  const [deleteReplyModalOpen, setDeleteReplyModalOpen] = useState(false);

  function deleteReply() {
    const postRef = doc(db, "posts", postId);
    const commentDocRef = doc(postRef, "comments", "commentDoc");

    updateDoc(commentDocRef, {
      [`${commentId}.replies`]: arrayRemove(reply),
    })
      .then(() => {

        getPostComments();
        setDeleteReplyModalOpen(!deleteReplyModalOpen);
      })
      .catch((error) => {
        toast.error("Oops, deleteReply has an error!")
        console.error("Error deleting reply:", error);
      });
  }

  function handleDeleteReplyClick() {
    setDeleteReplyModalOpen(!deleteReplyModalOpen);
  }

  return (
    <div>
      <DeleteReplyModal
        deleteReplyModalOpen={deleteReplyModalOpen}
        setDeleteReplyModalOpen={setDeleteReplyModalOpen}
        deleteReply={deleteReply}
      />
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

              {/* 
              <Link
                to={`/home/friends/results/u/${reply.userId}`}
                style={{ textDecoration: "none", color: "black" }}
              >  */}

              <h6 style={{ margin: 0, textAlign: "left" }}>
                {reply.name} {reply.surname}
              </h6>
{/* 
              </Link>
 */}
              {(reply.userId === currentUser.uid ||
                postUserId === currentUser.uid) && (
                <IconButton onClick={handleDeleteReplyClick}>
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
