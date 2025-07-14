import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "../../../serviceAccountKey.json";

if (getApps().length === 0) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

export const firestore = getFirestore();
