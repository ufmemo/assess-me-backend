/** @format */

import React from "react";

import firebaseApp from "./init";

import { BrowserRouter } from "react-router-dom";
import Router from "./Router";

export default function App() {
  return (
    <BrowserRouter>    
      <Router />
    </BrowserRouter>
  );
}
