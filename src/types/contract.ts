export interface Contract {
  id: string;
  name: string;
  clientOrSupplier: string;
  startDate: string;
  endDate: string;
  status: "active" | "expired" | "pending" | "close_end";
  type: string;
  amount: number;
}

export type ContractFormData = Omit<Contract, "id" | "status">;

export interface ContractsState {
  contracts: Contract[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
}
