import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import type { ServiceAccount } from "firebase-admin/app";

const serviceAccount = {
   "type": "service_account",
   "project_id": "website-5a18c",
   "private_key_id": "75c34299fb2c647ca68e3b26df091fc253910cda",
   "private_key": "-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCpKpTaLictFx+E
JDeJCOI1cE3KsqRG3JxjdBVfkqcRZy+Z7YQ6TGuM8yJrZndGncRvpmIwcLh/f79o
T/ycTeANTrLq9As258MNCp6rb+amTsR0/yYyXhORpV74gg5ApgPURa5hxdUkrKlM
25VfYwdrbu8Dx70Fr1uEQjK+S6rwgsn6rwymf+t5uzjFemp62idRgfxlT3W8xM5K
+cJfOLCVkbbc1ueYk+e8sRUQR97v37z/YeRKETVriE6ZtnYiDEEPwNzjU/lrPlkv
sXw1BcIDBhq211s4uvE5/RU398lvbYg8HZvTsvaAiOe8ggxAdq4y9Uafc+44w9q6
s3mBFY1jAgMBAAECggEAG/I3j6j65S1iEie+2kSSxNaTWLO/r8qCNhaB8Wf+HEHk
+z43Dz/Qr1hQjK2WHB8JdJMSutiO94Et0xhjrZlaii2WISUaioIpwYh07fLD3SA7
aZiSbCpee+Z16gKSQtvU23HSJ798QV1vb+MBVOC8jmL6hAVbP1/YyTX7wV7UE9Hs
0Jear+lTEFVFDwBYJuYnIiZSCr1/Bu77oWH401B0Ynni/iExkvlgE+1KLHr7Gg2C
8uCMf4NFyVaPOrUpZRsRBpqPInqHsSoMdyQyXeFb8l+P+kr531SlCpJSJ78gFo/P
6UKjFUddXfsH3JuSTh7OiNNC8tA/P0wZLc5eA8QeAQKBgQDsW+09sub92r363B1f
1FDiAvHCAy0GlZunEsX3/GoiOAQzMZjS1NMYl5pou1Qitdd8mDZOuIXM9HkdWoQ6
7eKqvB2d/chz07M4LFHNPvLlC9RWCxfNPgIhaFd+EU5lGtzlah5vbDxxJctsMu3Y
q9m480MDw3tQi63WRf2kQJz6uQKBgQC3OULty+eMquYJWXjeV2FXRSpcB3k30BEh
ycm+iGuBTpY2bVm0spiCKA0iQ63xtCdYWrqbHagJFMf9o3mC+AeE4l7ip8aNYupF
TeNeM+eguUFZn8LcbWO2HIHaYYYmBkEI4TIU4w3qHWEIeNn3ElEeryI4H10TWJPM
m6AddiSK+wKBgCB71dQn9UUoPfnvLH5SILefLfi7FQIVp6nDk7+sSi3fwvwCMf2v
0D9N/qOsMzj+AtqV1Mjm5USwyMB3AztSHFfYuL1Q9q6shrIOrUNnBlziTlFw/tlv
Tz2mKHgkCsEsevVwqzQnDPuD9Twul6+ylp6rmCc5Q4ZjXAXZ4q0jUC/JAoGAVuK6
kFWPWi94opphLN629FGCQt3wZ70tQp6UItxCTrFbnjfAwGWo2J/xinwZsnLB7a4o
q4Imuxe1ttuctbS0rBlE8aqqB0YO3gqPdY6bmqX/DWcrWqgtDqD6GvsASGvSz0kr
HKiHYqvH5eKZSgbPnQNj8MU+t/vbKr3p8c6iiZ0CgYBJNGQ9Tvq3zhmfvy9mJ5Vx
RpovmZh9oTzsBHeOyZ8S9GrLky8QfNvanusaTAIG7IaHqreKNaopNDN/kyJKRrK7
EiHwBKHX72OOy+mRPBE4h5CbS6YYhrv51athT8iOJucoElPxgEAanL9IzEm+B1mb
qFQcqUFmINQ7QORQ86W88w==
-----END PRIVATE KEY-----
",
   "client_email": "firebase-adminsdk-fbsvc@website-5a18c.iam.gserviceaccount.com",
   "client_id": "101544557188752295398",
   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
   "token_uri": "https://oauth2.googleapis.com/token",
   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40website-5a18c.iam.gserviceaccount.com",
   "universe_domain": "googleapis.com"
} as ServiceAccount


if (getApps().length === 0) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

export const firestore = getFirestore();