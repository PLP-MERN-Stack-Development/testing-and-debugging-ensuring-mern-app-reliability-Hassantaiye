import React from 'react';
import { render } from '@testing-library/react';
import Button from '../../components/Button';

describe('Button snapshot', () => {
	it('matches snapshot for primary button', () => {
		const { container } = render(<Button>Snapshot</Button>);
		expect(container.firstChild).toMatchSnapshot();
	});
});


