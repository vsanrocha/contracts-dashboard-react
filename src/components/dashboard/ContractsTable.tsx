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
import { FC } from "react";
import { Contract } from "@/types/contract";
import { formatCurrency } from "@/lib/utils";

interface ContractsTableProps {
  contracts?: Contract[];
  onSort?: (column: string) => void;
  onFilter?: (filters: any) => void;
  onPageChange?: (page: number) => void;
  onRowClick?: (contract: Contract) => void;
  currentPage?: number;
  totalPages?: number;
}

const ContractsTable: FC<ContractsTableProps> = ({
  contracts = [],
  onSort = () => {},
  onFilter = () => {},
  onPageChange = () => {},
  currentPage = 1,
  totalPages = 5,
}) => {

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
  }

  return (
    <div className="w-full bg-white p-3 sm:p-6 rounded-lg shadow overflow-x-auto">
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 sm:gap-0 mb-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search contracts..."
            className="pl-8"
            onChange={(e) => onFilter({ search: e.target.value })}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer"
                onClick={() => onSort("name")}
              >
                <div className="flex items-center gap-2">
                  Contract Name
                  <SortAsc className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => onSort("value")}
              >
                <div className="flex items-center gap-2">
                  Value
                  <SortDesc className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Company</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contracts.map((contract) => (
              <TableRow
                key={contract.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => onRowClick?.(contract)}
              >
                <TableCell className="font-medium">{contract.name}</TableCell>
                <TableCell>
                  <Badge className={statusColors[contract.status]}>
                    {statusText[contract.status]}
                  </Badge>
                </TableCell>
                <TableCell>{formatCurrency(contract.amount)}</TableCell>
                <TableCell>{contract.startDate}</TableCell>
                <TableCell>{contract.endDate}</TableCell>
                <TableCell>{contract.clientOrSupplier}</TableCell>
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
            Previous
          </Button>
          <div className="flex items-center gap-2 mx-4">
            Page {currentPage} of {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </Pagination>
      </div>
    </div>
  );
};

export default ContractsTable;
