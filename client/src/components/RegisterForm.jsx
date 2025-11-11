import React, { useState } from 'react';
import Button from './Button';
import { useAuth } from '../hooks/useAuth';

export default function RegisterForm({ onSuccess }) {
	const { register, status, error } = useAuth();
	const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });
	const [validationError, setValidationError] = useState(null);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const validateForm = () => {
		if (!form.username || !form.email || !form.password || !form.confirmPassword) {
			setValidationError('All fields are required');
			return false;
		}

		if (form.password.length < 8) {
			setValidationError('Password must be at least 8 characters long');
			return false;
		}

		if (!/^(?=.*[A-Za-z])(?=.*\d)/.test(form.password)) {
			setValidationError('Password must contain at least one letter and one number');
			return false;
		}

		if (form.password !== form.confirmPassword) {
			setValidationError('Passwords do not match');
			return false;
		}

		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
			setValidationError('Please enter a valid email address');
			return false;
		}

		return true;
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setValidationError(null);

		if (!validateForm()) {
			return;
		}

		try {
			await register({
				username: form.username,
				email: form.email,
				password: form.password
			});
			if (onSuccess) onSuccess();
		} catch (err) {
			// error state already handled in hook
		}
	};

	return (
		<form className="mx-auto max-w-md space-y-4 rounded border bg-white p-6 shadow-sm" onSubmit={handleSubmit}>
			<h2 className="text-2xl font-semibold">Register</h2>
			<div>
				<label htmlFor="username" className="block text-sm font-medium text-gray-700">
					Username
				</label>
				<input
					id="username"
					name="username"
					type="text"
					className="mt-1 w-full rounded border px-3 py-2"
					value={form.username}
					onChange={handleChange}
					required
				/>
			</div>
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
					required
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
					required
					minLength={8}
				/>
				<p className="mt-1 text-xs text-gray-500">Must be at least 8 characters with letters and numbers</p>
			</div>
			<div>
				<label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
					Confirm Password
				</label>
				<input
					id="confirmPassword"
					name="confirmPassword"
					type="password"
					className="mt-1 w-full rounded border px-3 py-2"
					value={form.confirmPassword}
					onChange={handleChange}
					required
				/>
			</div>
			{validationError && <p className="text-sm text-red-600">{validationError}</p>}
			{error && <p className="text-sm text-red-600">{error}</p>}
			<Button type="submit" disabled={status === 'loading'}>
				{status === 'loading' ? 'Registering...' : 'Register'}
			</Button>
		</form>
	);
}

