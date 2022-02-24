/** @format */

import React, { useEffect, useState } from "react";

import { Routes, Route, useNavigate } from "react-router-dom";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import LoginStart from "./LoginStart";
import LoginComplete from "./LoginComplete";
import Assessment from "./Assessment";
import { ORIGINAL_DESTINATION } from "./constants";

export default function Router() {
  const [isLoggedin, setIsLoggedIn] = useState(false);

  const nav = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user is logged in", { user });
        setIsLoggedIn(true);

        const originalDestination =
          window.localStorage.getItem(ORIGINAL_DESTINATION);

        if (originalDestination) {
          console.log({ originalDestination });
          window.localStorage.removeItem(ORIGINAL_DESTINATION);
          nav(originalDestination);
        }
      } else {
        setIsLoggedIn(false);
        console.log("User is not logged in...");
      }
    });
  }, []);

  if (!isLoggedin) {
    return (
      <Routes>
        <Route path='/login2' element={<LoginComplete />} />
        <Route path='*' element={<LoginStart />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/assessment/:id' element={<Assessment />} />
      <Route path='*' element={<NotFoundRouter />} />
    </Routes>
  );
}

function NotFoundRouter() {
  return <h2>Not found</h2>;
}

function Home() {
  return <h2>Home</h2>;
}
