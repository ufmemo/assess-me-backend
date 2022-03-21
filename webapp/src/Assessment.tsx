/** @format */

import React, { useEffect, useState } from "react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "./init";

export default function Assessment() {
  const [data, setData] = useState<any>(null);
  const [err, setErr] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "results"));
        querySnapshot.forEach((doc) => {
          setData(doc.data());
        });
      } catch (e: any) {
        setErr(e.message);
      }
    })();
  }, []);

  if (err) {
    return (
      <div>
        <h2>{err}</h2>
      </div>
    );
  }

  return (
    <div>
      <h2>Assessment</h2>
      {JSON.stringify(data, null, 2)}
    </div>
  );
}
