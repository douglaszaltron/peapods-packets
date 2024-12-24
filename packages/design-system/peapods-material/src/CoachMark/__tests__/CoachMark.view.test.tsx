import { render, screen } from '@testing-library/react';
import CoachMark from '../';

describe('CoachMark Component', () => {
  const defaultProps = {
    title: 'Test Title',
    content: 'Test Content',
    steps: { index: 1, size: 3 },
    locale: {
      close: 'Close',
      skip: 'Skip',
      previous: 'Previous',
      next: 'Next',
      last: 'Finish',
      of: 'of',
    },
  };

  it('should render the title', () => {
    render(<CoachMark {...defaultProps} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('should render the content', () => {
    render(<CoachMark {...defaultProps} />);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should render the close button', () => {
    render(<CoachMark {...defaultProps} />);
    expect(screen.getByLabelText('Close')).toBeInTheDocument();
  });

  it('should render the next button', () => {
    render(<CoachMark {...defaultProps} />);
    expect(screen.getByLabelText('Next')).toBeInTheDocument();
  });

  it('should render the progress text', () => {
    render(<CoachMark {...defaultProps} showProgress={true} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('of')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('should not render the back button on the first step', () => {
    render(<CoachMark {...defaultProps} hideBackButton={true} />);
    expect(screen.queryByLabelText('Previous')).not.toBeInTheDocument();
  });
});
