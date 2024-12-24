import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import TagView from '../';

describe('TagView', () => {
  it('renders with default props', () => {
    render(<TagView label="Default Tag" />);
    const tagElement = screen.getByTestId('tag');
    expect(tagElement).toBeInTheDocument();
    expect(tagElement).toHaveTextContent('Default Tag');
  });

  it('renders with a custom color and intensity', () => {
    render(<TagView label="Primary Tag" color="primary" intensity="low" />);
    const tagElement = screen.getByTestId('tag');
    expect(tagElement).toBeInTheDocument();
    expect(tagElement).toHaveTextContent('Primary Tag');
  });

  it('renders with an icon', () => {
    const icon = <span data-testid="icon">Icon</span>;
    render(<TagView label="Tag with Icon" icon={icon} />);
    const tagElement = screen.getByTestId('tag');
    const iconElement = screen.getByTestId('icon');
    expect(tagElement).toBeInTheDocument();
    expect(tagElement).toHaveTextContent('Tag with Icon');
    expect(iconElement).toBeInTheDocument();
  });

  it('applies custom styles via sx prop', () => {
    render(<TagView label="Styled Tag" sx={{ backgroundColor: 'red' }} />);
    const tagElement = screen.getByTestId('tag');
    expect(tagElement).toBeInTheDocument();
    expect(tagElement).toHaveTextContent('Styled Tag');
    expect(tagElement).toHaveStyle('background-color: red');
  });
});
