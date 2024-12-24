import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import SearchFieldView from '..';

describe('SearchFieldView', () => {
  it('renders the search field', () => {
    render(<SearchFieldView clearText="Limpar" />);
    const inputElement = screen.getByTestId('input-search-field');
    expect(inputElement).toBeInTheDocument();
  });

  it('calls onSearch when Enter key is pressed', () => {
    const onSearch = vi.fn();
    render(<SearchFieldView onSearch={onSearch} />);
    const inputElement = screen.getByTestId('input-search-field');
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
    expect(onSearch).toHaveBeenCalled();
  });

  it('calls onCancel when Escape key is pressed', () => {
    const onCancel = vi.fn();
    render(<SearchFieldView onCancel={onCancel} />);
    const inputElement = screen.getByTestId('input-search-field');
    fireEvent.keyDown(inputElement, { key: 'Escape', code: 'Escape' });
    expect(onCancel).toHaveBeenCalled();
  });

  it('calls onSearch when search button is clicked', () => {
    const onSearch = vi.fn();
    render(<SearchFieldView onSearch={onSearch} />);
    const searchButton = screen.getByTestId('button-search-submit');
    fireEvent.click(searchButton);
    expect(onSearch).toHaveBeenCalled();
  });

  it('calls onCancel when cancel button is clicked', () => {
    const onCancel = vi.fn();
    render(<SearchFieldView defaultValue="test" onCancel={onCancel} />);
    const cancelButton = screen.getByTestId('button-search-cancel');
    fireEvent.click(cancelButton);
    expect(onCancel).toHaveBeenCalled();
  });
});
