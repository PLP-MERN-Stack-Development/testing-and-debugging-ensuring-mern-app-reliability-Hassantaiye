import React, { useState } from 'react';
import Button from './Button';
import { useAuth } from '../hooks/useAuth';

export default function LoginForm({ onSuccess }) {
	const { login, status, error } = useAuth();
	const [form, setForm] = useState({ email: '', password: '' });
	const [validationError, setValidationError] = useState(null);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setValidationError(null);
		if (!form.email || !form.password) {
			setValidationError('Email and password are required');
			return;
		}
		try {
			await login(form);
			if (onSuccess) onSuccess();
		} catch (err) {
			// error state already handled in hook
		}
	};

	return (
		<form className="mx-auto max-w-md space-y-4 rounded border bg-white p-6 shadow-sm" onSubmit={handleSubmit}>
			<h2 className="text-2xl font-semibold">Login</h2>
			<div>
				<label htmlFor="email" className="block text-sm font-medium text-gray-700">
					Email
				</label>
				<input
					id="email"
					name="email"
					type="email"
					className="mt-1 w-full rounded border px-3 py-2"
					value={form.email}
					onChange={handleChange}
				/>
			</div>
			<div>
				<label htmlFor="password" className="block text-sm font-medium text-gray-700">
					Password
				</label>
				<input
					id="password"
					name="password"
					type="password"
					className="mt-1 w-full rounded border px-3 py-2"
					value={form.password}
					onChange={handleChange}
				/>
			</div>
			{validationError && <p className="text-sm text-red-600">{validationError}</p>}
			{error && <p className="text-sm text-red-600">{error}</p>}
			<Button type="submit" disabled={status === 'loading'}>
				{status === 'loading' ? 'Logging in...' : 'Login'}
			</Button>
		</form>
	);
}


