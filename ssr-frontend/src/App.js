// import logo from './logo.svg';
// import './App.css';
import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import DocumentList from "./components/DocsList";
import DocumentForm from "./components/DocForm";
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <h1>Manager</h1>
        <Routes>
          <Route path="/" element={<DocumentList />} />
          <Route path="/document/new" element={<DocumentForm />} />
          <Route path="/document/:id/edit" element={<DocumentForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
