import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import FiltersModal from './FiltersModal';


describe('FiltersModal', () => {
  test('renders modal content when open', () => {
    render(
      <FiltersModal
        open={true}
        onClose={vi.fn()}
        onApplyFilters={vi.fn()}
      />
    );

    expect(screen.getByText(/Data de Início do Contrato/i)).toBeInTheDocument();
  });

  test('does not render modal content when closed', () => {
    render(
      <FiltersModal
        open={false}
        onClose={vi.fn()}
        onApplyFilters={vi.fn()}
      />
    );

    expect(screen.queryByText(/Filtros/i)).not.toBeInTheDocument();
  });
});
