import React from 'react';

export default class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		// Basic client-side logging; replace with a real logger as needed
		// eslint-disable-next-line no-console
		console.error('ErrorBoundary caught an error', error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return this.props.fallback || <div>Something went wrong.</div>;
		}
		return this.props.children;
	}
}


