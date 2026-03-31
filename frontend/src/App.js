import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AdminProvider } from './contexts/AdminContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import WebinarsPage from './pages/WebinarsPage';
import WebinarDetailPage from './pages/WebinarDetailPage';
import AuthPage from './pages/AuthPage';
import WelcomePage from './pages/WelcomePage';
import MyCoursesPage from './pages/MyCoursesPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminCoursesPage from './pages/AdminCoursesPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './components/AdminProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <AdminProvider>
          <div className="App">
            <div id="recaptcha-container"></div>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={
                <>
                  <Header />
                  <main className="pt-16">
                    <HomePage />
                  </main>
                  <Footer />
                </>
              } />
              <Route path="/auth" element={
                <>
                  <Header />
                  <main className="pt-16">
                    <AuthPage />
                  </main>
                  <Footer />
                </>
              } />
              <Route path="/courses" element={
                <>
                  <Header />
                  <main className="pt-16">
                    <CoursesPage />
                  </main>
                  <Footer />
                </>
              } />
              <Route path="/webinars" element={
                <>
                  <Header />
                  <main className="pt-16">
                    <WebinarsPage />
                  </main>
                  <Footer />
                </>
              } />
              <Route path="/welcome" element={
                <ProtectedRoute>
                  <WelcomePage />
                </ProtectedRoute>
              } />
              <Route path="/my-courses" element={
                <ProtectedRoute>
                  <>
                    <Header />
                    <main className="pt-16">
                      <MyCoursesPage />
                    </main>
                    <Footer />
                  </>
                </ProtectedRoute>
              } />

              {/* Protected User Routes */}
              <Route
                path="/courses/:id"
                element={
                  <ProtectedRoute>
                    <>
                      <Header />
                      <main className="pt-16">
                        <CourseDetailPage />
                      </main>
                      <Footer />
                    </>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/webinars/:id"
                element={
                  <ProtectedRoute>
                    <>
                      <Header />
                      <main className="pt-16">
                        <WebinarDetailPage />
                      </main>
                      <Footer />
                    </>
                  </ProtectedRoute>
                }
              />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route
                path="/admin/dashboard"
                element={
                  <AdminProtectedRoute>
                    <AdminDashboard />
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="/admin/courses"
                element={
                  <AdminProtectedRoute>
                    <AdminCoursesPage />
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="/admin/courses/create"
                element={
                  <AdminProtectedRoute>
                    <AdminCoursesPage />
                  </AdminProtectedRoute>
                }
              />
            </Routes>
          </div>
        </AdminProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;