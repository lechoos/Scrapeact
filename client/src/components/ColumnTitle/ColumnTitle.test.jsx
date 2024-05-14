import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ColumnTitle } from './ColumnTitle';

describe('ColumnTitle Component', () => {
	it('renders column title with correct size and children', () => {
		const testId = 'test-id';
		const testSize = 100;
		const testChildren = 'Test Title';

		render(
			<ColumnTitle id={testId} size={testSize}>
				{testChildren}
			</ColumnTitle>
		);

		const columnTitleElement = screen.getByText(testChildren);
		expect(columnTitleElement).toBeInTheDocument();
		expect(columnTitleElement).toHaveStyle(`width: ${testSize}px`);
	});

	it('renders column title with save class if id is "save"', () => {
		const testId = 'save';
		const testSize = 100;
		const testChildren = 'Save Title';

		render(
			<ColumnTitle id={testId} size={testSize}>
				{testChildren}
			</ColumnTitle>
		);

		const columnTitleElement = screen.getByText(testChildren);
		expect(columnTitleElement).toHaveClass('column-title');
		expect(columnTitleElement).toHaveClass('column-title--save');
	});

	it('calls onClick callback when column title is clicked', () => {
		const testId = 'test-id';
		const testSize = 100;
		const testChildren = 'Clickable Title';
		const mockOnClick = vi.fn();

		render(
			<ColumnTitle id={testId} size={testSize} onClick={mockOnClick}>
				{testChildren}
			</ColumnTitle>
		);

		const columnTitleElement = screen.getByText(testChildren);
		fireEvent.click(columnTitleElement);

		expect(mockOnClick).toHaveBeenCalledTimes(1);
	});
});
