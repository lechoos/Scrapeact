import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Cell } from './Cell';

describe('Cell component', () => {
	it('renders cell with correct size and children', () => {
		const testSize = 100;
		const testChildren = 'Testowy kontent';

		render(<Cell size={testSize}>{testChildren}</Cell>);

		const cellElement = screen.getByTestId('company-cell');
		expect(cellElement).toBeInTheDocument();
		expect(cellElement).toHaveAttribute('width', `${testSize}`);
		expect(cellElement).toHaveTextContent(testChildren);
	});

	it('renders cell with correct CSS styles', () => {
		render(<Cell size={100}>Test Content</Cell>);
		const cellElement = screen.getByTestId('company-cell');
		expect(cellElement).toHaveClass('cell');
	});
});
