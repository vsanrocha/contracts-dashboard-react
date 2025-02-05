import axios from "axios";
import { Contract, ContractFormData } from "@/types/contract";

const API_URL = "http://localhost:3000/api"; // Updated to point to the new Express server

export const contractsApi = {
  getContracts: async (page: number = 1) => {
    const response = await axios.get(`${API_URL}/contracts?page=${page}`);
    return response.data;
  },

  addContract: async (contract: ContractFormData) => {
    const response = await axios.post(`${API_URL}/contracts`, contract);
    return response.data;
  },

  updateContract: async (id: string, contract: Partial<Contract>) => {
    const response = await axios.put(`${API_URL}/contracts/${id}`, contract);
    return response.data;
  },

  deleteContract: async (id: string) => {
    await axios.delete(`${API_URL}/contracts/${id}`);
  },
};
