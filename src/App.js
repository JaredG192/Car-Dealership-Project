/*
  App.js

  Purpose:
  - Root component of the React application
  - Acts as the main controller for rendering pages
  - Connects the entry point (index.js) to the homepage
  - Later: will manage routing between multiple pages

  Project:
  Car Dealership Management System

  Author: Jared Gonzalez
  Role: Frontend Developer
*/

import React from "react";
import Homepage from "./components/homepage";

/*
  App Component

  This is the main component rendered by ReactDOM in index.js.
  Currently, it displays the Homepage component.

  In future versions, this file can be extended to:
  - Add React Router
  - Handle authentication
  - Control user roles and navigation
*/
function App() {
  return (
    // Render the homepage as the main entry view
    <Homepage />
  );
}

export default App;

