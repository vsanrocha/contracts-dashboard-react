import { render, screen } from '@testing-library/react';
import ChartSection from './ChartSection';
import { Contract } from '@/types/contract';
import dayjs from 'dayjs';

beforeAll(() => {
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
    configurable: true,
    get() { return 500; }
  });
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    configurable: true,
    get() { return 500; }
  });
});

describe('ChartSection', () => {
  // Create some mock contracts with various statuses and end dates
  const mockContracts: Contract[] = [
    {
      id: '1',
      name: 'Contract 1',
      clientOrSupplier: 'Client 1',
      amount: 100,
      startDate: dayjs().subtract(1, 'month').toDate(),
      endDate: dayjs().add(1, 'month').toDate(),
      status: 'active',
      type: 'Serviço',
      description: 'Descrição do contrato',
    },
    {
      id: '2',
      name: 'Contract 2',
      clientOrSupplier: 'Client 2',
      amount: 200,
      startDate: dayjs().subtract(2, 'months').toDate(),
      endDate: dayjs().add(2, 'months').toDate(),
      status: 'expired',
      type: 'Serviço',
      description: 'Descrição do contrato',
    },
    {
      id: '3',
      name: 'Contract 3',
      clientOrSupplier: 'Client 3',
      amount: 300,
      startDate: dayjs().subtract(3, 'months').toDate(),
      endDate: dayjs().add(3, 'months').toDate(),
      status: 'pending',
      type: 'Serviço',
      description: 'Descrição do contrato',
    },
    {
      id: '4',
      name: 'Contract 4',
      clientOrSupplier: 'Client 4',
      amount: 400,
      startDate: dayjs().subtract(4, 'months').toDate(),
      endDate: dayjs().add(4, 'months').toDate(),
      status: 'close_end',
      type: 'Serviço',
      description: 'Descrição do contrato',
    },
  ];

  it('renders the chart section headings', () => {
    render(
      <div style={{ width: '500px', height: '500px' }}>
        <ChartSection contracts={mockContracts} />
      </div>
    );
    expect(screen.getByText(/Contratos a expirar nos próximos meses/i)).toBeInTheDocument();
    expect(screen.getByText(/Distribuição do Status dos Contratos/i)).toBeInTheDocument();
  });
});
