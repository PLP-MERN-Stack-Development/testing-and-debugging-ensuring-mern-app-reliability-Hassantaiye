import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../store/authSlice';
import postsReducer from '../../store/postsSlice';
import { render, renderHook } from '@testing-library/react';

export function createTestStore(preloadedState) {
	return configureStore({
		reducer: {
			auth: authReducer,
			posts: postsReducer
		},
		preloadedState
	});
}

export function renderWithProviders(ui, { store = createTestStore(), ...renderOptions } = {}) {
	function Wrapper({ children }) {
		return <Provider store={store}>{children}</Provider>;
	}
	return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export function renderHookWithProviders(callback, { store = createTestStore(), ...options } = {}) {
	function Wrapper({ children }) {
		return <Provider store={store}>{children}</Provider>;
	}
	return renderHook(callback, { wrapper: Wrapper, ...options });
}


