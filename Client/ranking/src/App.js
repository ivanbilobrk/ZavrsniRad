import './App.css';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import React from "react";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>

    <Route path ="/" element={<Layout/>}>

      <Route path="/" element = {<HomePage/>}></Route>

    </Route>

  </Routes>
  );
}

export default App;
