import { createContext, useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase';

import Navbar from './components/Navbar.jsx';
import Login from './features/auth/Login.jsx';
import Register from './features/auth/Register.jsx';
import Dashboard from './features/dashboard/Dashboard.jsx';
import MistakeReview from './features/mistakes/MistakeReview.jsx';
import MockExam from './features/mocks/MockExam.jsx';
import WritingMockExam from './features/mocks/WritingMock.jsx';
import TestHub from './features/tests/TestHub.jsx';
import TestRunner from './features/tests/TestRunner.jsx';
import PracticeSession from './features/practice/PracticeSession.jsx';
import WritingWorkspace from './features/writing/WritingWorkspace.jsx';
import AdminDashboard from './features/admin/AdminDashboard.jsx';
import AdminRoute from './features/admin/AdminRoute.jsx';
import DrillTypesHub from './features/practice/DrillTypesHub.jsx';
import DrillExerciseList from './features/practice/DrillExerciseList.jsx';
import DrillExerciseRunner from './features/practice/DrillExerciseRunner.jsx';
import './App.css';

// A single, app-wide auth context. Kept here (rather than its own file) so
// every screen in this tree can just do `useAuth()`.
export const AuthContext = createContext({ user: null, loading: true });
export function useAuth() {
  return useContext(AuthContext);
}

function Protected({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="app-loading">Loading…</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      <BrowserRouter>
        {user && <Navbar />}
        <div className={user ? 'app-body' : ''}>
          <Routes>
            <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
            <Route
              path="/register"
              element={user ? <Navigate to="/" replace /> : <Register />}
            />
            <Route
              path="/"
              element={
                <Protected>
                  <Dashboard />
                </Protected>
              }
            />

            {/* Full tests: hub page + one route per part */}
            <Route
              path="/tests/:testId"
              element={
                <Protected>
                  <TestHub />
                </Protected>
              }
            />
            <Route
              path="/tests/:testId/reading"
              element={
                <Protected>
                  <TestRunner skill="reading" />
                </Protected>
              }
            />
            <Route
              path="/tests/:testId/listening"
              element={
                <Protected>
                  <TestRunner skill="listening" />
                </Protected>
              }
            />
            <Route
              path="/tests/:testId/writing"
              element={
                <Protected>
                  <TestRunner skill="writing" />
                </Protected>
              }
            />

            {/* Standalone mock lists (still available) */}
            <Route
              path="/mocks/reading"
              element={
                <Protected>
                  <MockExam kind="reading" />
                </Protected>
              }
            />
            <Route
              path="/mocks/listening"
              element={
                <Protected>
                  <MockExam kind="listening" />
                </Protected>
              }
            />
            <Route
              path="/mocks/writing"
              element={
                <Protected>
                  <WritingMockExam />
                </Protected>
              }
            />
            {/* <Route
              path="/practice/reading"
              element={
                <Protected>
                  <PracticeSession kind="reading" />
                </Protected>
              }
            /> */}
            {/* <Route
              path="/practice/listening"
              element={
                <Protected>
                  <PracticeSession kind="listening" />
                </Protected>
              }
            /> */}
            <Route
              path="/writing"
              element={
                <Protected>
                  <WritingWorkspace />
                </Protected>
              }
            />
            <Route
              path="/mistakes"
              element={
                <Protected>
                  <MistakeReview />
                </Protected>
              }
            />
            <Route
              path="/admin"
              element={
                <Protected>
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                </Protected>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/practice/:skill" element={<Protected><DrillTypesHub /></Protected>} />
<Route path="/practice/:skill/:typeKey" element={<Protected><DrillExerciseList /></Protected>} />
<Route path="/practice/:skill/:typeKey/:exerciseId" element={<Protected><DrillExerciseRunner /></Protected>} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}