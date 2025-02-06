const mutateMock = vi.fn();
vi.mock('@/hooks/useContracts', () => ({
  useAddContract: () => ({
    mutate: mutateMock,
  }),
}));

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import AddContractModal from "./AddContractModal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

describe("AddContractModal", () => {
  const onClose = vi.fn();

  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <AddContractModal open={true} onClose={onClose} />
      </QueryClientProvider>
    );
  });

  it("renders the modal with default values", () => {
    expect(screen.getByPlaceholderText("Insira o nome do contrato")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Insira o nome do cliente/fornecedor")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Insira o valor do contrato")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Descrição do contrato")).toBeInTheDocument();
  });

  it("calls onClose when the Cancelar button is clicked", () => {
    fireEvent.click(screen.getByText("Cancelar"));
    expect(onClose).toHaveBeenCalled();
  });

  it("calls mutate with the correct data when the form is submitted", async () => {
    fireEvent.change(screen.getByPlaceholderText("Insira o nome do contrato"), {
      target: { value: "Contrato Teste" },
    });
    fireEvent.change(screen.getByPlaceholderText("Insira o nome do cliente/fornecedor"), {
      target: { value: "Cliente Teste" },
    });
    fireEvent.change(screen.getByPlaceholderText("Insira o valor do contrato"), {
      target: { value: "10,00" },
    });
    fireEvent.change(screen.getByPlaceholderText("Descrição do contrato"), {
      target: { value: "Descrição Teste" },
    });

    fireEvent.submit(screen.getByTestId("add-contract-form"));

    await waitFor(() => {
      expect(mutateMock).toHaveBeenCalledWith(expect.objectContaining({
        name: "Contrato Teste",
        clientOrSupplier: "Cliente Teste",
        amount: 10.00,
        description: "Descrição Teste",
      }));
    });
  });
});
