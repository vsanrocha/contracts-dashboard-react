import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { contractsApi } from "@/api/contracts";
import { Contract, ContractFormData } from "@/types/contract";

export const useContracts = (page: number = 1) => {
  return useQuery({
    queryKey: ["contracts", page],
    queryFn: () => contractsApi.getContracts(page),
  });
};

export const useAddContract = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newContract: ContractFormData) =>
      contractsApi.addContract(newContract),
    onSuccess: () => {
      queryClient.invalidateQueries(["contracts"]);
    },
  });
};

export const useUpdateContract = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedContract: Partial<Contract>) =>
      contractsApi.updateContract(id, updatedContract),
    onSuccess: () => {
      queryClient.invalidateQueries(["contracts"]);
    },
  });
};

export const useDeleteContract = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => contractsApi.deleteContract(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["contracts"]);
    },
  });
};
