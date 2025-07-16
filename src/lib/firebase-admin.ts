import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import type { ServiceAccount } from "firebase-admin/app";

const serviceAccount = {
  type: process.env.SA_TYPE,
  project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  private_key_id: process.env.SA_PRIVATE_KEY_ID,
  private_key: process.env.SA_PRIVATE_KEY?.replace(/
/g, '
'),
  client_email: process.env.SA_CLIENT_EMAIL,
  client_id: process.env.SA_CLIENT_ID,
  auth_uri: process.env.SA_AUTH_URI,
  token_uri: process.env.SA_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.SA_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.SA_CLIENT_X509_CERT_URL,
} as ServiceAccount;


if (getApps().length === 0) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

export const firestore = getFirestore();
