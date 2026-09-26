// src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';

// ============================================
// Main Components
// ============================================
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';
import ScrollProgress from './components/ScrollProgress';
import ScrollToTopButton from './components/ScrollToTopButton';

// ============================================
// Public Pages
// ============================================
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import BlogPage from './pages/BlogPage';
import BlogPost from './pages/BlogPost';
import Careers from './pages/Careers';

// ============================================
// Admin Pages
// ============================================
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import AdminLayout from './pages/admin/AdminLayout';
import ProtectedRoute from './pages/admin/ProtectedRoute';
import Partners from './pages/admin/Partners';
import Portfolio from './pages/admin/Portfolio';
import Blog from './pages/admin/Blog';
import Faq from './pages/admin/Faq';
import Messages from './pages/admin/Messages';

function App() {
  return (
    <>
      <ScrollToTop />
      <ScrollProgress />

      <Routes>

        {/* Public Routes */}
        <Route
          path="/*"
          element={
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="*" element={<Home />} />
                </Routes>
              </main>
              <Footer />
              <WhatsAppButton />
              <ScrollToTopButton />
            </div>
          }
        />

        {/* Admin Login */}
        <Route path="/admin/login" element={<Login />} />

        {/* Admin Panel */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="partners" element={<Partners />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="blog" element={<Blog />} />
          <Route path="faq" element={<Faq />} />
          <Route path="messages" element={<Messages />} />
        </Route>

      </Routes>
    </>
  );
}

export default App;