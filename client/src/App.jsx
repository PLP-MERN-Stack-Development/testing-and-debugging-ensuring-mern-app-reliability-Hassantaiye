import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import store from './store';
import NavBar from './components/NavBar';
import ErrorBoundary from './components/ErrorBoundary';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PostsPage from './pages/PostsPage';
import DashboardPage from './pages/DashboardPage';

function ProtectedRoute({ children }) {
	const user = useSelector((state) => state.auth.user);
	if (!user) {
		return <Navigate to="/login" replace />;
	}
	return children;
}

function AppShell() {
	return (
		<ErrorBoundary>
			<div className="min-h-screen bg-gray-50 text-gray-900">
				<NavBar />
				<main className="p-6">
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route
							path="/posts"
							element={
								<ProtectedRoute>
									<PostsPage />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/dashboard"
							element={
								<ProtectedRoute>
									<DashboardPage />
								</ProtectedRoute>
							}
						/>
						<Route path="*" element={<Navigate to="/" replace />} />
					</Routes>
				</main>
			</div>
		</ErrorBoundary>
	);
}

export default function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<AppShell />
			</BrowserRouter>
		</Provider>
	);
}



