/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Topics from './pages/Topics';
import ArticleDetail from './pages/ArticleDetail';
import About from './pages/About';
import Archive from './pages/Archive';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/topic/:category" element={<Topics />} />
          <Route path="/article/:articleId" element={<ArticleDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/archive" element={<Archive />} />
          {/* Fallback routes for other links in the header */}
          <Route path="/library" element={<Archive />} />
          <Route path="/instruction" element={<Archive />} />
        </Routes>
      </Layout>
    </Router>
  );
}
