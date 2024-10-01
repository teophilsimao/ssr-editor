// import logo from './logo.svg';
// import './App.css';
import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import DocumentList from "./components/DocsList";
import DocumentForm from "./components/DocForm";
import Header from "./components/Header";
import Footer from "./components/Footer";
import './App.css';

function App() {
  return (
    <Router>
      <main>
        <h1>Manager</h1>
        <Routes>
          <Route path="/" element={<DocumentList />} />
          <Route path="/document/new" element={<DocumentForm />} />
          <Route path="/document/:id/edit" element={<DocumentForm />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
