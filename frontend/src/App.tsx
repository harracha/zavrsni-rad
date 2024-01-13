import React from "react";
import "./App.css";
import LoginPage from "./Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/Homepage";
import Layout from "./components/Layout";

function App() {
  return (
    <Layout>
      {
        <Router>
          <Routes>
            <Route path="/" Component={LandingPage} />
            <Route path="/login" Component={LoginPage} />
          </Routes>
        </Router>
      }
    </Layout>
  );
}

export default App;
