
import React from 'react';
import { render, screen } from '@testing-library/react';
import Insights from '../insights';
import { industriesData } from '@/lib/data';

jest.mock('@/lib/data', () => ({
  industriesData: [
    {
      dataAiHint: 'test-industry',
      title: 'Test Industry',
      description: 'This is a test industry.',
      features: ['Feature 1', 'Feature 2'],
    },
  ],
}));

jest.mock('lucide-react', () => ({
  Zap: () => <svg>Zap</svg>,
  DollarSign: () => <svg>DollarSign</svg>,
  BrainCircuit: () => <svg>BrainCircuit</svg>,
  CheckCircle: () => <svg>CheckCircle</svg>,
}));

describe('Insights Component', () => {
  test('renders insights for a valid industry', () => {
    render(<Insights industry="test-industry" />);

    expect(screen.getByText('Uvidi za Test Industry')).toBeInTheDocument();
    expect(screen.getByText('This is a test industry.')).toBeInTheDocument();
    expect(screen.getByText('Feature 1')).toBeInTheDocument();
    expect(screen.getByText('Feature 2')).toBeInTheDocument();
  });

  test('returns null for an invalid industry', () => {
    const { container } = render(<Insights industry="invalid-industry" />);
    expect(container.firstChild).toBeNull();
  });
});
