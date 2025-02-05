import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { contractsApi } from "@/api/contracts";
import type {
  ContractsState,
  Contract,
  ContractFormData,
} from "@/types/contract";

const initialState: ContractsState = {
  contracts: [],
  loading: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
};

export const fetchContracts = createAsyncThunk(
  "contracts/fetchContracts",
  async (page: number) => {
    const response = await contractsApi.getContracts(page);
    return response;
  },
);

export const addContract = createAsyncThunk(
  "contracts/addContract",
  async (contract: ContractFormData) => {
    const response = await contractsApi.addContract(contract);
    return response;
  },
);

const contractsSlice = createSlice({
  name: "contracts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContracts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContracts.fulfilled, (state, action) => {
        state.loading = false;
        state.contracts = action.payload.contracts;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchContracts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch contracts";
      })
      .addCase(addContract.fulfilled, (state, action) => {
        state.contracts.push(action.payload);
      });
  },
});

export const contractsReducer = contractsSlice.reducer;
