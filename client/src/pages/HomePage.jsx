import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
	return (
		<section className="mx-auto max-w-3xl space-y-4">
			<h1 className="text-3xl font-bold">Testing & Debugging Toolkit</h1>
			<p className="text-gray-700">
				This demo app showcases unit, integration, and end-to-end testing strategies for a MERN stack.
			</p>
			<a
				href="https://jestjs.io/"
				target="_blank"
				rel="noreferrer"
				className="inline-flex items-center rounded bg-blue-600 px-3 py-2 font-medium text-white hover:bg-blue-700"
			>
				Learn about Jest
			</a>
			<p>
				Ready to explore? <Link className="text-blue-600 underline" to="/login">Login</Link> to view protected pages.
			</p>
		</section>
	);
}


