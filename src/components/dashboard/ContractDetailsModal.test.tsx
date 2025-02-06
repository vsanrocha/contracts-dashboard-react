import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import ContractDetailsModal from './ContractDetailsModal';
import { Contract } from '@/types/contract';

describe('ContractDetailsModal', () => {
  const dummyContract: Contract = {
    id: '1',
    name: 'Test Contract',
    clientOrSupplier: 'Client A',
    amount: 1000,
    startDate: new Date(2025, 0, 1),
    endDate: new Date(2025, 11, 31),
    status: 'active',
    type: 'service',
    description: 'Test contract description'
  };

  test('renders contract details when modal is open', () => {
    render(
      <ContractDetailsModal
        open={true}
        contract={dummyContract}
        onClose={vi.fn()}
      />
    );

    // Check that the contract name and description are rendered
    expect(screen.getByRole('heading', { name: /Test Contract/i })).toBeInTheDocument();
    expect(screen.getByText(/Test contract description/i)).toBeInTheDocument();
  });

  test('does not render content when modal is closed', () => {
    render(
      <ContractDetailsModal
        open={false}
        contract={dummyContract}
        onClose={vi.fn()}
      />
    );

    // When modal is closed, the content should not be in the document
    expect(screen.queryByText(/Test Contract/i)).not.toBeInTheDocument();
  });
});
