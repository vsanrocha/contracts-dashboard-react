import { FC, useState } from "react";
import MetricsHeader from "./dashboard/MetricsHeader";
import ChartSection from "./dashboard/ChartSection";
import ContractsTable from "./dashboard/ContractsTable";
import AddContractModal from "./dashboard/AddContractModal";
import ContractDetailsModal from "./dashboard/ContractDetailsModal";
import FiltersModal from "./dashboard/FiltersModal";
import Sidebar from "./dashboard/Sidebar";
import { Button } from "./ui/button";
import { Plus, Menu, Filter } from "lucide-react";
import { Contract, ContractFormData } from "@/types/contract";
import {
  useContracts,
  useAddContract,
} from "@/hooks/useContracts";
import { useFilteredContracts } from "@/hooks/useFilteredContracts";

interface HomeProps {
  initialCollapsed?: boolean;
}

const Home: FC<HomeProps> = ({
  initialCollapsed = window.innerWidth < 1024,
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(initialCollapsed);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(
    null,
  );
  const [activeFilters, setActiveFilters] = useState<{
    startDateRange?: { from: Date; to: Date };
    endDateRange?: { from: Date; to: Date };
    status?: string;
  }>();

  const { data: contracts = [], error, isLoading } = useContracts();
  const addContractMutation = useAddContract();

  const handleAddContract = (contract: ContractFormData) => {
    addContractMutation.mutate(contract);
    setShowAddModal(false);
  };

  const filteredContracts = useFilteredContracts(contracts, activeFilters);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className="flex-1 overflow-auto">
        <div className="p-3 sm:p-6 space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              >
                <Menu className="h-6 w-6" />
              </Button>
              <h1 className="text-xl sm:text-2xl font-bold">Dashboard</h1>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                onClick={() => setShowFiltersModal(true)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filtros
              </Button>
              <Button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Adicionar Contrato
              </Button>
            </div>
          </div>

          <MetricsHeader
            contracts={filteredContracts}
            onMetricClick={(metric) => {
              const contract = filteredContracts.find((c) => {
                if (metric === "active") return c.status === "active";
                if (metric === "pending") return c.status === "pending";
                return true;
              });
              if (contract) setSelectedContract(contract);
            }}
          />
          <ChartSection contracts={filteredContracts} />
          {isLoading ? (
            <div className="text-center py-4">Loading...</div>
          ) : error ? (
            <div className="text-center py-4 text-red-500">{error.message}</div>
          ) : (
            <ContractsTable
              contracts={filteredContracts}
              currentPage={1}
              totalPages={1}
              onPageChange={() => {}}
              onRowClick={(contract) => setSelectedContract(contract)}
            />
          )}
        </div>
      </div>

      <AddContractModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddContract}
      />

      <ContractDetailsModal
        contract={selectedContract}
        open={!!selectedContract}
        onClose={() => setSelectedContract(null)}
      />

      <FiltersModal
        open={showFiltersModal}
        onClose={() => setShowFiltersModal(false)}
        initialFilters={activeFilters}
        onApplyFilters={(filters) => {
          setActiveFilters(filters);
        }}
      />
    </div>
  );
};

export default Home;
