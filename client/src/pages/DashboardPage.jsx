import React from 'react';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
	const { user, logout } = useAuth();

	return (
		<section className="mx-auto max-w-3xl space-y-4">
			<h1 className="text-3xl font-bold">Dashboard</h1>
			{user ? (
				<div className="rounded border bg-white p-4 shadow-sm">
					<p>
						<strong>Name:</strong> {user.username}
					</p>
					<p>
						<strong>Email:</strong> {user.email}
					</p>
					<div className="mt-4 flex items-center gap-2">
						<Button variant="danger" onClick={logout}>
							Logout
						</Button>
						<Link className="text-blue-600 underline" to="/posts">
							Manage Posts
						</Link>
					</div>
				</div>
			) : (
				<p>Please log in to view your dashboard.</p>
			)}
		</section>
	);
}


