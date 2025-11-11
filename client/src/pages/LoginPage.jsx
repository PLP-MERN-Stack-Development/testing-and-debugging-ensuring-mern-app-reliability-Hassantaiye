import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
	const navigate = useNavigate();

	return (
		<section className="mx-auto max-w-3xl space-y-4">
			<LoginForm onSuccess={() => navigate('/dashboard')} />
		</section>
	);
}


