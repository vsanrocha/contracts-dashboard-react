export interface Contract {
  id: string;
  name: string;
  clientOrSupplier: string;
  startDate: Date;
  endDate: Date;
  status: "active" | "expired" | "pending" | "close_end";
  type: string;
  amount: number | string;
  description: string;
}

export type ContractFormData = Omit<Contract, "id" | "status">;