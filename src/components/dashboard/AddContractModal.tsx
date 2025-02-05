import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import DatePickerWithRange from "../ui/date-picker-with-range";
import { FormEvent, useEffect, useState } from "react";
import dayjs from "dayjs";
import { useAddContract } from "@/hooks/useContracts";
import { ContractFormData } from "@/types/contract";
import { set } from "react-hook-form";

interface AddContractModalProps {
  open?: boolean;
  onClose?: () => void;
  onSubmit?: (data: ContractFormData) => void;
}

const defaultFormData: ContractFormData = {
  name: "",
  type: "",
  startDate: dayjs().toDate(),
  endDate: dayjs().add(30, "day").toDate(),
  amount: 0,
  description: "",
  clientOrSupplier: "",
}

const AddContractModal = ({
  open = true,
  onClose = () => {},
}: AddContractModalProps) => {
  const [formData, setFormData] = useState<ContractFormData>(defaultFormData);
  const [amount, setAmount] = useState<string>();

  const addContractMutation = useAddContract();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formattedAmount = amount.replace(/\D/g, "").replace(/(\d{2})$/, ".$1");
    addContractMutation.mutate({...formData, amount: Number(formattedAmount)});
    onClose();
  };

  useEffect(() => {
    setFormData(defaultFormData);
    setAmount("");
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white w-[95vw] sm:w-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criar Novo Contrato</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome do Contrato</Label>
              <Input
                id="name"
                placeholder="Insira o nome do contrato"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="clientOrSupplier">Cliente/Fornecedor</Label>
              <Input
                id="clientOrSupplier"
                placeholder="Insira o nome do cliente/fornecedor"
                value={formData.clientOrSupplier}
                onChange={(e) =>
                  setFormData({ ...formData, clientOrSupplier: e.target.value })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="type">Tipo</Label>
              <Select
                value={formData.type}
                onValueChange={(value) =>
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o Tipo do Contrato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Serviço">Serviço</SelectItem>
                  <SelectItem value="Fornecimento">Fornecimento</SelectItem>
                  <SelectItem value="Consultoria">Consultoria</SelectItem>
                  <SelectItem value="TI">TI</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Duração do Contrato</Label>
              <DatePickerWithRange
                from={formData.startDate}
                to={formData.endDate}
                onSelect={(range: { from: Date; to: Date }) => {
                  if (range?.from && range?.to) {
                    setFormData({
                      ...formData,
                      startDate: range.from,
                      endDate: range.to,
                    });
                  }
                }}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="value">Valor do Contrato</Label>
              <Input
                id="value"
                type="currency"
                placeholder="Insira o valor do contrato"
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value)
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                placeholder="Descrição do contrato"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="h-24"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Criar Contrato</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddContractModal;
