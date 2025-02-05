export interface Contract {
  id: string;
  contractName: string;
  clientOrSupplier: string;
  startDate: string;
  endDate: string;
  status: "Ativo" | "Expirado" | "Pendente de Renovação" | "Próximo ao Vencimento";
  contractValue: string;
  contractType: string;
  amount: string;
}

export interface ContractFormData {
  contractName: string;
  clientOrSupplier: string;
  startDate: Date;
  endDate: Date;
  contractValue: string;
  contractType: string;
  description: string;
  amount: string;
}

export interface ContractsState {
  contracts: Contract[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
}
