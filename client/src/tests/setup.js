// Jest setup for client-side tests (React Testing Library)
import '@testing-library/jest-dom';
import { server, resetPosts } from './mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterEach(() => resetPosts());
afterAll(() => server.close());


