import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBpMz4zSFMb6gFzN0bcAR7Zm_gAHGTMb8Q",
    authDomain: "shaped-approach-443217-q1.firebaseapp.com",
    projectId: "shaped-approach-443217-q1",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const logVisit = async (userInfo) => {
  try {
    await addDoc(collection(db, "visits"), {
      email: userInfo.email,
      name: userInfo.name,
      accessTime: new Date(),
    });
    console.log("Visit logged successfully");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
