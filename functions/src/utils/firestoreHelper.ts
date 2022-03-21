/** @format */

import * as admin from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();

const timestamp = admin.firestore.Timestamp;
const FieldValue = admin.firestore.FieldValue;

export { admin, timestamp, FieldValue };

export default db;
