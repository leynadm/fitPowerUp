import { feats } from "../../utils/checkUserFeats";
import { ref, uploadString } from "firebase/storage";
import { storage } from "../../config/firebase";

function pushToStorage() {
    const featsString = JSON.stringify(feats);

    const featsRef = ref(storage, "assets/files/featsJSONString.json");

    uploadString(featsRef, featsString).then((snapshot) => {
      console.log("Uploaded");
    });
  }

  export default pushToStorage