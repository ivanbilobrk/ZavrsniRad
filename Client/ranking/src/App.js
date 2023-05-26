import './App.css';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import React from "react";
import { Route, Routes } from "react-router-dom";
import TablePage from './pages/TablePage';
import RankingUniPage from './pages/UniPage';
import UploadPage from './pages/UploadPage';

function App() {
  return (
    <Routes>

    <Route path ="/" element={<Layout/>}>

      <Route path="/" element = {<HomePage/>}></Route>
      <Route path="/ranking" element = {<TablePage/>}></Route>
      <Route path="/rankingUni" element = {<RankingUniPage/>}></Route>
      <Route path="/upload" element = {<UploadPage/>}></Route>
    </Route>

  </Routes>
  );
}

export default App;
