import { setupServer } from 'msw/node';
import { handlers, resetPosts } from './handlers';

export const server = setupServer(...handlers);

server.events.on('request:end', () => {
	// Reset data between tests if needed externally
});

export { resetPosts };


