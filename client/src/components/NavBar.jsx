import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Button from './Button';
import { useAuth } from '../hooks/useAuth';

export default function NavBar() {
	const { user, logout } = useAuth();

	return (
		<nav className="bg-white shadow">
			<div className="mx-auto flex max-w-5xl items-center justify-between p-4">
				<Link to="/" className="text-xl font-semibold">
					MERN Reliability
				</Link>
				<div className="flex items-center gap-4">
					<NavLink
						to="/"
						className={({ isActive }) =>
							isActive ? 'font-medium text-blue-600' : 'text-gray-600 hover:text-gray-900'
						}
					>
						Home
					</NavLink>
					<NavLink
						to="/posts"
						className={({ isActive }) =>
							isActive ? 'font-medium text-blue-600' : 'text-gray-600 hover:text-gray-900'
						}
					>
						Posts
					</NavLink>
					{user ? (
						<>
							<NavLink
								to="/dashboard"
								className={({ isActive }) =>
									isActive
										? 'font-medium text-blue-600'
										: 'text-gray-600 hover:text-gray-900'
								}
							>
								Dashboard
							</NavLink>
							<Button variant="secondary" onClick={logout}>
								Logout
							</Button>
						</>
					) : (
						<>
							<Link
								to="/register"
								className="rounded bg-green-600 px-3 py-2 font-medium text-white hover:bg-green-700"
							>
								Register
							</Link>
							<Link
								to="/login"
								className="rounded bg-blue-600 px-3 py-2 font-medium text-white hover:bg-blue-700"
							>
								Login
							</Link>
						</>
					)}
				</div>
			</div>
		</nav>
	);
}


