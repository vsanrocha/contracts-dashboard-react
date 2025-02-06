import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import ContractsTable from './ContractsTable';
import { Contract } from '@/types/contract';

const dummyContracts: Contract[] = [
  {
    id: '1',
    name: 'Test Contract 1',
    clientOrSupplier: 'Client A',
    amount: 1000,
    startDate: new Date(2025, 0, 1),
    endDate: new Date(2025, 11, 31),
    status: 'active',
    type: 'Service',
    description: 'Test contract description 1'
  },
  {
    id: '2',
    name: 'Test Contract 2',
    clientOrSupplier: 'Client B',
    amount: 2000,
    startDate: new Date(2025, 1, 1),
    endDate: new Date(2025, 10, 31),
    status: 'expired',
    type: 'Service',
    description: 'Test contract description 2'
  }
];


describe('ContractsTable', () => {
  test('renders table headers', () => {
    render(<ContractsTable contracts={dummyContracts} />);
    expect(screen.getByText(/Nome do Contrato/i)).toBeInTheDocument();
    expect(screen.getByText(/Cliente\/Fornecedor/i)).toBeInTheDocument();
    expect(screen.getByText(/Valor/i)).toBeInTheDocument();
    expect(screen.getByText(/Status/i)).toBeInTheDocument();
  });

  test('renders correct number of rows for contracts', () => {
    render(<ContractsTable contracts={dummyContracts} />);
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(dummyContracts.length + 1);
  });

  test('calls onRowClick callback when a row is clicked', () => {
    const onRowClick = vi.fn();
    render(<ContractsTable contracts={dummyContracts} onRowClick={onRowClick} />);

    const firstRow = screen.getByText(/Test Contract 1/i).closest('tr');
    if (firstRow) {
      fireEvent.click(firstRow);
    }

    expect(onRowClick).toHaveBeenCalledWith(dummyContracts[0]);
  });
});
