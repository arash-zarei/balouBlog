import React from "react";

import HomePage from "./components/home/HomePage";
import AuthorsPage from "./components/author/AuthorsPage";
import BlogsPage from "./components/blog/BlogsPage";
import Layout from "./components/layout/Layout";

import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/shared/ScrollToTop";

function App() {
  return (
    <div className="App">
      <Layout>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blogs/:slug" element={<BlogsPage />} />
          <Route path="/authors/:slug" element={<AuthorsPage />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
