/** @format */

import { logger } from "firebase-functions";
import db, { FieldValue } from "../utils/firestoreHelper";

import ShortUniqueId from "short-unique-id";

const uidGenerator = new ShortUniqueId({ length: 10 });

const COLLECTION = "records";
const collection = db.collection(COLLECTION);

/**
 * Write Record to Firestore
 * @param {record}
 * @returns
 */
export async function writeRecord(
  record: any
): Promise<{ id: string; uuid: string }> {
  if (record === undefined) {
    throw Error("createEvent Failed: missing event object");
  }

  const uuid = uidGenerator();
  const localRecord = {
    ...record,
    uuid,
    createdAt: FieldValue.serverTimestamp(),
  };

  logger.info("Writing record", localRecord);

  const eventRef = await collection.add(localRecord);

  logger.info("Completed writing", localRecord);

  return { uuid, id: eventRef.id };
}
