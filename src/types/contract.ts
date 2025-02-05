export interface Contract {
  id: string;
  name: string;
  status: "active" | "expired" | "pending";
  value: number;
  startDate: string;
  endDate: string;
  company: string;
}

export interface ContractFormData {
  contractName: string;
  contractType: string;
  startDate: Date;
  endDate: Date;
  value: string;
  description: string;
}

export interface ContractsState {
  contracts: Contract[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
}
