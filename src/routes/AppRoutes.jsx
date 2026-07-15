import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import DashboardPage from '../pages/DashboardPage';
import MealsPage from '../pages/MealsPage';
import WorkoutsPage from '../pages/WorkoutsPage';
import WeightPage from '../pages/WeightPage';
import HistoryPage from '../pages/HistoryPage';
import RecipesPage from '../pages/RecipesPage';
import GroceryListPage from '../pages/GroceryListPage';
import RoutinesPage from '../pages/RoutinesPage';
import ReportsPage from '../pages/ReportsPage';
import ProtectedRoute from './ProtectedRoute';
import Layout from '../components/layout/Layout';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <DashboardPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/meals"
        element={
          <ProtectedRoute>
            <Layout>
              <MealsPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/workouts"
        element={
          <ProtectedRoute>
            <Layout>
              <WorkoutsPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/weight"
        element={
          <ProtectedRoute>
            <Layout>
              <WeightPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <Layout>
              <HistoryPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/recipes"
        element={
          <ProtectedRoute>
            <Layout>
              <RecipesPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/grocery-lists"
        element={
          <ProtectedRoute>
            <Layout>
              <GroceryListPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/routines"
        element={
          <ProtectedRoute>
            <Layout>
              <RoutinesPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <Layout>
              <ReportsPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default AppRoutes;