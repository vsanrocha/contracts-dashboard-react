export interface Contract {
  id: string;
  name: string;
  clientOrSupplier: string;
  startDate: string;
  endDate: string;
  status: "active" | "expired" | "pending" | "close_end";
  type: string;
  amount: string;
}

export interface ContractFormData {
  name: string;
  clientOrSupplier: string;
  startDate: Date;
  endDate: Date;
  type: string;
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
