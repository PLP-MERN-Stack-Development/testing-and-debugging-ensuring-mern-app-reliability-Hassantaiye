import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';

export default function RegisterPage() {
	const navigate = useNavigate();

	return (
		<section className="mx-auto max-w-3xl space-y-4">
			<RegisterForm onSuccess={() => navigate('/dashboard')} />
			<div className="mx-auto max-w-md text-center">
				<p className="text-sm text-gray-600">
					Already have an account?{' '}
					<Link to="/login" className="font-medium text-blue-600 hover:text-blue-700">
						Login here
					</Link>
				</p>
			</div>
		</section>
	);
}

