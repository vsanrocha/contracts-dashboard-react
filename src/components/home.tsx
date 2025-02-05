import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContracts, addContract } from "@/store/contractsSlice";
import type { RootState, AppDispatch } from "@/store";
import MetricsHeader from "./dashboard/MetricsHeader";
import ChartSection from "./dashboard/ChartSection";
import ContractsTable from "./dashboard/ContractsTable";
import AddContractModal from "./dashboard/AddContractModal";
import ContractDetailsModal from "./dashboard/ContractDetailsModal";
import Sidebar from "./dashboard/Sidebar";
import { Button } from "./ui/button";
import { Plus, Menu } from "lucide-react";

interface HomeProps {
  initialCollapsed?: boolean;
}

const Home: React.FC<HomeProps> = ({
  initialCollapsed = window.innerWidth < 1024,
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] =
    React.useState(initialCollapsed);
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [selectedContract, setSelectedContract] =
    React.useState<Contract | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { contracts, loading, error, currentPage, totalPages } = useSelector(
    (state: RootState) => state.contracts,
  );

  useEffect(() => {
    dispatch(fetchContracts(1));
  }, [dispatch]);

  const handleAddContract = (data: any) => {
    dispatch(addContract(data)).then(() => {
      setShowAddModal(false);
    });
  };

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
              <h1 className="text-xl sm:text-2xl font-bold">
                Contract Dashboard
              </h1>
            </div>
            <Button
              onClick={() => setShowAddModal(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Contract
            </Button>
          </div>

          <MetricsHeader
            totalContracts={contracts.length}
            activeContracts={
              contracts.filter((c) => c.status === "active").length
            }
            expiringContracts={
              contracts.filter((c) => c.status === "pending").length
            }
            totalValue={contracts.reduce((sum, c) => sum + c.value, 0)}
            onMetricClick={(metric) => {
              const contract = contracts.find((c) => {
                if (metric === "active") return c.status === "active";
                if (metric === "pending") return c.status === "pending";
                return true;
              });
              if (contract) setSelectedContract(contract);
            }}
          />
          <ChartSection />
          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : error ? (
            <div className="text-center py-4 text-red-500">{error}</div>
          ) : (
            <ContractsTable
              contracts={contracts}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => dispatch(fetchContracts(page))}
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
    </div>
  );
};

export default Home;
