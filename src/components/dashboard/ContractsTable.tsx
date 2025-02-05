import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/ui/pagination";
import { Search, SortAsc, SortDesc, Filter } from "lucide-react";
import { FC, useState } from "react";
import { Contract } from "@/types/contract";
import { formatCurrency } from "@/lib/utils";
import ContractDetailsModal from "./ContractDetailsModal";
import dayjs from "dayjs";

interface ContractsTableProps {
  contracts?: Contract[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const statusColors = {
  active: "bg-green-100 text-green-800",
  expired: "bg-red-100 text-red-800",
  pending: "bg-yellow-100 text-yellow-800",
};

const statusText = {
  active: "Ativo",
  expired: "Expirado",
  pending: "Pendente de Renovação",
  close_end: "Próximo ao Vencimento",
};

const ContractsTable: FC<ContractsTableProps> = ({ contracts = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof Contract | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedContract, setSelectedContract] = useState<Contract | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const contractsPerPage = 5;

  const filteredContracts = contracts
    .filter((contract) =>
      contract.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortField) return 0;
      const aValue = a[sortField];
      const bValue = b[sortField];
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  const handleSort = (field: keyof Contract) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const paginatedContracts = filteredContracts.slice(
    (currentPage - 1) * contractsPerPage,
    currentPage * contractsPerPage
  );

  const onPageChange = (page: number) => {
    setCurrentPage(() => page);
  };

  const handleRowClick = (contract: Contract) => {
    setSelectedContract(contract);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedContract(null);
  };

  return (
    <>
      <div className="w-full bg-white p-3 sm:p-6 rounded-lg shadow overflow-x-auto">
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 sm:gap-0 mb-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar Contratos..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center gap-2">
                    Nome do Contrato
                    {sortField === "name" &&
                      (sortOrder === "asc" ? (
                        <SortAsc className="h-4 w-4" />
                      ) : (
                        <SortDesc className="h-4 w-4" />
                      ))}
                  </div>
                </TableHead>
                <TableHead>Cliente/Fornecedor</TableHead>
                <TableHead>Data de Inicio</TableHead>
                <TableHead>Data do Vencimento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("amount")}
                >
                  <div className="flex items-center gap-2">
                    Valor
                    {sortField === "amount" &&
                      (sortOrder === "asc" ? (
                        <SortAsc className="h-4 w-4" />
                      ) : (
                        <SortDesc className="h-4 w-4" />
                      ))}
                  </div>
                </TableHead>
                <TableHead>Tipo de Contrato</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedContracts.map((contract, index) => (
                <TableRow
                  key={`${contract.id}-${index}`}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleRowClick(contract)}
                >
                  <TableCell className="font-medium">{contract.name}</TableCell>
                  <TableCell>{contract.clientOrSupplier}</TableCell>
                  <TableCell>
                    {dayjs(contract.startDate).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell>
                    {dayjs(contract.endDate).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[contract.status]}>
                      {statusText[contract.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatCurrency(contract.amount)}</TableCell>
                  <TableCell>{contract.type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 flex items-center justify-end space-x-2">
          <Pagination>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </Button>
            <div className="flex items-center gap-2 mx-4">
              Pagina {currentPage} de{" "}
              {Math.ceil(filteredContracts.length / contractsPerPage)}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={
                currentPage ===
                Math.ceil(filteredContracts.length / contractsPerPage)
              }
            >
              Proxima
            </Button>
          </Pagination>
        </div>
      </div>
      <ContractDetailsModal
        contract={selectedContract}
        open={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default ContractsTable;
