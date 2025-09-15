import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Input } from './Input';

describe('Input', () => {
  it('renders input field', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Input label="Username" />);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
  });

  it('shows error message', () => {
    render(<Input error="This field is required" />);
    const input = screen.getByRole('textbox');
    const errorMessage = screen.getByRole('alert');
    
    expect(errorMessage).toHaveTextContent('This field is required');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', expect.stringContaining('error'));
  });

  it('shows helper text', () => {
    render(<Input helperText="Enter your full name" />);
    expect(screen.getByText('Enter your full name')).toBeInTheDocument();
  });

  it('prioritizes error over helper text', () => {
    render(
      <Input 
        helperText="Enter your full name" 
        error="This field is required" 
      />
    );
    expect(screen.getByRole('alert')).toHaveTextContent('This field is required');
    expect(screen.queryByText('Enter your full name')).not.toBeInTheDocument();
  });

  it('handles value changes', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    await user.type(input, 'test');
    
    expect(handleChange).toHaveBeenCalledTimes(4);
  });

  it('applies custom className', () => {
    render(<Input className="custom-class" />);
    expect(screen.getByRole('textbox')).toHaveClass('custom-class');
  });

  it('handles disabled state', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('generates unique IDs', () => {
    const { rerender } = render(<Input label="First" />);
    const firstInput = screen.getByLabelText('First');
    const firstId = firstInput.getAttribute('id');
    
    rerender(<Input label="Second" />);
    const secondInput = screen.getByLabelText('Second');
    const secondId = secondInput.getAttribute('id');
    
    expect(firstId).not.toBe(secondId);
  });
});