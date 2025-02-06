import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import DatePickerWithRange from "../ui/date-picker-with-range";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { useState } from "react";

interface FiltersModalProps {
  open: boolean;
  onClose: () => void;
  onApplyFilters: (filters: {
    startDateRange?: { from: Date; to: Date };
    endDateRange?: { from: Date; to: Date };
    status?: string;
  }) => void;
  initialFilters?: {
    startDateRange?: { from: Date; to: Date };
    endDateRange?: { from: Date; to: Date };
    status?: string;
  };
}

const FiltersModal = ({
  open,
  onClose,
  onApplyFilters,
  initialFilters,
}: FiltersModalProps) => {
  const [startDateRange, setStartDateRange] = useState<
    { from: Date; to: Date } | undefined
  >(initialFilters?.startDateRange);
  const [endDateRange, setEndDateRange] = useState<
    { from: Date; to: Date } | undefined
  >(initialFilters?.endDateRange);
  const [status, setStatus] = useState<string | undefined>(
    initialFilters?.status,
  );

  const handleApply = () => {
    onApplyFilters({
      startDateRange,
      endDateRange,
      status,
    });
    onClose();
  };

  const handleClear = () => {
    setStartDateRange(undefined);
    setEndDateRange(undefined);
    setStatus(undefined);
    onApplyFilters({});
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Filtros</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Data de Início do Contrato</Label>
            <DatePickerWithRange
              from={startDateRange?.from}
              to={startDateRange?.to}
              onSelect={(range) =>
                setStartDateRange(range)
              }
            />
          </div>
          <div className="grid gap-2">
            <Label>Data de Término do Contrato</Label>
            <DatePickerWithRange
              from={endDateRange?.from}
              to={endDateRange?.to}
              onSelect={(range) =>
                setEndDateRange(range)
              }
            />
          </div>
          <div className="grid gap-2">
            <Label>Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="expired">Expirado</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="close_end">Próximo ao Vencimento</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleClear}>
            Limpar Filtros
          </Button>
          <Button onClick={handleApply}>Aplicar Filtros</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FiltersModal;
