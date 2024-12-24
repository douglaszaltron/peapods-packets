import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Surface from '../';

describe('Surface Component', () => {
  it('renders without crashing', () => {
    render(<Surface data-testid="surface" />);
    const surfaceElement = screen.getByTestId('surface');
    expect(surfaceElement).toBeInTheDocument();
  });

  it('applies the dashed border when dashed prop is true', () => {
    render(<Surface dashed data-testid="surface" />);
    const surfaceElement = screen.getByTestId('surface');
    expect(surfaceElement).toHaveStyle('border-style: dashed');
  });

  it('renders children correctly', () => {
    render(
      <Surface data-testid="surface">
        <div>Child Element</div>
      </Surface>,
    );
    const childElement = screen.getByText('Child Element');
    expect(childElement).toBeInTheDocument();
  });
});
