import toast from "react-hot-toast";
import { Dispatch,SetStateAction } from "react";
function getExistingComment(idExerciseUpdate: number,setCommentValue:Dispatch<SetStateAction<string>>,setIsDropset:Dispatch<SetStateAction<boolean>>,setIsAMRAP:Dispatch<SetStateAction<boolean>>) {
    const request = window.indexedDB.open("fitPowerUpDb");
    request.onsuccess = function (event: any) {
      const db = event.target.result;
      const transaction = db.transaction("user-exercises-entries", "readwrite");
      const objectStore = transaction.objectStore("user-exercises-entries");

      const getRequest = objectStore.get(idExerciseUpdate);

      getRequest.onsuccess = function (event: any) {
        const data = event.target.result;
        if (data) {
          if (data.comment === undefined) {
            setCommentValue("");
          } else {
            setCommentValue(data.comment);
          }
          setIsDropset(data.dropset);
          setIsAMRAP(data.amrap)
        } else {
        }
      };

      transaction.oncomplete = function () {};
      transaction.onerror = function () {
        toast.error("Oops, getExistingComment has an error!");
      };
    };

    request.onerror = function () {
      toast.error("Oops, couldn't open the database!");
    };
  }
export default getExistingComment