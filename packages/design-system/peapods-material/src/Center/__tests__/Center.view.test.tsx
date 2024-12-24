import { render } from '@testing-library/react';
import CenterView, { type CenterProps } from '..';

describe('CenterView', () => {
  test('renders correctly', () => {
    const props: CenterProps = {
      height: '100vh',
    };

    const { getByTestId } = render(<CenterView {...props} />);
    const centerElement = getByTestId('center');

    expect(centerElement).toBeInTheDocument();
  });
});
