import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Box from "@mui/material/Box";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import User from "../../utils/interfaces/User";
import VerifiedIcon from "@mui/icons-material/Verified";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Link } from "react-router-dom";
import { ReactComponent as StrengthIcon } from "../../assets/strength.svg";
import { ReactComponent as ExperienceIcon } from "../../assets/gym.svg";
import { ReactComponent as PowerLevelIcon } from "../../assets/powerlevel.svg";
import LoadingCircle from "../../components/ui/LoadingCircle";
import toast from "react-hot-toast";
interface UserData {
  id: string;
  [key: string]: any; // Add this if there are other properties in the user data object.
}

interface SearchProfileProps {
  queriedUser: User | undefined;
}

function SearchUserProfileFollowers({ queriedUser }: SearchProfileProps) {
  const location = useLocation();
  const userIndividualFollowers = location.state.userIndividualFollowers;
  const [userIndividualFollowersData, setUserIndividualFollowersData] =
    useState<UserData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasFollowers, setHasFollowers] = useState(false);

  const resultsPerPage = 5;

  useEffect(() => {
    fetchUserIndividualFollowersData();
  }, [currentPage]);

  async function getUserDocumentById(documentId: any) {
    try {
      const documentRef = doc(db, "users", documentId); // Replace with your collection name

      const snapshot = await getDoc(documentRef);

      if (snapshot.exists()) {
        const documentData = snapshot.data();
        return { ...documentData, id: snapshot.id };
      }
      return null;
    } catch (error) {
      toast.error("Oops, getUserDocumentById has an error!");
      // Handle the error here
      console.error("Error fetching user document:", error);
      // You can also show a user-friendly error message to the user
      // For example: setErrorState("Failed to fetch user data. Please try again later.");
      return null; // Return null or an empty object to indicate that there was an error.
    }
  }

  async function fetchUserIndividualFollowersData() {
    try {
      setLoading(true);
      const startIdx = (currentPage - 1) * resultsPerPage;
      const endIdx = startIdx + resultsPerPage;

      const tempData: UserData[] = [...userIndividualFollowersData]; // Copy the existing array

      for (const docId of userIndividualFollowers.slice(startIdx, endIdx)) {
        try {
          const documentData = await getUserDocumentById(docId);
          if (documentData) {
            tempData.push(documentData);
          }
        } catch (error) {
          toast.error("Oops, fetchUserIndividualFollowersData has an error!")
          // Handle the error for an individual user document fetch
          console.error(
            `Error fetching data for user with ID ${docId}:`,
            error
          );
          // You can choose to continue with the loop and skip the problematic user
          // or handle it in a way that fits your specific use case.
        }
      }

      if (tempData.length > 0) {
        setHasFollowers(true);
      }

      setUserIndividualFollowersData(tempData);
      setLoading(false);
    } catch (error) {
      toast.error("Oops, fetchUserIndividualFollowersData has an error!");
      // Handle any other unexpected errors that might occur during the function execution
      console.error("An unexpected error occurred:", error);
      // You can show a user-friendly error message or take appropriate actions.
    }
  }

  if (loading && !hasFollowers) {
    return (
      <Box
        sx={{
          paddingBottom: "56px",
          marginTop: "8px",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <LoadingCircle />
      </Box>
    );
  }

  return (
    <>
      {hasFollowers ? (
        <Box>
          {queriedUser?.hideFollowers ? (
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Typography sx={{ textAlign: "center" }}>
                {queriedUser.name} {queriedUser.surname} has decided to keep its
                followers private.
              </Typography>
            </Box>
          ) : (
            <Box sx={{ paddingBottom: "56px" }}>
              {userIndividualFollowersData.map((user, index) => (
                <Box
                  key={index}
                  sx={{
                    paddingTop: "8px",
                    margin: 0,
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    boxShadow: 1,
                  }}
                >
                  <List
                    sx={{
                      width: "100%",
                      bgcolor: "background.paper",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      alignSelf: "center",
                      justifySelf: "center",
                    }}
                  >
                    <ListItem
                      alignItems="flex-start"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          sx={{ flexGrow: 1 }}
                          alt="Remy Sharp"
                          src={user.profileImage}
                        />
                      </ListItemAvatar>

                      <Link
                        to={`/home/friends/results/u/${user.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Typography
                          sx={{
                            flexGrow: 1,
                            alignSelf: "center",
                            fontSize: "large",
                            fontWeight: "bold",
                            color: "black",
                            display: "flex",
                            gap: 1,
                            alignItems: "center",
                          }}
                        >
                          {`${user.name} ${user.surname}`}
                          {user.verified && (
                            <VerifiedIcon
                              sx={{
                                color: "#3f51b5",
                                width: "1rem",
                                height: "1rem",
                              }}
                            />
                          )}
                        </Typography>

                        {user.hidePowerLevel ||
                        (user.powerLevel === undefined &&
                          user.strengthLevel === undefined &&
                          user.experienceLevel === undefined) ? (
                          <Typography sx={{ textDecoration: "none" }}>
                            Unknown Power Level
                          </Typography>
                        ) : (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "1.25rem",
                                display: "flex",
                                gap: 1,
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <PowerLevelIcon
                                width="1.35rem"
                                height="1.35rem"
                              />
                              {user.powerLevel}
                            </Typography>{" "}
                            <Typography
                              sx={{
                                fontSize: "1.25rem",
                                display: "flex",
                                gap: 1,
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <StrengthIcon width="1.15rem" height="1.15rem" />
                              {user.strengthLevel}
                            </Typography>{" "}
                            <Typography
                              sx={{
                                fontSize: "1.25rem",
                                display: "flex",
                                gap: 1,
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <ExperienceIcon
                                width="1.15rem"
                                height="1.15rem"
                              />
                              {user.experienceLevel}
                            </Typography>{" "}
                          </Box>
                        )}
                      </Link>
                      <Box
                        sx={{
                          flexGrow: 1,
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                        }}
                      ></Box>
                    </ListItem>
                  </List>
                </Box>
              ))}

              <Button
                sx={{ width: "100%", textAlign: "center", marginBottom: "8px" }}
                onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                disabled={
                  userIndividualFollowers.length <= currentPage * resultsPerPage
                }
              >
                Load More
              </Button>
            </Box>
          )}
        </Box>
      ) : (
        <Box
          sx={{
            paddingBottom: "56px",
            marginTop: "8px",
            textAlign: "center",
            height: "100%",
          }}
        >
          <Typography sx={{ height: "100%" }}>
            No spotters currently.
          </Typography>
        </Box>
      )}
    </>
  );
}

export default SearchUserProfileFollowers;
