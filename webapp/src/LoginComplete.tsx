/** @format */

import React, { useEffect, useState } from "react";

import {
  getAuth,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { EMAIL_FOR_SIGNIN, ORIGINAL_DESTINATION } from "./constants";

const auth = getAuth();

export default function LoginComplete() {
  const [working, setWorking] = useState(true);
  const [destination, setDestination] = useState<string | null>(null);

  const nav = useNavigate();

  useEffect(() => {
    let email = window.localStorage.getItem(EMAIL_FOR_SIGNIN);
    if (isSignInWithEmailLink(auth, window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = String(
          window.prompt("Please provide your email for confirmation")
        );
      }

      // The client SDK will parse the code from the link for you.
      signInWithEmailLink(auth, email, window.location.href)
        .then((r) => {
          // Clear email from storage.
          window.localStorage.removeItem(EMAIL_FOR_SIGNIN);
          // You can access the new user via result.user
          // Additional user info profile not available via:
          // result.additionalUserInfo.profile == null
          // You can check if the user is new or existing:
          // result.additionalUserInfo.isNewUser
          const originalDestination =
            window.localStorage.getItem(ORIGINAL_DESTINATION);

          setDestination(originalDestination);
          setWorking(false);
        })
        .catch((error) => {
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
          console.log({ error });
        });
    } else {
      console.log("Not logged in");
      // window.localStorage.removeItem("emailForSignIn");
    }
  }, []);

  if (working) return <h2>Logging in...</h2>;

  if (destination) {
    return <div>You are now logged in... redirecting to ${destination}</div>;
  }

  return <h2>something went wrong</h2>;
}
