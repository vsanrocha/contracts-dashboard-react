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
import { useEffect } from "react";
import dayjs from "dayjs";
import { useAddContract } from "@/hooks/useContracts";
import { ContractFormData } from "@/types/contract";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contractSchema } from "@/schemas/contractSchema";

interface AddContractModalProps {
  open?: boolean;
  onClose?: () => void;
  onSubmit?: (data: ContractFormData) => void;
}

const defaultFormData: ContractFormData = {
  name: "",
  type: "Serviço",
  startDate: dayjs().toDate(),
  endDate: dayjs().add(30, "day").toDate(),
  amount: 0,
  description: "",
  clientOrSupplier: "",
};

const AddContractModal = ({
  open = true,
  onClose = () => {},
}: AddContractModalProps) => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContractFormData>({
    resolver: zodResolver(contractSchema),
    defaultValues: defaultFormData,
  });

  const addContractMutation = useAddContract();

  const onSubmit = (data: ContractFormData) => {
    const formattedAmount = String(data.amount)
      .replace(/\D/g, "")
      .replace(/(\d{2})$/, ".$1");
    addContractMutation.mutate({ ...data, amount: Number(formattedAmount) });
    onClose();
  };

  useEffect(() => {
    reset(defaultFormData);
  }, [open, reset]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white w-[95vw] sm:w-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criar Novo Contrato</DialogTitle>
        </DialogHeader>
        <form data-testid="add-contract-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome do Contrato</Label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    id="name"
                    placeholder="Insira o nome do contrato"
                    {...field}
                  />
                )}
              />
              {errors.name && (
                <small className="text-red-500">{errors.name.message}</small>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="clientOrSupplier">Cliente/Fornecedor</Label>
              <Controller
                name="clientOrSupplier"
                control={control}
                render={({ field }) => (
                  <Input
                    id="clientOrSupplier"
                    placeholder="Insira o nome do cliente/fornecedor"
                    {...field}
                  />
                )}
              />
              {errors.clientOrSupplier && (
                <small className="text-red-500">
                  {errors.clientOrSupplier.message}
                </small>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="type">Tipo</Label>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
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
                )}
              />
              {errors.type && (
                <small className="text-red-500">{errors.type.message}</small>
              )}
            </div>

            <div className="grid gap-2">
              <Label>Duração do Contrato</Label>
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <DatePickerWithRange
                    from={field.value}
                    to={field.value}
                    onSelect={(range) => {
                      if (range?.from && range?.to) {
                        setValue("startDate", range.from);
                        setValue("endDate", range.to);
                      }
                    }}
                  />
                )}
              />
              {errors.startDate && (
                <small className="text-red-500">
                  {errors.startDate.message}
                </small>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="amount">Valor</Label>
              <Controller
                name="amount"
                control={control}
                render={({ field }) => (
                  <Input
                    id="amount"
                    type="currency"
                    placeholder="Insira o valor do contrato"
                    {...field}
                  />
                )}
              />
              {errors.amount && (
                <small className="text-red-500">{errors.amount.message}</small>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    id="description"
                    placeholder="Descrição do contrato"
                    {...field}
                    className="h-24"
                  />
                )}
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
