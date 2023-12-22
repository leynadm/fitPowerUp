import getUserDocumentById from "./getUserDocumentById";
import toast from "react-hot-toast";
import User from "../interfaces/User";

async function fetchFriendsOverview(
  spottingIdsArr:string[]) {
  try {
    const tempData: User[] = []; // Copy the existing array

    console.log('fetching friends overview')
    for (const docId of spottingIdsArr) {
      try {
        const documentData = await getUserDocumentById(docId);

        if (documentData) {
            tempData.push(documentData as User);
          } 

      } catch (error) {
        toast.error("Oops, Error fetching data for user with specific ID!");
        // Handle the error for an individual user document fetch
        console.error(`Error fetching data for user with ID ${docId}:`, error);
        // You can choose to continue with the loop and skip the problematic user
        // or handle it in a way that fits your specific use case.
      }
    }

    return tempData;
  } catch (error) {
    toast.error("Oops, fetchUserIndividualFollowingData has an error!");
    // Handle any other unexpected errors that might occur during the function execution
    console.error("An unexpected error occurred:", error);
    // You can show a user-friendly error message or take appropriate actions.
  }
}

export default fetchFriendsOverview;
